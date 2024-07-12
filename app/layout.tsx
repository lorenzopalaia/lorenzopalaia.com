import { Inter } from "next/font/google";
import "./globals.css";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

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
    <html lang="en" className="scroll-smooth bg-slate-900">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
