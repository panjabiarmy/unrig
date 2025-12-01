import { Button, Input, Textarea } from "@heroui/react";
import { useState } from 'react';
import QRCode from 'qrcode';

// Helper function to import a PEM-formatted key
async function importPEMKey(pemKey: string, keyType: 'public' | 'private'): Promise<CryptoKey> {
  // Remove PEM headers and footers, and convert from base64
  const pemHeader = keyType === 'private' ? '-----BEGIN PRIVATE KEY-----' : '-----BEGIN PUBLIC KEY-----';
  const pemFooter = keyType === 'private' ? '-----END PRIVATE KEY-----' : '-----END PUBLIC KEY-----';
  
  const pemContents = pemKey
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s/g, '');
    
  const binaryDer = window.atob(pemContents);
  const binaryArray = new Uint8Array(binaryDer.length);
  for (let i = 0; i < binaryDer.length; i++) {
    binaryArray[i] = binaryDer.charCodeAt(i);
  }

  const algorithm = {
    name: 'RSA-OAEP',
    hash: 'SHA-256'
  };

  if (keyType === 'private') {
    return await window.crypto.subtle.importKey(
      'pkcs8',
      binaryArray.buffer,
      algorithm,
      false,
      ['decrypt']
    );
  } else {
    return await window.crypto.subtle.importKey(
      'spki',
      binaryArray.buffer,
      algorithm,
      false,
      ['encrypt']
    );
  }
}

