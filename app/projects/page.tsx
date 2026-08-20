import type { Metadata } from "next";
import { getSEOTags } from "@/lib/seo";
import Projects from "@/components/pages/Projects";

export const metadata: Metadata = getSEOTags({
  title: "Projects — Lorenzo Palaia",
  description:
    "Selected software projects by Lorenzo Palaia, spanning web development, developer tools, automation and experimental software.",
  canonicalUrlRelative: "/projects",
});

export default function ProjectsPage() {
  return <Projects />;
}
