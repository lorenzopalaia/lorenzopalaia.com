import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: "Experience | Lorenzo Palaia",
  canonicalUrlRelative: "/experience",
  keywords: config.keywords,
});

export default function ExperienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
