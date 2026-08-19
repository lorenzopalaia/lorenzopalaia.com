import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { experience } from "@/data/portfolio";

export default function ExperienceScene() {
  return (
    <section id="experience" className="scene scene--experience">
      <div className="scene-heading scene-heading--dark">
        <div>
          <span className="scene-eyebrow">03 / Experience</span>

          <h2>Work, as a timeline of systems.</h2>
        </div>

        <p>
          Roles and collaborations, arranged as a path rather than a
          conventional CV.
        </p>
      </div>

      <div className="experience-track">
        {experience.map((item, index) => (
          <article
            className="experience-node"
            key={`${item.company}-${item.role}`}
            data-cursor="VIEW"
          >
            <span className="experience-node__line" />

            <span className="experience-node__index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="experience-node__period">{item.period}</p>

            <h3>{item.role}</h3>

            <p className="experience-node__company">
              {item.company} <i>/</i> {item.client}
            </p>

            <p className="experience-node__detail">{item.detail}</p>
          </article>
        ))}
      </div>

      <CoordinateRail index="03" label="TIMELINE / 2019—NOW" dark />

      <div className="scene-footer scene-footer--dark">
        <Link
          href="/experience"
          className="experience-record-link"
          data-cursor="RECORD"
        >
          Open full record
          <ArrowRight size={15} />
        </Link>

        <span>2019—now</span>
      </div>
    </section>
  );
}
