import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Extra Activities | Lorenzo Palaia",
  canonicalUrlRelative: "/extra-activities",
});

export default function ExtraActivitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
