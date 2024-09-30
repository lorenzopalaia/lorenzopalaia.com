import { Inter } from "next/font/google";
import "./globals.css";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import Head from "next/head";

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
      <Head>
        <script
          defer
          data-website-id="66fa7aac39ae75c2af18f9ce"
          data-domain="lorenzopalaia.it"
          src="https://datafa.st/js/script.js"
        ></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
