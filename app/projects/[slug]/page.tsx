import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSEOTags } from "@/lib/seo";
import {
  getPortfolioProject,
  getPortfolioProjects,
} from "@/lib/github/projects";
import ProjectDetail from "@/components/pages/ProjectDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getPortfolioProject(slug);

  if (!project) {
    return getSEOTags({
      title: "Project not found — Lorenzo Palaia",
      description: "The requested project could not be found.",
      canonicalUrlRelative: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return getSEOTags({
    title: `${project.name} — Lorenzo Palaia`,
    description: project.description,
    canonicalUrlRelative: `/projects/${project.slug}`,
    openGraph: {
      title: `${project.name} — Lorenzo Palaia`,
      description: project.description,
      url: `https://www.lorenzopalaia.com/projects/${project.slug}`,
      type: "website",
    },
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const projects = await getPortfolioProjects();

  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((entry) => entry.slug === slug);

  const index = String(projectIndex + 1).padStart(2, "0");

  return <ProjectDetail project={project} index={index} />;
}
