import type { Metadata } from "next";
import { getSEOTags } from "@/lib/seo";
import Notes from "@/components/pages/Notes";

export const metadata: Metadata = getSEOTags({
  title: "Field Notes — Lorenzo Palaia",
  description:
    "Technical notes by Lorenzo Palaia about software engineering, artificial intelligence, systems, experiments and development.",
  canonicalUrlRelative: "/blog",
});

export default function BlogPage() {
  return <Notes />;
}
