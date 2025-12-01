import { Button, Input, Textarea } from "@heroui/react";
import { useState } from 'react';
import QRCode from 'qrcode';

const testMessage = "z5MLEibdB+GZlkIBiSWRQdXzpeicjMradPWX8j2yVd/WVkK+o7/PU13v2IJaJEvyCYbCWFwGCaiE1E/qtcEnEoeriNDrQiQ6i3fCIBkYexF869z9nAFxkJNQjceDRyHywbLUqSsj9TLeyHT9Z/Aa3Zt8jLHq5K1KG68a3NBsNxW3VZa7eTxwoXvGY/nGui/i+B2r9kkzQxd+ij8QCVHfLnUj84c54UXyqNgYsLkR6kNRwqaXH19099lIgfjRJHB7z7EbYLedBflkBjqEpTI0sA5nSYvs4030S+wPrT809d+l3mEjo116IauoKnon7rs2A95wyGp+i7cdtvcuS2/bkQ==";

// Helper function to validate and decode base64
function safeAtob(str: string): string {
  try {
    // Remove any whitespace and validate base64 format
    const cleaned = str.replace(/\s/g, '');
    // Check if string is valid base64
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
      throw new Error('Invalid base64 format');
    }
    return window.atob(cleaned);
  } catch (err) {
    throw new Error('Failed to decode base64 string: ' + (err instanceof Error ? err.message : 'Invalid format'));
  }
}

// Helper function to import private key from PEM format
async function importPrivateKeyFromPem(pemString: string): Promise<CryptoKey> {
  // Remove PEM header/footer and whitespace
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  
  if (!pemString.includes(pemHeader) || !pemString.includes(pemFooter)) {
    throw new Error('Invalid PEM format. Must include BEGIN and END PRIVATE KEY headers.');
  }
  
  const pemContents = pemString
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s/g, '');
  
  if (!pemContents) {
    throw new Error('Empty private key content');
  }
  
  // Convert base64 to ArrayBuffer with validation
  const binaryString = safeAtob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Try RSA-PSS first (for signing)
  try {
    return await window.crypto.subtle.importKey(
      'pkcs8',
      bytes.buffer,
      {
        name: 'RSA-PSS',
        hash: 'SHA-256'
      },
      false,
      ['sign']
    );
  } catch (pssError) {
    // If RSA-PSS fails, try RSA-OAEP and see if we can use it for signing
    console.warn('Failed to import as RSA-PSS, trying alternative approach:', pssError);
    throw new Error('This private key is not compatible with RSA-PSS signing. Please use a private key generated for signing (RSA-PSS), not encryption (RSA-OAEP).');
  }
}

// Helper function to import public key from JWKS
async function importPublicKeyFromJWKS(jwks: any, kid: string | null = null): Promise<CryptoKey> {
  const key = kid ? 
    jwks.keys.find((k: any) => k.kid === kid) : 
    jwks.keys[0];
    
  if (!key) {
    throw new Error('Key not found in JWKS');
  }
  
  // Create a proper JWK object for import
  const jwkForImport = {
    kty: key.kty,
    n: key.n,
    e: key.e,
    alg: key.alg || 'PS256',
    key_ops: ['verify']
  };
  
  return await window.crypto.subtle.importKey(
    'jwk',
    jwkForImport,
    {
      name: 'RSA-PSS',
      hash: 'SHA-256'
    },
    false,
    ['verify']
  );
}

