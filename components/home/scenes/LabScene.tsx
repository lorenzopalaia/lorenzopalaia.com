import Image from "next/image";

import { CoordinateRail } from "@/components/CoordinateRail";
import { TechnicalGraphic } from "@/components/home/TechnicalGraphic";
import { getSceneIndex } from "@/data/sceneNavigation";
import { labItems } from "@/data/lab";

export default function LabScene() {
  return (
    <section id="lab" className="scene scene--lab" aria-labelledby="lab-title">
      <div className="lab-intro">
        <span className="scene-eyebrow">{getSceneIndex("lab")} / Lab</span>

        <h2 id="lab-title">Things I build to see what happens.</h2>

        <p>
          An experimental surface for curiosity, open source and applied
          technical exploration.
        </p>
      </div>

      <Image
        className="lab-asset"
        src="/assets/images/bg/lab.webp"
        alt=""
        width={1920}
        height={1080}
        sizes="(min-width: 1280px) 65vw, 90vw"
      />

      <TechnicalGraphic variant="lab" />

      <CoordinateRail scene="lab" />

      <ul className="lab-items" aria-label="Selected lab experiments">
        {labItems.map((item) => (
          <li key={item.code} className="lab-item" data-cursor="EXPLORE">
            <span>{item.code}</span>

            <h3>{item.title}</h3>

            <p>{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
