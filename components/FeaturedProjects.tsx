"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import useGithubRepos from "@/hooks/useGithubRepos";

import { config } from "@/config";

import ProjectCard, { CardSkeleton } from "@/components/ProjectCard";

export default function FeaturedProjects() {
  const { repos, isLoading } = useGithubRepos();

  const featuredProjects = repos.filter((repo) => {
    return config.featuredProjects.includes(repo.name);
  });

  return (
    <section className="my-16">
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl title">Featured Projects</p>
        <Link
          href="/projects"
          className="flex gap-2 items-center text-muted-foreground hover:text-primary"
        >
          View More <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
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
