"use client";

/** Quiet Systems style reminder: achievement is a quiet exploration signal, never a gamified overlay. */

import { useEffect, useMemo, useState } from "react";

const achievementCatalog = [
  { id: "linkedin", title: "LinkedIn", points: 10 },
  { id: "resume", title: "Resume", points: 15 },
  { id: "socials", title: "Socials", points: 15 },
  { id: "thesis-paper", title: "Thesis Paper", points: 15 },
  { id: "blog-post", title: "Blog Post", points: 15 },
  { id: "post-like", title: "Post Like", points: 15 },
  { id: "theme", title: "Theme Switch", points: 5 },
  { id: "contact", title: "Contact", points: 30 },
  { id: "lead", title: "Blog Subscription", points: 30 },
] as const;

export type AchievementId = (typeof achievementCatalog)[number]["id"];

export function unlockSignal(id: AchievementId) {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent<AchievementId>("portfolio:unlock", { detail: id }),
    );
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

export function ExplorationSignals() {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);
  const [last, setLast] = useState<string | null>(null);
  useEffect(() => {
    try {
      setUnlocked(
        normalizeSignals(
          JSON.parse(
            localStorage.getItem("unlockedAchievements") ?? "[]",
          ) as string[],
        ),
      );
    } catch {
      setUnlocked([]);
    }
    const onUnlock = (event: Event) => {
      const id = (event as CustomEvent<AchievementId>).detail;
      setUnlocked((current) => {
        if (current.includes(id)) return current;
        const next = [...current, id];
        localStorage.setItem("unlockedAchievements", JSON.stringify(next));
        setLast(
          achievementCatalog.find((entry) => entry.id === id)?.title ?? null,
        );
        return next;
      });
    };
    window.addEventListener("portfolio:unlock", onUnlock);
    return () => window.removeEventListener("portfolio:unlock", onUnlock);
  }, []);
  const progress = useMemo(() => getSignalProgress(unlocked), [unlocked]);
  return (
    <aside className="exploration-signals" aria-label="Exploration signals">
      <span>
        {progress.points}/{progress.total} signal
      </span>
      <i>
        <b
          style={{ transform: `scaleX(${progress.points / progress.total})` }}
        />
      </i>
      {last && <em>{last} recorded</em>}
    </aside>
  );
}
