import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { CoordinateRail } from "@/components/CoordinateRail";
import GithubStats from "@/components/home/GithubStats";
import { ProjectRail } from "@/components/projects/ProjectRail";
import { getSceneIndex } from "@/data/sceneNavigation";

export default function WorkScene() {
  return (
    <section id="work" className="scene scene--work">
      <div className="scene-heading">
        <div>
          <span className="scene-eyebrow">
            {getSceneIndex("work")} / Selected work
          </span>

          <h2>Useful things, built to be explored.</h2>
        </div>

        <p>
          Four products that make systems, information and familiar development
          workflows easier to move through.
        </p>
      </div>

      <GithubStats />

      <Image
        className="work-asset"
        src="/assets/images/bg/work.webp"
        alt=""
        width={1920}
        height={1080}
        sizes="(min-width: 1280px) 65vw, 90vw"
      />

      <ProjectRail />

      <CoordinateRail scene="work" />

      <div className="scene-footer">
        <Link href="/projects" data-cursor="INDEX">
          Open full work index
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
