import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import SceneLinkButton from "@/components/home/SceneLinkButton";
import { CoordinateRail } from "@/components/CoordinateRail";
import { TechnicalGraphic } from "@/components/home/TechnicalGraphic";

export default function IntroScene() {
  return (
    <section id="intro" className="scene scene--intro">
      <div className="scene-meta scene-meta--intro">
        <span>Rome / Italy</span>
        <span>Software engineer</span>
        <span>2026</span>
      </div>

      <div className="intro-copy">
        <p className="intro-kicker">
          Building software with a strong feeling for the details.
        </p>

        <h1>
          <span>Software</span>
          <span className="outline-word">engineer</span>
          <span>by nature.</span>
        </h1>

        <p className="intro-description">
          I’m Lorenzo Palaia — a Rome-based engineer interested in product
          development, AI, developer tools, automation and ideas best understood
          by building them.
        </p>

        <SceneLinkButton sceneId="work">
          Explore selected work
          <ArrowDownRight size={20} />
        </SceneLinkButton>
      </div>

      <Image
        className="hero-asset"
        src="/assets/images/bg/intro.webp"
        alt=""
        width={1920}
        height={1080}
        sizes="(min-width: 1280px) 65vw, 90vw"
        fetchPriority="high"
        loading="eager"
      />

      <TechnicalGraphic />

      <CoordinateRail index="00" label="ORIGIN / 41.9028" />

      <div className="intro-side-note">
        An independent portfolio
        <br />
        as a piece of software.
      </div>
    </section>
  );
}
