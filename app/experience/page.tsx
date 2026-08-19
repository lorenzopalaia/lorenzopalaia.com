import Experience from "@/components/pages/Experience";
import type { Metadata } from "next";
import { getSEOTags } from "@/lib/seo";

export const metadata: Metadata = getSEOTags({
  title: "Experience — Lorenzo Palaia",
  description:
    "A timeline of work, collaborations and roles, arranged as a path rather than a conventional CV.",
  canonicalUrlRelative: "/experience",
});

export default function ExperiencePage() {
  return <Experience />;
}
