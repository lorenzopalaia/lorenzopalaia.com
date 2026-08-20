import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { CoordinateRail } from "@/components/CoordinateRail";

import { artifacts } from "@/data/artifacts";
import { workExperience } from "@/data/experience";
import { education } from "@/data/education";
import { activities } from "@/data/activities";

import ArtifactLink from "@/components/experience/ArtifactLink";

function RecordEntry({
  index,
  title,
  company,
  period,
  items,
  href,
  image,
  links,
}: {
  index: number;
  title: string;
  company: string;
  period: string;
  items: string[];
  href?: string;
  image?: string;
  links?: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <article className="record-entry">
      <div className="record-entry__axis">
        <span>{String(index).padStart(2, "0")}</span>
        <i />
      </div>

      <div className="record-entry__head">
        {image && (
          <Image src={image} alt="" width={1920} height={1080} sizes="31px" />
        )}

        <div>
          <h2>{title}</h2>
          <p>{company}</p>
        </div>

        <em>{period}</em>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {(href || links?.length) && (
        <div className="record-entry__links">
          {href && (
            <Link href={href} target="_blank" rel="noreferrer">
              Visit source
              <ArrowUpRight size={14} />
            </Link>
          )}

          {links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.title}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Experience() {
  return (
    <main className="record-page">
      <header className="detail-header">
        <Link href="/#experience" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to the environment
        </Link>

        <span className="scene-eyebrow">Record / 2019—Now</span>
      </header>

      <section className="record-hero">
        <div>
          <p className="detail-category">Professional record</p>

          <h1>
            The longer
            <br />
            version.
          </h1>

          <p>
            Roles, study, collaborations and contribution history preserved as
            an inspectable working record.
          </p>
        </div>

        <Image
          src="/assets/images/avatar.webp"
          alt="Lorenzo Palaia"
          width={1920}
          height={1080}
          sizes="(min-width: 1280px) 350px, 45vw"
        />

        <CoordinateRail coordinate="experienceRecord" />
      </section>

      <section className="record-artifacts">
        <span className="scene-eyebrow">Artifacts / Downloads</span>

        <div>
          {artifacts.map((artifact) => (
            <ArtifactLink key={artifact.code} artifact={artifact} />
          ))}
        </div>
      </section>

      <section className="record-group" id="work">
        <header>
          <span className="scene-eyebrow">01 / Work log</span>

          <span>{String(workExperience.length).padStart(2, "0")} entries</span>
        </header>

        <div className="record-entries">
          {workExperience.flatMap((company) =>
            company.positions.map((position, index) => (
              <RecordEntry
                key={`${company.company}-${position.title}-${position.startDate}`}
                index={index + 1}
                title={position.title}
                company={
                  position.client
                    ? `${company.company} / ${position.client}`
                    : company.company
                }
                period={`${position.startDate} — ${position.endDate}`}
                items={position.items}
                href={company.href}
                image={company.image}
              />
            )),
          )}
        </div>
      </section>

      <section className="record-group" id="education">
        <header>
          <span className="scene-eyebrow">02 / Education</span>

          <span>{String(education.length).padStart(2, "0")} entries</span>
        </header>

        <div className="record-entries">
          {education.map((entry, index) => (
            <RecordEntry
              key={`${entry.company}-${entry.title}`}
              index={index + 1}
              title={entry.title}
              company={entry.company}
              period={entry.period}
              items={entry.items}
              href={entry.href}
              image={entry.image}
              links={entry.links}
            />
          ))}
        </div>
      </section>

      <section className="record-group" id="extra">
        <header>
          <span className="scene-eyebrow">03 / Additional activity</span>

          <span>{String(activities.length).padStart(2, "0")} entries</span>
        </header>

        <div className="record-entries">
          {activities.map((entry, index) => (
            <RecordEntry
              key={`${entry.company}-${entry.title}-${index}`}
              index={index + 1}
              title={entry.title}
              company={entry.company}
              period={entry.period}
              items={entry.items}
              href={entry.href}
              image={entry.image}
              links={entry.links}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
