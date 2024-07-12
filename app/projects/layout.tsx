import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: "Projects | Lorenzo Palaia",
  canonicalUrlRelative: "/projects",
  keywords: config.keywords,
});

export default function EducationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
