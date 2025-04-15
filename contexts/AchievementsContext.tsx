"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useToast } from "@/hooks/use-toast";
import useSound from "use-sound";

import confetti from "canvas-confetti";

import { achievements as _achievements } from "@/config";
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
  const [hasTriggeredConfetti, setHasTriggeredConfetti] =
    useState<boolean>(false);

  const { toast } = useToast();

  const [play] = useSound("/audio/achievement.mp3");

  useEffect(() => {
    const savedUnlockedIds = localStorage.getItem("unlockedAchievements");
    const hasShownConfetti = localStorage.getItem("hasShownConfetti");

    setHasTriggeredConfetti(hasShownConfetti === "true");

    if (savedUnlockedIds) {
      try {
        const unlockedIds = JSON.parse(savedUnlockedIds);
        setAchievements((prev) =>
          prev.map((achievement) => ({
            ...achievement,
            unlocked: unlockedIds.includes(achievement.id),
          })),
        );
      } catch (error) {
        console.error(
          "Error parsing unlocked achievements from localStorage:",
          error,
        );
      }
    }
  }, []);

  useEffect(() => {
    const unlockedIds = achievements
      .filter((achievement) => achievement.unlocked)
      .map((achievement) => achievement.id);
    localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedIds));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem("hasShownConfetti", hasTriggeredConfetti.toString());
  }, [hasTriggeredConfetti]);

  const totalPoints = achievements.reduce((acc, achievement) => {
    return acc + achievement.points;
  }, 0);

  const currentPoints = achievements.reduce((acc, achievement) => {
    return acc + (achievement.unlocked ? achievement.points : 0);
  }, 0);

  useEffect(() => {
    if (
      currentPoints === totalPoints &&
      totalPoints > 0 &&
      !hasTriggeredConfetti
    ) {
      triggerConfetti();
      setHasTriggeredConfetti(true);
    }
  }, [currentPoints, totalPoints, hasTriggeredConfetti]);

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

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
        duration: 10000,
      });
    }
  };

  const resetAchievements = () => {
    setAchievements((prev) =>
      prev.map((achievement) => ({ ...achievement, unlocked: false })),
    );
    setHasTriggeredConfetti(false);
    localStorage.removeItem("hasShownConfetti");
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
