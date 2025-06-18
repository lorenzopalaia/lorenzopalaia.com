import { getSEOTags } from "@/lib/seo";
import localFont from "next/font/local";
import "./globals.css";
import { config } from "@/config";

import ThemeProvider from "@/providers/ThemeProvider";
import ClickEffectProvider from "@/providers/ClickEffectProvider";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AchievementsProvider } from "@/contexts/AchievementsContext";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

import Overlay from "@/components/Overlay";
import BeamsBG from "@/components/BeamsBG";
import ParticlesBG from "@/components/ParticlesBG";
import ScrollProgressBar from "@/components/ScrollProgressBar";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const bricolageGrotesqueBold = localFont({
  src: "./fonts/BricolageGrotesqueBold.ttf",
  variable: "--font-bricolage-grotesque-bold",
});

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
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesqueBold.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AchievementsProvider>
            <ClickEffectProvider>
              <TooltipProvider>
                <Overlay />
                <BeamsBG>
                  <ParticlesBG>
                    <ScrollProgressBar />
                    <Header />
                    <div className="relative z-10 container mx-auto max-w-3xl px-8">
                      <main>{children}</main>
                      <Footer />
                    </div>
                  </ParticlesBG>
                </BeamsBG>
                <Toaster />
              </TooltipProvider>
            </ClickEffectProvider>
          </AchievementsProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
