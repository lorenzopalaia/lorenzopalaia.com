import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { getSceneIndex } from "@/data/sceneNavigation";
import { experienceTimeline } from "@/data/experience";

export default function ExperienceScene() {
  return (
    <section id="experience" className="scene scene--experience">
      <div className="scene-heading scene-heading--dark">
        <div>
          <span className="scene-eyebrow">
            {getSceneIndex("experience")} / Experience
          </span>

          <h2>Work, as a timeline of systems.</h2>
        </div>

        <p>
          Roles and collaborations, arranged as a path rather than a
          conventional CV.
        </p>
      </div>

      <div className="experience-track">
        {experienceTimeline.map((item, index) => (
          <article
            className="experience-node"
            key={`${item.company}-${item.role}-${item.period}`}
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

      <CoordinateRail scene="experience" />

      <div className="scene-footer scene-footer--dark">
        <Link
          href="/experience"
          className="experience-record-link"
          data-cursor="RECORD"
        >
          Open full record
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
