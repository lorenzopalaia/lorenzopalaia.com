import { ArrowLeft, ArrowUpRight, Github, MoveUpRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { ProjectArtifact } from "@/components/projects/ProjectArtifact";
import ProjectNpmTelemetry from "@/components/projects/ProjectNpmTelemetry";

import { getFeaturedProject } from "@/lib/projects/featured";

import type { PortfolioProject } from "@/data/projects";

interface ProjectDetailProps {
  project: PortfolioProject;
  index: string;
}

export default function ProjectDetail({ project, index }: ProjectDetailProps) {
  const featured = getFeaturedProject(project);

  const coordinateIndex = featured?.index ?? index;

  return (
    <main className="detail-page">
      <header className="detail-header">
        <Link href="/#work" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to work
        </Link>

        <span className="scene-eyebrow">Project / {coordinateIndex}</span>
      </header>

      <section className="detail-hero">
        <div>
          <p className="detail-category">{project.category}</p>

          <h1>{project.name}</h1>

          <p className="detail-lede">{project.description}</p>
        </div>

        {featured && (
          <ProjectArtifact
            artifact={featured.artifact}
            category={project.category}
            projectIndex={featured.index}
            projectName={project.name}
          />
        )}

        <CoordinateRail coordinate="projectDetail" index={coordinateIndex} />
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

          {project.npmPackage && (
            <div>
              <span>NPM telemetry</span>

              <ProjectNpmTelemetry project={project} />
            </div>
          )}

          {project.repository && (
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
          )}

          {project.live && (
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
          )}
        </aside>
      </section>
    </main>
  );
}
