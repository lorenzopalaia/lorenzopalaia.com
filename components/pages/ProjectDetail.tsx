"use client";

import { ArrowLeft, ArrowUpRight, Github, MoveUpRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { ProjectArtifact } from "@/components/projects/ProjectArtifact";
import ProjectNpmTelemetry, {
  getNpmPackage,
} from "@/components/projects/ProjectNpmTelemetry";

import { projects } from "@/data/portfolio";

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return (
      <main className="detail-page detail-page--missing">
        <Link href="/" className="detail-back">
          <ArrowLeft size={18} />
          Back to the environment
        </Link>

        <h1>Project not found.</h1>
      </main>
    );
  }

  const otherProjects = projects
    .filter((entry) => entry.slug !== project.slug)
    .slice(0, 2);

  const repositoryName = project.repository.split("/").pop() ?? project.name;

  const npmPackage = getNpmPackage(repositoryName);

  return (
    <main className="detail-page">
      <header className="detail-header">
        <Link href="/#work" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to work
        </Link>

        <span className="scene-eyebrow">Project / {project.index}</span>
      </header>

      <section className="detail-hero">
        <div>
          <p className="detail-category">{project.category}</p>

          <h1>{project.name}</h1>

          <p className="detail-lede">{project.description}</p>
        </div>

        <ProjectArtifact project={project} />

        <CoordinateRail index={project.index} label="PROJECT / INSPECT" />
      </section>

      <section className="detail-grid">
        <div className="detail-copy">
          <span className="scene-eyebrow">The premise</span>

          <p>{project.summary}</p>

          <p>
            This entry is linked directly to its public project source and live
            endpoint, so the work can be explored as software rather than as a
            static portfolio claim.
          </p>
        </div>

        <aside className="detail-specs">
          <div>
            <span>Stack</span>

            <p>{project.technologies.join(" · ")}</p>
          </div>

          {npmPackage && (
            <div>
              <span>NPM telemetry</span>

              <ProjectNpmTelemetry repositoryName={repositoryName} />
            </div>
          )}

          <Link
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            data-cursor="↗"
          >
            <Github size={18} />
            Source
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href={project.live}
            target="_blank"
            rel="noreferrer"
            data-cursor="↗"
          >
            <MoveUpRight size={18} />
            Live project
            <ArrowUpRight size={16} />
          </Link>
        </aside>
      </section>

      <section className="detail-next">
        <span className="scene-eyebrow">Continue exploring</span>

        <div>
          {otherProjects.map((entry) => (
            <Link
              key={entry.slug}
              href={`/projects/${entry.slug}`}
              data-cursor="NEXT"
            >
              <span>{entry.index}</span>
              {entry.name}
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
