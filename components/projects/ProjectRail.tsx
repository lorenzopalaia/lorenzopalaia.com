import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import type { FeaturedArtifactId } from "@/data/projectArtifacts";

import { getFeaturedProjects } from "@/lib/projects/featured";

const railLabels: Record<FeaturedArtifactId, string> = {
  map: "EVENT / MAP",
  flow: "CONVERT / FLOW",
  stack: "STACK / TRACE",
  clone: "CLONE / SEQ",
};

const railPaths: Record<
  FeaturedArtifactId,
  {
    trace: string;
    nodes: [number, number][];
  }
> = {
  map: {
    trace: "M12 66H55V32H108V52H160",
    nodes: [
      [12, 66],
      [55, 66],
      [55, 32],
      [108, 32],
      [108, 52],
      [160, 52],
    ],
  },

  flow: {
    trace: "M12 54H54L77 28H116L147 63H164",
    nodes: [
      [12, 54],
      [54, 54],
      [77, 28],
      [116, 28],
      [147, 63],
      [164, 63],
    ],
  },

  stack: {
    trace: "M12 65V28H51V48H93V20H128V53H164",
    nodes: [
      [12, 65],
      [12, 28],
      [51, 28],
      [51, 48],
      [93, 48],
      [93, 20],
      [128, 20],
      [128, 53],
      [164, 53],
    ],
  },

  clone: {
    trace: "M12 30H55V61H95V31H136V54H164",
    nodes: [
      [12, 30],
      [55, 30],
      [55, 61],
      [95, 61],
      [95, 31],
      [136, 31],
      [136, 54],
      [164, 54],
    ],
  },
};

function ObjectArtifact({ artifact }: { artifact: FeaturedArtifactId }) {
  const path = railPaths[artifact];

  return (
    <div className="project-object__artifact" aria-hidden="true">
      <span>{railLabels[artifact]}</span>

      <svg viewBox="0 0 176 84">
        <path
          className="artifact-grid"
          d="M8 16H168M8 42H168M8 68H168M32 8V76M80 8V76M128 8V76"
        />

        <path className="artifact-trace" d={path.trace} />

        {path.nodes.map(([x, y], index) => (
          <circle
            key={`${x}-${y}-${index}`}
            cx={x}
            cy={y}
            r={index === path.nodes.length - 1 ? 4 : 2.2}
          />
        ))}
      </svg>
    </div>
  );
}

export async function ProjectRail() {
  const featured = await getFeaturedProjects();

  return (
    <div className="project-rail">
      {featured.map(({ project, index, artifact }) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="project-object"
          data-cursor="OPEN"
          aria-label={`Open ${project.name}`}
        >
          <span className="project-object__index">{index}</span>

          <div className="project-object__main">
            <span className="project-object__type">{project.category}</span>

            <h3>{project.name}</h3>

            <p>{project.description}</p>

            <ObjectArtifact artifact={artifact} />

            <div className="project-object__stack">
              {project.technologies.slice(0, 3).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <span className="project-object__open">
            <ChevronRight size={20} />

            <ArrowUpRight size={17} />
          </span>
        </Link>
      ))}
    </div>
  );
}
