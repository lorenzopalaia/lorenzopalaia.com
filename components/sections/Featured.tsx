"use client";

import AnimatedGradientText from "@/components/ui/animated-gradient-text";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

export default function Featured({
  href,
  emoji,
  text,
  className,
}: {
  href: string;
  emoji: string;
  text: string;
  className?: string;
}) {
  const { unlockAchievement } = useAchievementsContext();

  return (
    <Link
      href={href}
      target="_blank"
      onClick={() => unlockAchievement("linkedin")}
    >
      <AnimatedGradientText className="mt-8">
        {emoji} <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `animate-gradient inline bg-linear-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            className,
          )}
        >
          {text}
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </Link>
  );
}
