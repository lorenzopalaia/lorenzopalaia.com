import type { Metadata } from "next";
import { getSEOTags } from "@/lib/seo";
import Experience from "@/components/pages/Experience";

export const metadata: Metadata = getSEOTags({
  title: "Experience — Lorenzo Palaia",
  description:
    "Professional experience, education, open source contributions and technical work by Lorenzo Palaia, Software Engineer and Technical Lead.",
  canonicalUrlRelative: "/experience",
});

export default function ExperiencePage() {
  return <Experience />;
}
