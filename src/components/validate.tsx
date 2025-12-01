import { Button, Input, Textarea } from "@heroui/react";
import { useState } from 'react';

// Helper function to import public key from PEM format
async function importPublicKeyFromPem(pemString: string) {
  // Remove PEM headers and whitespace
  const pemContents = pemString
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s/g, '');
  
  // Convert base64 to ArrayBuffer
  const binaryString = atob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return await window.crypto.subtle.importKey(
    'spki',
    bytes.buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256'
    },
    false,
    ['encrypt']
  );
}

function ValidationComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  
  // Validation form state
  const [publicKeyPem, setPublicKeyPem] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [_, setOtpSent] = useState(false);
  
  // OTP and encrypted text from server (simulated)
  const [serverOtp] = useState('645867');
  const [serverEncryptedText, setServerEncryptedText] = useState('');
  const [validationText] = useState('Hello, this is a test message for validation!');
  
  // User input for validation
  const [userOtp, setUserOtp] = useState('');
  const [userDecryptedInput, setUserDecryptedInput] = useState('');
  
  // Validation states
  const [step, setStep] = useState(1); // 1: Enter details, 2: Verify OTP and decrypt
  const [isValidated, setIsValidated] = useState(false);

  // Step 1: Send OTP and encrypt validation text
  const handleSendOtp = async () => {
    if (!publicKeyPem.trim() || !mobileNumber.trim()) {
      setError('Please enter both public key and mobile number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validate mobile number format (basic validation)
      const phoneRegex = /^\+?[\d\s-()]{10,}$/;
      if (!phoneRegex.test(mobileNumber)) {
        throw new Error('Please enter a valid mobile number');
      }

      // Import and validate the public key
      const publicKey = await importPublicKeyFromPem(publicKeyPem);
      
      // Encrypt the validation text with the public key
      const encoder = new TextEncoder();
      const data = encoder.encode(validationText);
      
      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP'
        },
        publicKey,
        data
      );
      
      // Convert to base64 for display
      const encryptedArray = new Uint8Array(encrypted);
      const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
      setServerEncryptedText(encryptedBase64);
      
      // Simulate sending OTP (in real app, this would be an API call)
      setOtpSent(true);
      setStep(2);
      setSuccess(`OTP sent to ${mobileNumber}. Please check your messages.`);
      
    } catch (err) {
      console.error('Validation setup failed:', err);
      setError('Invalid public key format or encryption failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Validate OTP and decrypted text
  const handleValidateCredentials = async () => {
    if (!userOtp.trim() || !userDecryptedInput.trim()) {
      setError('Please enter both OTP and decrypted text');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validate OTP
      if (userOtp !== serverOtp) {
        throw new Error('Invalid OTP');
      }

      // Validate decrypted text
      if (userDecryptedInput.trim() !== validationText) {
        throw new Error('Decrypted text does not match');
      }

      // Success - link public key to phone number
      setIsValidated(true);
      setSuccess(`✅ Validation successful! Your public key has been linked to ${mobileNumber}`);
      
    } catch (err: any) {
      console.error('Validation failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setOtpSent(false);
    setIsValidated(false);
    setError(null);
    setSuccess('');
    setUserOtp('');
    setUserDecryptedInput('');
    setServerEncryptedText('');
  };

  return (
    <div className="space-y-6">

      {error && <p className="text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded">{error}</p>}
      {success && <p className="text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded">{success}</p>}

      {isValidated ? (
        <div className="space-y-4 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              🎉 Validation Complete!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Your public key has been successfully linked to your mobile number: {mobileNumber}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              You can now proceed to vote using your validated key pair.
            </p>
          </div>
          <Button onPress={handleReset} variant="bordered">
            Validate Another Key Pair
          </Button>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Step 1: Enter Your Details</h3>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium">Mobile Number</label>
                <Input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number (e.g., +1234567890)"
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Public Key (PEM Format)</label>
                <Textarea
                  value={publicKeyPem}
                  onChange={(e) => setPublicKeyPem(e.target.value)}
                  placeholder="Paste your public key here (-----BEGIN PUBLIC KEY-----...)"
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <Button 
                onPress={handleSendOtp} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Send OTP & Encrypt Validation Text'}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Step 2: Verify Your Identity</h3>
              
              {serverEncryptedText && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Encrypted Validation Text</label>
                  <Textarea
                    value={serverEncryptedText}
                    readOnly
                    rows={4}
                    className="font-mono text-sm bg-gray-50 dark:bg-gray-800"
                    placeholder="Encrypted text will appear here..."
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Enter OTP</label>
                  <Input
                    value={userOtp}
                    onChange={(e) => setUserOtp(e.target.value)}
                    placeholder="Enter the 6-digit OTP"
                    maxLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Enter Decrypted Text</label>
                  <Input
                    value={userDecryptedInput}
                    onChange={(e) => setUserDecryptedInput(e.target.value)}
                    placeholder="Enter the decrypted validation text"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onPress={handleValidateCredentials} 
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Validating...' : 'Complete Validation'}
                </Button>
                <Button 
                  onPress={handleReset} 
                  variant="bordered"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ValidationComponent;