function EncryptDecrypt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for key inputs
  const [publicKeyInput, setPublicKeyInput] = useState('');
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  
  // State for encryption/decryption
  const [textToEncrypt, setTextToEncrypt] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [textToDecrypt, setTextToDecrypt] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [cryptoLoading, setCryptoLoading] = useState(false);
  
  // State for encrypted text QR code
  const [encryptedTextQR, setEncryptedTextQR] = useState('');
  
  // State for copy feedback
  const [copyFeedback, setCopyFeedback] = useState('');
  
  // Store the actual crypto keys for encryption/decryption
  const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);
  const [privateKey, setPrivateKey] = useState<CryptoKey | null>(null);

  // Load public key from input
  const handleLoadPublicKey = async () => {
    if (!publicKeyInput.trim()) {
      setError('Please enter a public key');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const importedKey = await importPEMKey(publicKeyInput.trim(), 'public');
      setPublicKey(importedKey);
      setCopyFeedback('Public key loaded successfully!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Failed to import public key:', err);
      setError('Failed to import public key. Please check the format.');
    } finally {
      setLoading(false);
    }
  };

  // Load private key from input
  const handleLoadPrivateKey = async () => {
    if (!privateKeyInput.trim()) {
      setError('Please enter a private key');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const importedKey = await importPEMKey(privateKeyInput.trim(), 'private');
      setPrivateKey(importedKey);
      setCopyFeedback('Private key loaded successfully!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Failed to import private key:', err);
      setError('Failed to import private key. Please check the format.');
    } finally {
      setLoading(false);
    }
  };

  // Encrypt text using the public key
  const handleEncrypt = async () => {
    if (!publicKey || !textToEncrypt) {
      setError('Please load a public key and enter text to encrypt');
      return;
    }
    
    setCryptoLoading(true);
    setError(null);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(textToEncrypt);
      
      // Estimate maximum message length (conservative estimate)
      const maxLength = 190; // Safe for 2048-bit keys
      
      if (data.length > maxLength) {
        throw new Error(`Text too long. Maximum recommended length is ${maxLength} bytes. Current text is ${data.length} bytes.`);
      }
      
      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP'
        },
        publicKey,
        data
      );
      
      // Convert to base64 for display
      const encryptedArray = new Uint8Array(encrypted);
      const encryptedBase64 = btoa(String.fromCharCode(...Array.from(encryptedArray)));
      setEncryptedText(encryptedBase64);

      // Generate QR code for encrypted text
      try {
        const encryptedQR = await QRCode.toDataURL(encryptedBase64);
        setEncryptedTextQR(encryptedQR);
      } catch (qrError) {
        console.error('Failed to generate QR code:', qrError);
      }
    } catch (err) {
      console.error('Encryption failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Encryption failed. Text might be too long for key size.';
      setError(errorMessage);
    } finally {
      setCryptoLoading(false);
    }
  };

  // Decrypt text using the private key
  const handleDecrypt = async () => {
    if (!privateKey || !textToDecrypt) {
      setError('Please load a private key and enter text to decrypt');
      return;
    }
    
    setCryptoLoading(true);
    setError(null);
    try {
      // Convert from base64
      const binaryString = atob(textToDecrypt.trim());
      const encryptedArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        encryptedArray[i] = binaryString.charCodeAt(i);
      }
      
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'RSA-OAEP'
        },
        privateKey,
        encryptedArray.buffer
      );
      
      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decrypted);
      setDecryptedText(decryptedText);
    } catch (err) {
      console.error('Decryption failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Decryption failed. Please check the encrypted text format and private key.';
      setError(errorMessage);
    } finally {
      setCryptoLoading(false);
    }
  };

  // Copy encrypted text to clipboard
  const handleCopyEncrypted = async () => {
    if (encryptedText) {
      try {
        await navigator.clipboard.writeText(encryptedText);
        setCopyFeedback('Encrypted text copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 2000);
      } catch (err) {
        console.error('Failed to copy encrypted text:', err);
        setCopyFeedback('Failed to copy encrypted text');
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {copyFeedback && <p className="text-green-500 mt-2">{copyFeedback}</p>}

      {/* Key Input Section */}
      <div className="space-y-6">
        {/* Public Key Input */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Public Key (for Encryption)</h3>
          <Textarea
            value={publicKeyInput}
            onChange={(e) => setPublicKeyInput(e.target.value)}
            placeholder="Paste your RSA public key in PEM format here..."
            rows={8}
            className="font-mono text-sm"
          />
          <Button
            onPress={handleLoadPublicKey}
            disabled={!publicKeyInput.trim() || loading}
            size="sm"
            color={publicKey ? "success" : "primary"}
          >
            {loading ? 'Loading...' : publicKey ? 'Public Key Loaded ✓' : 'Load Public Key'}
          </Button>
        </div>

        {/* Private Key Input */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Private Key (for Decryption)</h3>
          <Textarea
            value={privateKeyInput}
            onChange={(e) => setPrivateKeyInput(e.target.value)}
            placeholder="Paste your RSA private key in PEM format here..."
            rows={12}
            className="font-mono text-sm"
          />
          <Button
            onPress={handleLoadPrivateKey}
            disabled={!privateKeyInput.trim() || loading}
            size="sm"
            color={privateKey ? "success" : "primary"}
          >
            {loading ? 'Loading...' : privateKey ? 'Private Key Loaded ✓' : 'Load Private Key'}
          </Button>
        </div>
      </div>

      {/* Encryption/Decryption Section */}
      <div className="border-t pt-6 space-y-6">
        <h3 className="text-lg font-semibold">Encrypt & Decrypt Messages</h3>
        
        {/* Encryption */}
        <div className="space-y-3">
          <h4 className="text-md font-medium">Encrypt Text</h4>
          <Input
            value={textToEncrypt}
            onChange={(e) => setTextToEncrypt(e.target.value)}
            placeholder="Enter text to encrypt..."
            className="w-full"
          />
          <Button 
            onPress={handleEncrypt} 
            disabled={!publicKey || !textToEncrypt || cryptoLoading}
            size="sm"
          >
            {cryptoLoading ? 'Encrypting...' : 'Encrypt'}
          </Button>
          <Button 
            onPress={() => {
              setTextToEncrypt('35202-1234567-1|imran-ahmed-khan-niazi|2025-11-03T08:43:44.501Z');
            }}
            variant="bordered"
            size="sm"
          >
            Use Sample Text
          </Button>

          {encryptedText && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Encrypted Text (Base64):</h5>
              <Textarea
                value={encryptedText}
                readOnly
                rows={4}
                className="font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button
                  onPress={handleCopyEncrypted}
                  size="sm"
                  variant="bordered"
                >
                  Copy Encrypted Text
                </Button>
              </div>
              {encryptedTextQR && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Encrypted Text QR Code</h4>
                  <img src={encryptedTextQR} alt="Encrypted Text QR Code" className="border rounded" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Decryption */}
        <div className="space-y-3">
          <h4 className="text-md font-medium">Decrypt Text</h4>
          <Textarea
            value={textToDecrypt}
            onChange={(e) => setTextToDecrypt(e.target.value)}
            placeholder="Paste encrypted text (Base64) here..."
            rows={4}
            className="font-mono text-sm"
          />
          <Button 
            onPress={handleDecrypt} 
            disabled={!privateKey || !textToDecrypt || cryptoLoading}
            size="sm"
          >
            {cryptoLoading ? 'Decrypting...' : 'Decrypt'}
          </Button>
          {decryptedText && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Decrypted Text:</h5>
              <Input
                value={decryptedText}
                readOnly
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EncryptDecrypt;