"use client";

/**
 * Quiet Systems style reminder: achievements are exploration signals,
 * never a gamification layer. Unlock feedback should be brief, quiet,
 * and disappear automatically.
 */

import { useEffect, useMemo, useState } from "react";

import { achievementCatalog, type AchievementId } from "@/data/achievements";

const UNLOCK_STORAGE_KEY = "unlockedAchievements";

const UNLOCK_EVENT_NAME = "portfolio:unlock";

const FEEDBACK_DURATION = 2400;

type UnlockFeedback = {
  id: AchievementId;
  title: string;
  points: number;
} | null;

export function unlockSignal(id: AchievementId) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<AchievementId>(UNLOCK_EVENT_NAME, {
        detail: id,
      }),
    );
  }
}

function normalizeSignals(ids: readonly string[]) {
  return Array.from(
    new Set(
      ids.filter((id): id is AchievementId =>
        achievementCatalog.some((entry) => entry.id === id),
      ),
    ),
  );
}

function getSignalProgress(ids: readonly string[]) {
  const unlocked = normalizeSignals(ids);

  return {
    points: achievementCatalog
      .filter((entry) => unlocked.includes(entry.id))
      .reduce((sum, entry) => sum + entry.points, 0),

    total: achievementCatalog.reduce((sum, entry) => sum + entry.points, 0),
  };
}

function readUnlockedSignals(): AchievementId[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(UNLOCK_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return normalizeSignals(parsed);
  } catch {
    return [];
  }
}

export function ExplorationSignals() {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);

  const [unlockFeedback, setUnlockFeedback] = useState<UnlockFeedback>(null);

  useEffect(() => {
    setUnlocked(readUnlockedSignals());

    let feedbackTimeout: ReturnType<typeof setTimeout> | null = null;

    const onUnlock = (event: Event) => {
      const id = (event as CustomEvent<AchievementId>).detail;

      const achievement = achievementCatalog.find((entry) => entry.id === id);

      if (!achievement) {
        return;
      }

      setUnlocked((current) => {
        if (current.includes(id)) {
          return current;
        }

        const next = [...current, id];

        localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(next));

        setUnlockFeedback({
          id,
          title: achievement.title,
          points: achievement.points,
        });

        if (feedbackTimeout) {
          clearTimeout(feedbackTimeout);
        }

        feedbackTimeout = setTimeout(() => {
          setUnlockFeedback(null);
        }, FEEDBACK_DURATION);

        return next;
      });
    };

    window.addEventListener(UNLOCK_EVENT_NAME, onUnlock);

    return () => {
      window.removeEventListener(UNLOCK_EVENT_NAME, onUnlock);

      if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
      }
    };
  }, []);

  const progress = useMemo(() => getSignalProgress(unlocked), [unlocked]);

  const progressRatio =
    progress.total > 0 ? progress.points / progress.total : 0;

  return (
    <aside className="exploration-signals" aria-label="Exploration signals">
      <span>
        {progress.points}/{progress.total} signal
      </span>

      <i aria-hidden="true">
        <b
          style={{
            transform: `scaleX(${progressRatio})`,
          }}
        />
      </i>

      <span className="sr-only" aria-live="polite">
        {unlockFeedback
          ? `Achievement unlocked: ${unlockFeedback.title}, ${unlockFeedback.points} points`
          : ""}
      </span>

      {unlockFeedback && (
        <em key={unlockFeedback.id}>
          Unlocked · {unlockFeedback.title} +{unlockFeedback.points}
        </em>
      )}
    </aside>
  );
}
