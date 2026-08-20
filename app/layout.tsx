import { getSEOTags } from "@/lib/seo";

import "./globals.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ExplorationSignals } from "@/components/ExplorationSignals";
import QueryProvider from "@/providers/QueryProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CursorSystem } from "@/components/CursorSystem";

import { siteConfig } from "@/data/config";

import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";

export const metadata = getSEOTags({
  title: "Lorenzo Palaia — Software Engineer",
  description:
    "Lorenzo Palaia is a Software Engineer and Technical Lead based in Rome, working across software development, artificial intelligence, developer tools and automation.",
  canonicalUrlRelative: "/",
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
