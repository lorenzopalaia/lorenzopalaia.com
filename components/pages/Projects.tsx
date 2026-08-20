import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { projects } from "@/data/portfolio";

import ProjectsLiveData from "@/components/projects/ProjectsLiveData";

export default function Projects() {
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

        <div>
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <span>{project.index}</span>

              <strong>{project.name}</strong>

              <em>{project.category}</em>

              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <ProjectsLiveData variant="repositories" />
    </main>
  );
}
