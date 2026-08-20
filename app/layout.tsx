import { getSEOTags } from "@/lib/seo";
import "./globals.css";
import "katex/dist/katex.min.css";
import { config } from "@/config";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ExplorationSignals } from "@/components/ExplorationSignals";
import QueryProvider from "@/providers/QueryProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import { CursorSystem } from "@/components/CursorSystem";

export const metadata = getSEOTags({
  title: "Lorenzo Palaia | Software Engineer",
  canonicalUrlRelative: "/",
  keywords: config.settings.keywords,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <QueryProvider>
              <TooltipProvider>
                <Toaster />
                <ThemeSwitcher />
                <ExplorationSignals />

                <main>
                  <CursorSystem />
                  {children}
                </main>
              </TooltipProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
