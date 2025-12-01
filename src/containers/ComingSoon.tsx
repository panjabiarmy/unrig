"use client";

import { cn, Spacer } from "@heroui/react";
import * as React from "react";


interface RefProps {
  className?: string;
}

const ComingSoon = React.forwardRef<HTMLDivElement, RefProps>(
  ({ className, ...rest }, ref) => {

    return (
      <div {...rest} ref={ref} className={cn("p-2", className)}>
        <Spacer y={2} />
        <p className="text-lg font-medium text-default-700 mb-1">Coming Soon...</p>
      </div>
    )
  }
);

ComingSoon.displayName = "ComingSoon";

export default ComingSoon;
