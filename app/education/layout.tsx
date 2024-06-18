import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Education | Lorenzo Palaia",
  canonicalUrlRelative: "/education",
});

export default function EducationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
