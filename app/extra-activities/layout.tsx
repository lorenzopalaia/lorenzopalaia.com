import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: "Extra Activities | Lorenzo Palaia",
  canonicalUrlRelative: "/extra-activities",
  keywords: config.keywords,
});

export default function ExtraActivitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
