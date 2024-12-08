"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { achievements as _achievements } from "@/config";

import { useToast } from "@/hooks/use-toast";

import useSound from "use-sound";

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
}

interface AchievementsContextProps {
  currentPoints: number;
  totalPoints: number;
  unlockAchievement: (id: string) => void;
  resetAchievements: () => void;
}

const AchievementsContext = createContext<AchievementsContextProps | undefined>(
  undefined,
);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] =
    useState<Achievement[]>(_achievements);

  const { toast } = useToast();

  const [play] = useSound("/audio/achievement.mp3");

  useEffect(() => {
    const savedUnlockedIds = localStorage.getItem("unlockedAchievements");
    if (savedUnlockedIds) {
      const unlockedIds = JSON.parse(savedUnlockedIds);
      setAchievements((prev) =>
        prev.map((achievement) => ({
          ...achievement,
          unlocked: unlockedIds.includes(achievement.id),
        })),
      );
    }
  }, []);

  useEffect(() => {
    const unlockedIds = achievements
      .filter((achievement) => achievement.unlocked)
      .map((achievement) => achievement.id);
    localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedIds));
  }, [achievements]);

  const totalPoints = achievements.reduce((acc, achievement) => {
    return acc + achievement.points;
  }, 0);

  const currentPoints = achievements.reduce((acc, achievement) => {
    return acc + (achievement.unlocked ? achievement.points : 0);
  }, 0);

  const unlockAchievement = (id: string) => {
    const alreadyUnlocked = achievements.some(
      (achievement) => achievement.id === id && achievement.unlocked,
    );

    if (alreadyUnlocked) {
      return;
    }

    setAchievements((prev) => {
      return prev.map((achievement) => {
        if (achievement.id === id) {
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
    });

    const unlockedAchievement = achievements.find(
      (achievement) => achievement.id === id,
    );

    if (unlockedAchievement) {
      play();
      toast({
        title: unlockedAchievement.title,
        description: unlockedAchievement.description,
      });
    }
  };

  const resetAchievements = () => {
    setAchievements((prev) =>
      prev.map((achievement) => ({ ...achievement, unlocked: false })),
    );
  };

  return (
    <AchievementsContext.Provider
      value={{
        currentPoints,
        totalPoints,
        unlockAchievement,
        resetAchievements,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievementsContext = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error(
      "useAchievementsContext must be used within an AchievementsProvider",
    );
  }
  return context;
};
