"use client";

import { Alert, cn, Spacer } from "@heroui/react";
import * as React from "react";

import SigningComponent from "@/components/sign";

interface TeamSettingCardProps {
  className?: string;
}

const description = `Once the deadline passes, your vote will be locked. 
The presiding officer will then verify whether you are on the voter list and sign your vote. 
Although verification is done automatically, a signature by presiding officer is also needed for legitimacy. 
The presiding officer cannot see who you voted for since your vote is encrypted. Once the signature is added, 
your id is unlinked from your vote and replaced by kid of your public key (in jwks).`;

const Sign = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        {/* Title */}
        <p className="text-base font-medium text-default-700">Step 5</p>
        <p className="mt-1 text-sm font-normal text-default-400">Signing of vote by presiding officer.</p>
        {/* Invite */}
        <Spacer y={2} />
        <Alert hideIcon description={description} />
        <Spacer y={2} />
        <SigningComponent/>
      </div>
    )
  }
);

Sign.displayName = "Sign";

export default Sign;
