import Projects from "@/components/pages/Projects";
import type { Metadata } from "next";
import { getSEOTags } from "@/lib/seo";

export const metadata: Metadata = getSEOTags({
  title: "Projects — Lorenzo Palaia",
  description:
    "A collection of personal and professional projects, showcasing a range of skills and technologies.",
  canonicalUrlRelative: "/projects",
});

export default function ProjectsPage() {
  return <Projects />;
}
