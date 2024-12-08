"use client";

import ShinyButton from "@/components/ui/shiny-button";

import Link from "next/link";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

import { FileDown } from "lucide-react";

export default function ResumeButton() {
  const { unlockAchievement } = useAchievementsContext();

  return (
    <Link
      href="/assets/resume.pdf"
      target="_blank"
      onClick={() => unlockAchievement("resume")}
    >
      <ShinyButton className="title">
        <div className="flex items-center gap-2">
          Resume
          <FileDown />
        </div>
      </ShinyButton>
    </Link>
  );
}
