"use client";

/**
 * Quiet Systems style reminder: the theme control is a visible system state,
 * compact and deliberate. System preference is implicit; the UI exposes only
 * the two explicit appearance choices.
 */

import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

import { unlockSignal } from "@/components/ExplorationSignals";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { theme, preference, setTheme } = useTheme();

  const pathname = usePathname();

  const handleThemeChange = (nextTheme: "light" | "dark") => {
    if (nextTheme === theme && preference === nextTheme) {
      return;
    }

    setTheme(nextTheme);
    unlockSignal("theme");
  };

  const placement = getThemeSwitcherPlacement(pathname);

  return (
    <div
      className={`theme-switcher ${placement}`}
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => handleThemeChange("light")}
        aria-label="Switch to light theme"
        aria-pressed={theme === "light"}
        className={theme === "light" ? "is-active" : ""}
        data-cursor="LIGHT"
      >
        <Sun size={13} aria-hidden="true" />
        <span>Light</span>
      </button>

      <button
        type="button"
        onClick={() => handleThemeChange("dark")}
        aria-label="Switch to dark theme"
        aria-pressed={theme === "dark"}
        className={theme === "dark" ? "is-active" : ""}
        data-cursor="DARK"
      >
        <Moon size={13} aria-hidden="true" />
        <span>Dark</span>
      </button>
    </div>
  );
}

function getThemeSwitcherPlacement(pathname: string | null) {
  return pathname === "/" ? "theme-switcher--home" : "theme-switcher--route";
}
