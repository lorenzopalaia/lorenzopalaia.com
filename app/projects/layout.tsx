import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Projects | Lorenzo Palaia",
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
