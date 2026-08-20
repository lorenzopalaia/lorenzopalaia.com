import "server-only";

import type { PortfolioProject } from "@/data/projects";

import {
  featuredArtifactFallback,
  featuredArtifacts,
  type FeaturedArtifactId,
} from "@/data/projectArtifacts";

import { featuredProjectNames } from "@/data/projects";

import { getPortfolioProjects } from "@/lib/github/projects";

export type FeaturedProject = {
  project: PortfolioProject;
  index: string;
  artifact: FeaturedArtifactId;
};

function resolveFeaturedProject(
  project: PortfolioProject,
): FeaturedProject | null {
  const index = featuredProjectNames.findIndex((name) => name === project.name);

  if (index === -1) {
    return null;
  }

  return {
    project,
    index: String(index + 1).padStart(2, "0"),
    artifact: featuredArtifacts[index] ?? featuredArtifactFallback,
  };
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const projects = await getPortfolioProjects();

  return featuredProjectNames
    .map((name) => {
      const project = projects.find((entry) => entry.name === name);

      if (!project) {
        return null;
      }

      return resolveFeaturedProject(project);
    })
    .filter((entry): entry is FeaturedProject => entry !== null);
}

export function getFeaturedProject(
  project: PortfolioProject,
): FeaturedProject | null {
  return resolveFeaturedProject(project);
}
