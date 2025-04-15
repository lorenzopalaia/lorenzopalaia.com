import { getSEOTags } from "@/lib/seo";

import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Projects | Lorenzo Palaia",
  description:
    "Discover the various projects and works of Lorenzo Palaia, showcasing his expertise in web development and other technical fields.",
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
