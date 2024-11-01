import { Inter } from "next/font/google";
import "./globals.css";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// import Featured from "@/components/Featured";
import SitePulseTracker from "@/components/SitePulseTracker";
import Spotlight from "@/components/Spotlight";

const inter = Inter({ subsets: ["latin"] });

export const metadata = getSEOTags({
  title: "Lorenzo Palaia | Software Engineer",
  canonicalUrlRelative: "/",
  keywords: config.keywords,
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
      <body className={`${inter.className}`}>
        <div className="relative">
          {/* <Featured /> */}
          <Spotlight />
          {children}
        </div>
      </body>
    </html>
  );
}
