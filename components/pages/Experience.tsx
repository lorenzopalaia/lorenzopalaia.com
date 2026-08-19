/**
 * Quiet Systems style reminder: the long-form record is a technical ledger—dense,
 * indexed and calm—rather than a conventional CV page or card grid.
 */

import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { CoordinateRail } from "@/components/CoordinateRail";
import { artifacts, recordGroups, skills } from "@/data/portfolio";

import ArtifactLink from "@/components/ArtifactLink";

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

        <CoordinateRail index="07" label="RECORD / VERIFIED" />
      </section>

      <section className="record-artifacts">
        <span className="scene-eyebrow">Artifacts / Downloads</span>

        <div>
          {artifacts.map((artifact) => (
            <ArtifactLink key={artifact.code} artifact={artifact} />
          ))}
        </div>
      </section>

      {recordGroups.map((group, groupIndex) => (
        <section key={group.id} className="record-group" id={group.id}>
          <header>
            <span className="scene-eyebrow">
              {String(groupIndex + 1).padStart(2, "0")} / {group.label}
            </span>

            <span>{String(group.entries.length).padStart(2, "0")} entries</span>
          </header>

          <div className="record-entries">
            {group.entries.map((entry, entryIndex) => (
              <article key={`${entry.company}-${entry.title}-${entryIndex}`}>
                <div className="record-entry__axis">
                  <span>{String(entryIndex + 1).padStart(2, "0")}</span>

                  <i />
                </div>

                <div className="record-entry__head">
                  {entry.image && (
                    <Image
                      src={entry.image}
                      alt=""
                      width={1920}
                      height={1080}
                      sizes="31px"
                    />
                  )}

                  <div>
                    <h2>{entry.title}</h2>

                    <p>{entry.company}</p>
                  </div>

                  <em>{entry.period}</em>
                </div>

                <ul>
                  {entry.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {(entry.href || entry.links?.length) && (
                  <div className="record-entry__links">
                    {entry.href && (
                      <Link href={entry.href} target="_blank" rel="noreferrer">
                        Visit source
                        <ArrowUpRight size={14} />
                      </Link>
                    )}

                    {entry.links?.map((link) => (
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
            ))}
          </div>
        </section>
      ))}

      <section className="record-skills">
        <span className="scene-eyebrow">Technical vocabulary</span>

        <div>
          {skills.map((skill) => (
            <b key={skill}>{skill}</b>
          ))}
        </div>
      </section>
    </main>
  );
}
