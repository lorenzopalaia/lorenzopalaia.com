import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Milestones | Lorenzo Palaia",
  canonicalUrlRelative: "/milestones",
});

export default function MilestonesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
