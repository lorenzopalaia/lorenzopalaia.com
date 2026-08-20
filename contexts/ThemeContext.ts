"use client";

import { createContext, useContext } from "react";

export type ThemePreference = "system" | "light" | "dark";

export type ResolvedTheme = "light" | "dark";

export interface ThemeContextType {
  preference: ThemePreference;
  theme: ResolvedTheme;
  setTheme: (theme: Exclude<ThemePreference, "system">) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
