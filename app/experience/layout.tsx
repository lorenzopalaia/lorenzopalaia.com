import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
    title: "Experience | Lorenzo Palaia",
    canonicalUrlRelative: "/experience",
});

export default function ExperienceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
