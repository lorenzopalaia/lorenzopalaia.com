"use client";

/** Quiet Systems style reminder: the theme control is a visible system state, compact and deliberate. */

import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

import { unlockSignal } from "@/components/ExplorationSignals";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const setTheme = () => {
    toggleTheme?.();
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
        onClick={theme === "dark" ? setTheme : undefined}
        aria-pressed={theme === "light"}
        className={theme === "light" ? "is-active" : ""}
        aria-label="Use light theme"
        data-cursor="LIGHT"
      >
        <Sun size={13} />
        <span>Light</span>
      </button>

      <button
        type="button"
        onClick={theme === "light" ? setTheme : undefined}
        aria-pressed={theme === "dark"}
        className={theme === "dark" ? "is-active" : ""}
        aria-label="Use dark theme"
        data-cursor="DARK"
      >
        <Moon size={13} />
        <span>Dark</span>
      </button>
    </div>
  );
}

function getThemeSwitcherPlacement(pathname: string | null) {
  return pathname === "/" ? "theme-switcher--home" : "theme-switcher--route";
}
