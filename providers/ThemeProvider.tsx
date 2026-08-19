"use client";

import { useEffect, useState } from "react";

import { ThemeContext, type Theme } from "@/contexts/ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

function getInitialTheme(defaultTheme: Theme, switchable: boolean): Theme {
  if (!switchable || typeof window === "undefined") {
    return defaultTheme;
  }

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

function resolveInitialTheme(
  defaultTheme: Theme,
  switchable: boolean,
  requestedTheme: string | null,
  storedTheme: string | null,
): Theme {
  if (!switchable) {
    return defaultTheme;
  }

  if (requestedTheme === "light" || requestedTheme === "dark") {
    return requestedTheme;
  }

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return defaultTheme;
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

    root.classList.toggle("dark", theme === "dark");

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme((current) => (current === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        switchable,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
