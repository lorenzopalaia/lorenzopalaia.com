import { getSEOTags } from "@/lib/seo";

import "./globals.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ExplorationSignals } from "@/components/ExplorationSignals";
import QueryProvider from "@/providers/QueryProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CursorSystem } from "@/components/CursorSystem";
import StructuredData from "@/components/seo/StructuredData";

import {
  personStructuredData,
  websiteStructuredData,
} from "@/data/structuredData";

import { siteConfig } from "@/data/config";

import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [websiteStructuredData, personStructuredData],
};

export const metadata = getSEOTags({
  title: `${siteConfig.name} | Software Engineer`,
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
              <Toaster />
              <ThemeSwitcher />
              <ExplorationSignals />

              <div className="site-root">
                <CursorSystem />
                {children}
              </div>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>

        <StructuredData data={structuredData} />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
