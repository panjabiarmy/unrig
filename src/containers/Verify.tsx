"use client";

import { Alert, cn, Spacer } from "@heroui/react";
import * as React from "react";

import VerifyTable from "@/components/verify";

interface TeamSettingCardProps {
  className?: string;
}

const description1 = `Let's assume four voters, Aslam, Akram, Mohsin and Bilal are voting in NA-131 Lahore-IX constituency. 
Their private key, public key, jwks and vote are given below.
Saleem is the presiding officer for this constituency. His private key and jwks are also given.`;

const description = `Once your vote has been signed, it is immediately published online. 
Once all votes in a constituency have been signed, an immutable pdf is published so votes become tamper-proof 
and can be verified by anyone. The signature can be verified using the jwks list for a constituency. The 
encrypted votes must be decrypted by a group of people using their private keys to prove rigging.`;

const Verify = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        {/* Title */}
        <p className="text-base font-medium text-default-700">Step 6</p>
        <p className="mt-1 text-sm font-normal text-default-400">Verify Vote and report discrepancy.</p>
        {/* Invite */}
        <Spacer y={2} />
        <Alert hideIcon description={description} />
        <Spacer y={2} />
        <Alert color="primary" hideIcon description={description1} />
        <Spacer y={2} />
        <div className="flex justify-center">
          <VerifyTable />
        </div>
      </div>
    )
  }
);

Verify.displayName = "Verify";

export default Verify;
