import { getSEOTags } from "@/lib/seo";
import localFont from "next/font/local";
import "./globals.css";
import { config } from "@/config";

import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClickEffectProvider from "@/components/ClickEffectProvider";
import { AchievementsProvider } from "@/contexts/AchievementsContext";

import SitePulseTracker from "@/components/SitePulseTracker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlay from "@/components/Overlay";
import ParticlesBG from "@/components/ParticlesBG";
import ScrollProgressBar from "@/components/ScrollProgressBar";

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
    <html lang="en">
      <head>
        <SitePulseTracker />
      </head>
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
                <ParticlesBG>
                  <ScrollProgressBar />
                  <Header />
                  <div className="relative z-10 container mx-auto max-w-3xl px-8">
                    <main>{children}</main>
                    <Footer />
                  </div>
                </ParticlesBG>
                <Toaster />
              </TooltipProvider>
            </ClickEffectProvider>
          </AchievementsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
