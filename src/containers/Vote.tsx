"use client";

import { Alert, cn, Spacer } from "@heroui/react";
import * as React from "react";

import CustomRadioGroup from "@/components/custom-radio-group";

interface TeamSettingCardProps {
  className?: string;
}

const description = `Once your keypair has been validated, proceed to cast your vote. 
The raw vote will be in the following format: id|candidate|timestamp.`;

const Vote = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        {/* Title */}
        <p className="text-base font-medium text-default-700">Step 3</p>
        <p className="mt-1 text-sm font-normal text-default-400">Vote for your favorite candidate.</p>
        {/* Invite */}
        <Spacer y={2} />
        <Alert hideIcon description={description} />
        <Spacer y={2} />
        <div className="flex justify-center">
          <CustomRadioGroup />
        </div>
      </div>
    )
  }
);

Vote.displayName = "Generate";

export default Vote;