function SigningComponent() {
  const [error, setError] = useState<string | null>(null);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  
  // State for key inputs
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [jwksInput, setJwksInput] = useState('');
  
  // State for signing/verification
  const [textToSign, setTextToSign] = useState('');
  const [signature, setSignature] = useState('');
  const [textToVerify, setTextToVerify] = useState('');
  const [signatureToVerify, setSignatureToVerify] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [signatureQR, setSignatureQR] = useState('');
  
  // State for copy feedback
  const [copyFeedback, setCopyFeedback] = useState('');

  // Sign text using the private key
  const handleSign = async () => {
    if (!privateKeyInput || !textToSign) return;
    
    setCryptoLoading(true);
    setError(null);
    try {
      // Import private key from PEM
      const privateKey = await importPrivateKeyFromPem(privateKeyInput);
      
      // Encode the text to sign
      const encoder = new TextEncoder();
      const data = encoder.encode(textToSign);
      
      // Sign the data
      const signatureBuffer = await window.crypto.subtle.sign(
        {
          name: 'RSA-PSS',
          saltLength: 32, // SHA-256 hash length
        },
        privateKey,
        data
      );
      
      // Convert signature to base64
      const signatureArray = new Uint8Array(signatureBuffer);
      const signatureBase64 = btoa(String.fromCharCode(...Array.from(signatureArray)));
      
      setSignature(signatureBase64);

      // Generate QR code for the signature
      try {
        const qrData = await QRCode.toDataURL(signatureBase64);
        setSignatureQR(qrData);
      } catch (qrError) {
        console.error('Failed to generate signature QR code:', qrError);
      }
    } catch (err) {
      console.error('Signing failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Signing failed. Please check your private key format.';
      setError(errorMessage);
    } finally {
      setCryptoLoading(false);
    }
  };

  // Verify signature using JWKS
  const handleVerify = async () => {
    if (!signatureToVerify || !textToVerify || !jwksInput) return;
    
    setCryptoLoading(true);
    setError(null);
    try {
      // Parse JWKS
      const jwksData = JSON.parse(jwksInput);
      
      // Import public key from JWKS
      const publicKey = await importPublicKeyFromJWKS(jwksData);
      
      // Encode the text to verify
      const encoder = new TextEncoder();
      const data = encoder.encode(textToVerify);
      
      // Convert signature from base64 to ArrayBuffer with validation
      const signatureBinary = safeAtob(signatureToVerify);
      const signatureArray = new Uint8Array(signatureBinary.length);
      for (let i = 0; i < signatureBinary.length; i++) {
        signatureArray[i] = signatureBinary.charCodeAt(i);
      }
      
      const isValid = await window.crypto.subtle.verify(
        {
          name: 'RSA-PSS',
          saltLength: 32, // SHA-256 hash length
        },
        publicKey,
        signatureArray,
        data
      );
      
      if (isValid) {
        setVerificationResult('Valid signature ✓');
      } else {
        setVerificationResult('Invalid signature ✗');
      }
    } catch (err) {
      console.error('Verification failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please check the JWKS format and signature.';
      setError(errorMessage);
      setVerificationResult('Verification error ✗');
    } finally {
      setCryptoLoading(false);
    }
  };

  // Copy signature to clipboard
  const handleCopySignature = async () => {
    if (signature) {
      try {
        await navigator.clipboard.writeText(signature);
        setCopyFeedback('Signature copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 2000);
      } catch (err) {
        console.error('Failed to copy signature:', err);
        setCopyFeedback('Failed to copy signature');
        setTimeout(() => setCopyFeedback(''), 2000);
      }
    }
  };

  return (
    <div className="space-y-6">

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Private Key Input Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Private Key (PEM Format)</h3>
        <Textarea
          value={privateKeyInput}
          onChange={(e) => setPrivateKeyInput(e.target.value)}
          placeholder="-----BEGIN PRIVATE KEY-----
...your private key content...
-----END PRIVATE KEY-----"
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      {/* JWKS Input Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">JWKS (JSON Web Key Set)</h3>
        <Textarea
          value={jwksInput}
          onChange={(e) => setJwksInput(e.target.value)}
          placeholder='{"keys":[{"kty":"RSA","use":"sig","key_ops":["verify"],"alg":"PS256","kid":"rsa-key-1","n":"...","e":"AQAB"}]}'
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      {/* Signing Section */}
      <div className="border-t pt-6 space-y-6">
        <h3 className="text-lg font-semibold">Sign Text</h3>
        
        <div className="space-y-3">
          <h4 className="text-md font-medium">Text to Sign</h4>
          <Input
            value={textToSign}
            onChange={(e) => setTextToSign(e.target.value)}
            placeholder="Enter text to sign..."
            className="w-full"
          />
          <Button 
            onPress={handleSign} 
            disabled={!textToSign || !privateKeyInput || cryptoLoading}
            size="sm"
          >
            {cryptoLoading ? 'Signing...' : 'Sign Text'}
          </Button>
          
          <Button 
            onPress={() => {
              setTextToSign(testMessage);
            }}
            variant="bordered"
            size="sm"
          >
            Use Sample Text
          </Button>
          
          {signature && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Digital Signature:</h5>
              <Textarea
                value={signature}
                readOnly
                rows={4}
                className="font-mono text-sm"
              />
              <div className="text-xs text-gray-600 mt-1">
                <p>Algorithm: RSA-PSS with SHA-256</p>
                <p>Format: Base64 encoded signature</p>
              </div>
              <Button
                onPress={handleCopySignature}
                disabled={!signature}
                size="sm"
              >
                Copy Signature
              </Button>
              {signatureQR && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Signature QR Code</h4>
                  <img src={signatureQR} alt="Signature QR Code" className="border rounded" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Verification Section */}
      <div className="border-t pt-6 space-y-6">
        <h3 className="text-lg font-semibold">Verify Signature</h3>
        
        <div className="space-y-3">
          <h4 className="text-md font-medium">Text to Verify</h4>
          <Input
            value={textToVerify}
            onChange={(e) => setTextToVerify(e.target.value)}
            placeholder="Enter original text that was signed..."
            className="w-full"
          />
          
          <h4 className="text-md font-medium">Signature to Verify</h4>
          <Textarea
            value={signatureToVerify}
            onChange={(e) => setSignatureToVerify(e.target.value)}
            placeholder='Paste base64 signature here...'
            rows={4}
            className="font-mono text-sm"
          />
          
          <Button 
            onPress={handleVerify} 
            disabled={!signatureToVerify || !textToVerify || !jwksInput || cryptoLoading}
            size="sm"
          >
            {cryptoLoading ? 'Verifying...' : 'Verify Signature'}
          </Button>
          
          {verificationResult && (
            <p className={`text-sm font-medium mt-2 ${verificationResult.includes('Valid') ? 'text-green-600' : 'text-red-600'}`}>
              {verificationResult}
            </p>
          )}
        </div>
      </div>

      {copyFeedback && <p className="text-green-500 mt-2">{copyFeedback}</p>}
    </div>
  );
}

export default SigningComponent;