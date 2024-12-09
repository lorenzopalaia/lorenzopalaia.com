import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Blog | Lorenzo Palaia",
  description:
    "Lorenzo Palaia's blog where he shares insights, tutorials, and updates on various topics.",
  canonicalUrlRelative: "/blog",
  keywords: config.settings.keywords,
});

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
