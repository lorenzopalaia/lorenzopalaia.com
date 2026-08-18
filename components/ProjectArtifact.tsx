/**
 * Quiet Systems style reminder: each project gets its own inspectable technical fragment,
 * derived from what the software does instead of a reused decorative diagram.
 */

import type { Project } from "@/data/portfolio";

export function ProjectArtifact({ project }: { project: Project }) {
  const fragment = {
    "hacktrack-eu": (
      <>
        <path d="M82 161H198L260 96L364 142L458 79L600 120" />
        <path d="M91 242H188V321H337L410 261H593" className="muted" />
        <path d="M159 144V242M364 142V226M458 79V186" className="muted" />
        <circle cx="82" cy="161" r="9" />
        <circle cx="260" cy="96" r="7" />
        <circle cx="364" cy="142" r="10" />
        <circle cx="458" cy="79" r="7" />
        <circle cx="600" cy="120" r="9" />
        <path
          d="M52 340C140 260 204 300 296 239C380 183 450 251 642 131"
          className="signal"
        />
      </>
    ),
    mediashift: (
      <>
        <rect x="73" y="83" width="145" height="202" rx="2" />
        <path d="M104 121H188M104 153H163M104 185H181" className="muted" />
        <path d="M245 184H434" className="signal" />
        <path d="M385 135L434 184L385 233" className="signal" />
        <rect x="462" y="112" width="147" height="144" rx="2" />
        <path d="M497 151H573M497 183H549M497 215H582" className="muted" />
        <path
          d="M73 338H609M120 329V347M221 329V347M322 329V347M423 329V347M524 329V347"
          className="muted"
        />
      </>
    ),
    stackhound: (
      <>
        <rect x="67" y="82" width="253" height="231" rx="2" />
        <path
          d="M95 119H213M95 150H281M95 181H250M95 212H191M95 243H270"
          className="muted"
        />
        <rect x="385" y="100" width="197" height="50" rx="2" />
        <rect x="385" y="174" width="140" height="50" rx="2" />
        <rect x="385" y="248" width="218" height="50" rx="2" />
        <path d="M321 197H370M354 178L373 197L354 216" className="signal" />
        <circle cx="321" cy="197" r="8" />
      </>
    ),
    turboclone: (
      <>
        <path d="M114 76V133C114 159 135 177 161 177H269C295 177 316 198 316 224V276" />
        <path
          d="M114 76V133C114 159 135 177 161 177H458C484 177 504 155 504 130V83"
          className="muted"
        />
        <circle cx="114" cy="76" r="9" />
        <circle cx="316" cy="276" r="9" />
        <circle cx="504" cy="83" r="9" />
        <rect x="254" y="278" width="125" height="69" rx="2" />
        <rect x="440" y="278" width="125" height="69" rx="2" />
        <path d="M379 312H430M411 292L431 312L411 332" className="signal" />
      </>
    ),
  }[project.slug];

  return (
    <div
      className={`project-artifact project-artifact--${project.slug}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 680 390" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`artifact-grid-${project.slug}`}
            width="34"
            height="34"
            patternUnits="userSpaceOnUse"
          >
            <path d="M34 0H0V34" />
          </pattern>
        </defs>
        <rect
          width="680"
          height="390"
          fill={`url(#artifact-grid-${project.slug})`}
          className="grid"
        />
        {fragment}
        <path
          d="M38 368H642M38 360V376M158 360V376M278 360V376M398 360V376M518 360V376M642 360V376"
          className="baseline"
        />
      </svg>
      <div className="project-artifact__caption">
        <span>{project.category}</span>
        <i />
        <span>system fragment / {project.index}</span>
      </div>
    </div>
  );
}
