import type { Metadata } from "next";

import { getSEOTags } from "@/lib/seo";
import Notes from "@/components/pages/Notes";

export const metadata: Metadata = getSEOTags({
  title: "Field Notes — Lorenzo Palaia",
  description:
    "Technical writing on engineering, systems, experiments and the work around them.",
  canonicalUrlRelative: "/blog",
  keywords: [
    "Lorenzo Palaia",
    "Software Engineering",
    "Technology",
    "Programming",
    "AI",
  ],
});

export default function BlogPage() {
  return <Notes />;
}
