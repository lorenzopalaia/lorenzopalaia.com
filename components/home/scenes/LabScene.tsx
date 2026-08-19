import Image from "next/image";
import { Sparkles } from "lucide-react";

import { CoordinateRail } from "@/components/CoordinateRail";
import { TechnicalGraphic } from "@/components/TechnicalGraphic";
import { labItems } from "@/data/portfolio";

export default function LabScene() {
  return (
    <section id="lab" className="scene scene--lab">
      <div className="lab-intro">
        <span className="scene-eyebrow">04 / Lab</span>

        <h2>Things I build to see what happens.</h2>

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

      <CoordinateRail index="04" label="LAB / EXPERIMENT" dark />

      <div className="lab-items">
        {labItems.map((item) => (
          <article key={item.code} className="lab-item" data-cursor="EXPLORE">
            <span>{item.code}</span>

            <h3>{item.title}</h3>

            <p>{item.detail}</p>

            <Sparkles size={16} />
          </article>
        ))}
      </div>
    </section>
  );
}
