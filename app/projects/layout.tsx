import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Projects | Lorenzo Palaia",
  description: "Lorenzo Palaia's projects",
  canonicalUrlRelative: "/projects",
  keywords: config.settings.keywords,
});

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
