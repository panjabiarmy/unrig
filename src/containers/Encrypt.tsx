"use client";

import { Alert, cn, Spacer } from "@heroui/react";
import * as React from "react";

import EncryptDecrypt from "@/components/encrypt";

interface TeamSettingCardProps {
  className?: string;
}

const description = `The raw vote will then be encrypted behind the scenes using your public key. You can 
change your vote or key pairs anytime before the deadline.`;

const Encrypt = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        {/* Title */}
        <p className="text-base font-medium text-default-700">Step 4</p>
        <p className="mt-1 text-sm font-normal text-default-400">Encryption of vote for public display.</p>
        {/* Invite */}
        <Spacer y={2} />
        <Alert hideIcon description={description} />
        <Spacer y={2} />
        <EncryptDecrypt/>
      </div>
    )
  }
);

Encrypt.displayName = "Encrypt";

export default Encrypt;
