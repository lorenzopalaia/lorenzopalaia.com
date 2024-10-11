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
      <head>
        <script
          defer
          data-website-id="66fa7aac39ae75c2af18f9ce"
          data-domain="lorenzopalaia.it"
          src="https://datafa.st/js/script.js"
        ></script>
        <script
          defer
          data-website-id="4d510912-52dc-45a9-ada5-a166e260e315"
          data-domain="lorenzopalaia.it"
          src="https://site-pulse.vercel.app/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
