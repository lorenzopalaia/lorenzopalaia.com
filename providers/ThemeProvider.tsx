"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

import {
  ThemeContext,
  type ResolvedTheme,
  type ThemePreference,
} from "@/contexts/ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeContextBridge({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme, setTheme } = useNextTheme();

  const preference: ThemePreference =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";

  const resolved: ResolvedTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ThemeContext.Provider
      value={{
        preference,
        theme: resolved,
        setTheme: (nextTheme: Exclude<ThemePreference, "system">) => {
          setTheme(nextTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      disableTransitionOnChange
    >
      <ThemeContextBridge>{children}</ThemeContextBridge>
    </NextThemesProvider>
  );
}
