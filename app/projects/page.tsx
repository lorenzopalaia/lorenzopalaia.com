"use client";

import { config } from "@/config";

import ProjectCard, { CardSkeleton } from "@/components/ProjectCard";

import useGithubRepos from "@/hooks/useGithubRepos";

export default function Projects() {
  const { repos, isLoading } = useGithubRepos();

  const projects = repos.sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <section className="my-16">
      <h1 className="text-2xl sm:text-3xl title">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {isLoading ? (
          <>
            {Array.from({ length: config.featuredProjects.length }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
