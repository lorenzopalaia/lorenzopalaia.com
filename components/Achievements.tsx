"use client";

import { useAchievementsContext } from "@/contexts/AchievementsContext";
import { RefreshCcw } from "lucide-react";

export default function Achievements() {
  const { currentPoints, totalPoints, resetAchievements } =
    useAchievementsContext();

  return (
    <p className="flex items-center gap-2 pb-4 text-sm font-bold">
      {currentPoints}/{totalPoints} points
      <RefreshCcw
        size={16}
        onClick={resetAchievements}
        className="cursor-pointer"
      />
    </p>
  );
}
