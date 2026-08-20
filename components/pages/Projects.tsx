"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { useGithubRepos } from "@/hooks/api/useGithub";

import { featuredProjectNames } from "@/data/projects";

import { CoordinateRail } from "@/components/CoordinateRail";

import ProjectsLiveData from "@/components/projects/ProjectsLiveData";

export default function Projects() {
  const { data: projects, isLoading, isError } = useGithubRepos();

  const selectedProjects = featuredProjectNames
    .map((name) => projects?.find((project) => project.name === name))
    .filter((project): project is NonNullable<typeof project> =>
      Boolean(project),
    )
    .map((project, index) => ({
      ...project,
      index: String(index + 1).padStart(2, "0"),
    }));

  return (
    <main className="work-page">
      <header className="detail-header">
        <Link href="/#work" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to the environment
        </Link>

        <span className="scene-eyebrow">Live work index</span>
      </header>

      <section className="work-hero">
        <div>
          <p className="detail-category">GitHub / source of record</p>

          <h1>
            What is
            <br />
            running now.
          </h1>

          <p>
            Public repositories and lightweight package telemetry from the
            active source system.
          </p>
        </div>

        <CoordinateRail coordinate="projectsIndex" />

        <ProjectsLiveData variant="metrics" />
      </section>

      <section className="work-selected">
        <span className="scene-eyebrow">Selected objects</span>

        {isLoading ? (
          <div>
            <span>Reading selected projects…</span>
          </div>
        ) : isError ? (
          <div>
            <span>Selected project data unavailable.</span>
          </div>
        ) : (
          <div>
            {selectedProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <span>{project.index}</span>

                <strong>{project.name}</strong>

                <em>{project.category}</em>

                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <ProjectsLiveData variant="repositories" />
    </main>
  );
}
