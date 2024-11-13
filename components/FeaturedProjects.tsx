"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import useGithubRepos from "@/hooks/useGithubRepos";

import { config } from "@/config";

import ProjectCard, { CardSkeleton } from "@/components/ProjectCard";

export default function FeaturedProjects() {
  const { repos, isLoading } = useGithubRepos();

  const featuredProjects = config.featuredProjects
    .map((projectName) => repos.find((repo) => repo.name === projectName))
    .filter((repo) => repo !== undefined);

  return (
    <section className="my-16">
      <div className="flex items-center justify-between">
        <p className="title text-2xl sm:text-3xl">Featured Projects</p>
        <Link
          href="/projects"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          View More <ArrowRight size={16} />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isLoading ? (
          <>
            {Array.from({ length: config.featuredProjects.length }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
