"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles";

export default function ParticlesBG({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <div className="relative">
      <div className="relative z-10">{children}</div>
      <div className="fixed inset-0 -z-10">
        <Particles
          className="h-full w-full"
          quantity={250}
          ease={80}
          color={color}
          refresh
        />
      </div>
    </div>
  );
}
