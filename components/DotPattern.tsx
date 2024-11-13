"use client";

import { cn } from "@/lib/utils";
import { DotPattern as DotPatternGradient } from "@/components/ui/dot-pattern";

export default function DotPattern({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <DotPatternGradient
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "absolute inset-0 -z-10 [mask-image:radial-gradient(circle,white_0%,transparent_100%)] dark:opacity-50",
        )}
      />
      <div>{children}</div>
    </div>
  );
}
