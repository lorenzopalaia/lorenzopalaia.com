import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
    title: "Projects | Lorenzo Palaia",
    canonicalUrlRelative: "/projects",
});

export default function EducationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
