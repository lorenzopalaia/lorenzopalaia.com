"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(defaultTheme: Theme, switchable: boolean): Theme {
  if (!switchable || typeof window === "undefined") return defaultTheme;
  const requestedTheme = new URLSearchParams(window.location.search).get(
    "theme",
  );
  const storedTheme = localStorage.getItem("theme");
  return resolveInitialTheme(
    defaultTheme,
    switchable,
    requestedTheme,
    storedTheme,
  );
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    getInitialTheme(defaultTheme, switchable),
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export type Theme = "light" | "dark";

function resolveInitialTheme(
  defaultTheme: Theme,
  switchable: boolean,
  requestedTheme: string | null,
  storedTheme: string | null,
): Theme {
  if (!switchable) return defaultTheme;
  if (requestedTheme === "light" || requestedTheme === "dark")
    return requestedTheme;
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return defaultTheme;
}
