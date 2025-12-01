import { Button, Textarea, Select, SelectItem } from "@heroui/react";
import { useState } from 'react';
import QRCode from 'qrcode';
import { exportJWK, calculateJwkThumbprint } from 'jose';

// Helper function to download a file
function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helper function to export a CryptoKey to PEM format
async function exportCryptoKey(format: 'pkcs8' | 'spki', key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey(format, key);
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = window.btoa(exportedAsString);
  const pemExported = `-----BEGIN ${format === 'pkcs8' ? 'PRIVATE' : 'PUBLIC'} KEY-----\n${exportedAsBase64.match(/.{1,64}/g)?.join('\n')}\n-----END ${format === 'pkcs8' ? 'PRIVATE' : 'PUBLIC'} KEY-----`;
  return pemExported;
}

// Helper function to convert ArrayBuffer to string
function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}

// Helper function to convert RSA public key to JWKS format
async function convertPublicKeyToJWKS(publicKey: CryptoKey): Promise<any> {
  // Use jose's exportJWK to automatically handle the conversion
  const jwk = await exportJWK(publicKey);
  
  // Calculate the proper kid using jose's calculateJwkThumbprint
  const kid = await calculateJwkThumbprint(jwk);
  
  // Add the standard JWK properties for RSA signing keys
  const signingJwk = {
    ...jwk,
    alg: 'PS256',
    kid: kid
  };
  
  const jwks = {
    keys: [signingJwk]
  };
  
  return jwks;
}

function KeyGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for key type instead of modulus length
  const [keyType, setKeyType] = useState<'voter' | 'officer'>('voter');

  // State to hold the key strings
  const [privateKeyPem, setPrivateKeyPem] = useState('');
  const [publicKeyPem, setPublicKeyPem] = useState('');
  
  // State for signing keys
  const [signingPrivateKeyPem, setSigningPrivateKeyPem] = useState('');
  
  // State for QR codes
  const [privateKeyQR, setPrivateKeyQR] = useState('');
  const [publicKeyQR, setPublicKeyQR] = useState('');
  const [signingPrivateKeyQR, setSigningPrivateKeyQR] = useState('');
  
  // State for JWKS
  const [jwks, setJwks] = useState('');
  const [jwksQR, setJwksQR] = useState('');
  
  // State for copy feedback
  const [copyFeedback, setCopyFeedback] = useState('');

  // Download functions
  const handleDownloadPrivate = () => {
    if (privateKeyPem) {
      downloadFile('private_key.pem', privateKeyPem);
    }
  };

  const handleDownloadPublic = () => {
    if (publicKeyPem) {
      downloadFile('public_key.pem', publicKeyPem);
    }
  };

  // Copy functions
  const handleCopyPrivate = async () => {
    if (privateKeyPem) {
      try {
        await navigator.clipboard.writeText(privateKeyPem);
        setCopyFeedback('Private key copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 2000);
      } catch (err) {
        console.error('Failed to copy private key:', err);
        setCopyFeedback('Failed to copy private key');
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    }
  };

  const handleCopyPublic = async () => {
    if (publicKeyPem) {
      try {
        await navigator.clipboard.writeText(publicKeyPem);
        setCopyFeedback('Public key copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 2000);
      } catch (err) {
        console.error('Failed to copy public key:', err);
        setCopyFeedback('Failed to copy public key');
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    }
  };

  const handleGenerateKeys = async () => {
    setLoading(true);
    setError(null);
    setPrivateKeyPem(''); // Clear old keys
    setPublicKeyPem(''); // Clear old keys
    setPrivateKeyQR('');
    setPublicKeyQR('');
    setJwks(''); // Clear JWKS state
    setJwksQR('');
    setSigningPrivateKeyPem('');
    setSigningPrivateKeyQR('');

    try {
      // Set modulus length and key configuration based on key type
      const modulusLength = keyType === 'voter' ? 2048 : 4096;
      
      if (keyType === 'voter') {
        // Voter keys: Only for encryption/decryption
        const encryptionKeyPair = await window.crypto.subtle.generateKey(
          {
            name: 'RSA-OAEP',
            modulusLength: modulusLength,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: 'SHA-256',
          },
          true, // Keys are extractable
          ['encrypt', 'decrypt'] // Key usages
        );

        // Export encryption keys
        const privatePem = await exportCryptoKey('pkcs8', encryptionKeyPair.privateKey);
        setPrivateKeyPem(privatePem);

        const publicPem = await exportCryptoKey('spki', encryptionKeyPair.publicKey);
        setPublicKeyPem(publicPem);

        // Generate JWKS from the encryption public key (for consistency)
        const jwksData = await convertPublicKeyToJWKS(encryptionKeyPair.publicKey);
        const jwksString = JSON.stringify(jwksData, null, 2);
        setJwks(jwksString);
        
        // Generate QR codes
        try {
          const privateQR = await QRCode.toDataURL(privatePem);
          setPrivateKeyQR(privateQR);
          
          const publicQR = await QRCode.toDataURL(publicPem);
          setPublicKeyQR(publicQR);
          
          const jwksQR = await QRCode.toDataURL(jwksString);
          setJwksQR(jwksQR);
        } catch (qrError) {
          console.error('Failed to generate QR codes:', qrError);
        }
        
      } else {
        // Officer keys: Only for signing/verification
        const signingKeyPair = await window.crypto.subtle.generateKey(
          {
            name: 'RSA-PSS',
            modulusLength: modulusLength,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: 'SHA-256',
          },
          true, // Keys are extractable
          ['sign', 'verify'] // Key usages
        );
        
        // Export the signing keys
        const signingPrivatePem = await exportCryptoKey('pkcs8', signingKeyPair.privateKey);
        setSigningPrivateKeyPem(signingPrivatePem);
        setPrivateKeyPem(signingPrivatePem); // Use signing key as main private key for officers
        
        const signingPublicPem = await exportCryptoKey('spki', signingKeyPair.publicKey);
        setPublicKeyPem(signingPublicPem); // Use signing public key as main public key for officers
        
        // Generate JWKS from the signing key pair
        const jwksData = await convertPublicKeyToJWKS(signingKeyPair.publicKey);
        const jwksString = JSON.stringify(jwksData, null, 2);
        setJwks(jwksString);
        
        // Generate QR codes
        try {
          const privateQR = await QRCode.toDataURL(signingPrivatePem);
          setPrivateKeyQR(privateQR);
          setSigningPrivateKeyQR(privateQR);
          
          const publicQR = await QRCode.toDataURL(signingPublicPem);
          setPublicKeyQR(publicQR);
          
          const jwksQR = await QRCode.toDataURL(jwksString);
          setJwksQR(jwksQR);
        } catch (qrError) {
          console.error('Failed to generate QR codes:', qrError);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate keys. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  const keysGenerated = privateKeyPem && publicKeyPem;

  return (
    <div className="space-y-6">

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Key Type</label>
        <Select
          selectedKeys={[keyType]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as 'voter' | 'officer';
            setKeyType(selected);
          }}
          placeholder="Select key type"
          className="w-full"
        >
          <SelectItem key="voter">
            Voter Keys (2048-bit, Encryption/Decryption)
          </SelectItem>
          <SelectItem key="officer">
            Officer Keys (4096-bit, Signing/Verification)
          </SelectItem>
        </Select>
        <p className="text-sm text-gray-500 mt-1">
          {keyType === 'voter' 
            ? 'Voter keys are used for encryption and decryption operations with 2048-bit strength.' 
            : 'Officer keys are used for signing and verification operations with 4096-bit strength.'}
        </p>
      </div>

      <Button onPress={handleGenerateKeys} disabled={loading}>
        {loading ? 'Generating...' : `Generate ${keyType === 'voter' ? 'Voter' : 'Officer'} Keys`}
      </Button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {keysGenerated && (
        <div className="space-y-6 mt-6">
          {/* Private Key Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {keyType === 'voter' ? 'Private Key (Encryption)' : 'Private Key (Signing)'}
            </h3>
            <Textarea
              value={privateKeyPem}
              readOnly
              placeholder="Your private key will appear here..."
              rows={10}
              className="font-mono"
            />
            <div className="flex gap-2">
              <Button
                onPress={handleDownloadPrivate}
                disabled={!keysGenerated || loading}
                size="sm"
              >
                Download Private Key
              </Button>
              <Button
                onPress={handleCopyPrivate}
                disabled={!keysGenerated || loading}
                size="sm"
              >
                Copy Private Key
              </Button>
            </div>
            {privateKeyQR && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Private Key QR Code</h4>
                <img src={privateKeyQR} alt="Private Key QR Code" className="border rounded" />
              </div>
            )}
          </div>

          {/* Public Key Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {keyType === 'voter' ? 'Public Key (Encryption)' : 'Public Key (Verification)'}
            </h3>
            <Textarea
              value={publicKeyPem}
              readOnly
              placeholder="Your public key will appear here..."
              rows={10}
              className="font-mono"
            />
            <div className="flex gap-2">
              <Button
                onPress={handleDownloadPublic}
                disabled={!keysGenerated || loading}
                size="sm"
              >
                Download Public Key
              </Button>
              <Button
                onPress={handleCopyPublic}
                disabled={!keysGenerated || loading}
                size="sm"
              >
                Copy Public Key
              </Button>
            </div>
            {publicKeyQR && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Public Key QR Code</h4>
                <img src={publicKeyQR} alt="Public Key QR Code" className="border rounded" />
              </div>
            )}
          </div>

          {/* Show signing private key section only for officers */}
          {keyType === 'officer' && signingPrivateKeyPem && signingPrivateKeyPem !== privateKeyPem && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Signing Private Key</h3>
              <Textarea
                value={signingPrivateKeyPem}
                readOnly
                placeholder="Your signing private key will appear here..."
                rows={10}
                className="font-mono"
              />
              {signingPrivateKeyQR && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Signing Private Key QR Code</h4>
                  <img src={signingPrivateKeyQR} alt="Signing Private Key QR Code" className="border rounded" />
                </div>
              )}
            </div>
          )}

          {/* JWKS Section */}
          {jwks && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">JWKS (JSON Web Key Set)</h3>
              <Textarea
                value={jwks}
                readOnly
                placeholder="Your JWKS will appear here..."
                rows={15}
                className="font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button
                  onPress={() => jwks && downloadFile('jwks.json', jwks)}
                  disabled={!jwks || loading}
                  size="sm"
                >
                  Download JWKS
                </Button>
                <Button
                  onPress={async () => {
                    if (jwks) {
                      try {
                        await navigator.clipboard.writeText(jwks);
                        setCopyFeedback('JWKS copied to clipboard!');
                        setTimeout(() => setCopyFeedback(''), 2000);
                      } catch (err) {
                        console.error('Failed to copy JWKS:', err);
                        setCopyFeedback('Failed to copy JWKS');
                        setTimeout(() => setCopyFeedback(''), 2000);
                      }
                    }
                  }}
                  disabled={!jwks || loading}
                  size="sm"
                >
                  Copy JWKS
                </Button>
              </div>
              {jwksQR && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">JWKS QR Code</h4>
                  <img src={jwksQR} alt="JWKS QR Code" className="border rounded" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {copyFeedback && <p className="text-green-500 mt-2">{copyFeedback}</p>}
    </div>
  );
}

export default KeyGenerator;