"use client";

import { Alert, cn, Spacer } from "@heroui/react";
import * as React from "react";

import KeyGenerator from "@/components/keygen";

interface TeamSettingCardProps {
  className?: string;
}

const description = `Click "Generate Keys" to create a new RSA key pair. The keys will appear in the text boxes below.
You can generate an RSA key pair (2048-bit) from any website of your choice (example below). 
For extra security, consider using an offline tool or a dedicated application to generate your key pair.`;

const description2 = `Keep your private key secure and never share it with anyone.`;

const Generate = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        {/* Title */}
        <p className="text-base font-medium text-default-700">Step 1</p>
        <p className="mt-1 text-sm font-normal text-default-400">Generate a key pair.</p>
        {/* Invite */}
        <Spacer y={2} />
        <Alert color="warning" description={description2} />
        <Spacer y={2} />
        <Alert hideIcon description={description} />
        <Spacer y={2} />
        <KeyGenerator/>
      </div>
    )
  }
);

Generate.displayName = "Generate";

export default Generate;
