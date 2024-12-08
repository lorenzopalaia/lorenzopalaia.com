"use client";

import { config } from "@/config";

import Link from "next/link";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

export default function Socials() {
  const { unlockAchievement } = useAchievementsContext();

  return (
    <div className="flex gap-4">
      {config.socials.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          onClick={() => unlockAchievement("socials")}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}
