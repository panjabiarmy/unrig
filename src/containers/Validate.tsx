"use client";

import { Alert, cn, Spacer } from "@heroui/react";
import * as React from "react";

import ValidationComponent from "@/components/validate";

interface TeamSettingCardProps {
  className?: string;
}

const description = `After generating your key pair, you must validate your vote by 
entering your public key and mobile number. An otp will be sent to your mobile number, 
and a random text will be encrypted with your public key. Decrypt that text with your 
private key and enter the otp and decrypted text to complete validation.`;

const description1 = `This will temporarily link your public key to your id. If the id is mobile number,
no further step needs to be taken. If not, a data request will be sent to your registered mobile number 
on Proof App to retrieve the ID (CNIC, email etc).`;

const description2 = `OTP: 645867. Text: Hello, this is a test message for validation! 
You can either use this text directly or use private key you generated in first step to 
decrypt the encrypted text below by clicking on the Encrypt tab above.`;

const Validate = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        {/* Title */}
        <p className="text-base font-medium text-default-700">Step 2</p>
        <p className="mt-1 text-sm font-normal text-default-400">Validate your vote.</p>
        {/* Invite */}
        <Spacer y={2} />
        <Alert color="warning" description={description2} />
        <Spacer y={2} />
        <Alert hideIcon description={description} />
        <Spacer y={2} />
        <Alert hideIcon description={description1} />
        <Spacer y={2} />
        <ValidationComponent />
      </div>
    )
  }
);

Validate.displayName = "Generate";

export default Validate;
