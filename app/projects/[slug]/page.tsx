import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { getSEOTags } from "@/lib/seo";
import type { Metadata } from "next";
import ProjectDetail from "@/components/pages/ProjectDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return getSEOTags({
      title: "Project not found — Lorenzo Palaia",
      canonicalUrlRelative: `/projects/${slug}`,
    });
  }

  return getSEOTags({
    title: `${project.name} — Lorenzo Palaia`,
    description: project.description,
    canonicalUrlRelative: `/projects/${project.slug}`,
    keywords: project.technologies,
    openGraph: {
      title: project.name,
      description: project.description,
      url: `https://www.lorenzopalaia.com/projects/${project.slug}`,
      type: "website",
    },
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail slug={slug} />;
}
