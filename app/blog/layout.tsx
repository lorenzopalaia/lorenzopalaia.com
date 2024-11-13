import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Blog | Lorenzo Palaia",
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
