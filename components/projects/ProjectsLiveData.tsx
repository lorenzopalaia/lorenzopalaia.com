"use client";

import { GitFork, Github, Star } from "lucide-react";
import Link from "next/link";

import { useGithubRepos, useGithubUser } from "@/hooks/api/useGithub";

import ProjectNpmTelemetry from "@/components/projects/ProjectNpmTelemetry";

type Variant = "metrics" | "repositories";

interface ProjectsLiveDataProps {
  variant: Variant;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function ProjectsLiveData({ variant }: ProjectsLiveDataProps) {
  const githubUser = useGithubUser();
  const githubRepos = useGithubRepos();

  const githubLoading = githubUser.isLoading || githubRepos.isLoading;

  const githubError = githubUser.isError || githubRepos.isError;

  const projects = githubRepos.data ?? [];

  const totalStars = projects.reduce(
    (total, project) => total + project.stars,
    0,
  );

  if (variant === "metrics") {
    return (
      <div className="work-metrics">
        {githubLoading ? (
          <span>Reading live GitHub signal…</span>
        ) : githubError ? (
          <span>Live GitHub data unavailable.</span>
        ) : (
          <>
            <Metric
              label="Public repos"
              value={githubUser.data?.publicRepos ?? 0}
            />

            <Metric label="Followers" value={githubUser.data?.followers ?? 0} />

            <Metric label="Stars in index" value={totalStars} />
          </>
        )}
      </div>
    );
  }

  return (
    <section className="work-repositories">
      <header>
        <span className="scene-eyebrow">Repository field</span>

        <span>
          {githubLoading
            ? "Loading live data"
            : githubError
              ? "Live data unavailable"
              : `${projects.length} visible projects`}
        </span>
      </header>

      {githubError && (
        <p className="work-source-error">
          Live GitHub data is currently unavailable. Visit the public profile
          directly for the source record.
        </p>
      )}

      <div className="repo-list">
        {projects.map((project, index) => (
          <article key={project.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>

            <div>
              <h2>
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="VIEW"
                  aria-label={`Open ${project.name} project detail`}
                >
                  {project.name}
                </Link>
              </h2>

              <p>{project.description}</p>

              <em>{project.technologies.join(" / ") || "Unclassified"}</em>
            </div>

            <div className="repo-stats">
              {project.repository && (
                <>
                  <span>
                    <Star size={13} />
                    {project.stars}
                  </span>

                  <span>
                    <GitFork size={13} />
                    {project.forks}
                  </span>
                </>
              )}

              <ProjectNpmTelemetry project={project} />
            </div>

            {project.repository && (
              <Link
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.name} on GitHub`}
                data-cursor="OPEN"
              >
                <Github size={18} />
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
