import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: "Milestones | Lorenzo Palaia",
  canonicalUrlRelative: "/milestones",
  keywords: config.keywords,
});

export default function MilestonesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
