"use client";

/**
 * Quiet Systems style reminder: desktop is an editorial sideways environment;
 * mobile is a separately composed vertical reading experience with purposeful interaction.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Github,
  Mail,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CoordinateRail } from "@/components/CoordinateRail";
import { CursorSystem } from "@/components/CursorSystem";
import { ProjectRail } from "@/components/ProjectRail";
import { TechnicalGraphic } from "@/components/TechnicalGraphic";
import { ContactPanel } from "@/components/ContactPanel";
import { unlockSignal } from "@/components/ExplorationSignals";
import {
  experience,
  labItems,
  projects,
  skills,
  socials,
} from "@/data/portfolio";
import { articles } from "@/content/articles";
import { sceneNavigation } from "@/data/sceneNavigation";
import Image from "next/image";

const scenes = sceneNavigation.map((scene) => scene.id);

function scrollToScene(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
}

export default function Home() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const reduceMotion = useReducedMotion();
  const syncScene = useCallback(() => {
    const node = viewportRef.current;
    if (!node || window.innerWidth < 920) return;
    setActiveScene(
      Math.max(
        0,
        Math.min(
          scenes.length - 1,
          Math.round(node.scrollLeft / node.clientWidth),
        ),
      ),
    );
  }, []);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      if (
        window.innerWidth < 920 ||
        Math.abs(event.deltaY) < Math.abs(event.deltaX)
      )
        return;
      event.preventDefault();
      node.scrollBy({
        left: event.deltaY,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        window.innerWidth < 920 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToScene(scenes[Math.min(activeScene + 1, scenes.length - 1)]);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToScene(scenes[Math.max(activeScene - 1, 0)]);
      }
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("scroll", syncScene, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("scroll", syncScene);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeScene, reduceMotion, syncScene]);

  return (
    <div className="portfolio-shell">
      <CursorSystem />
      <header className="site-header">
        <Link
          href="/"
          className="brand"
          aria-label="Lorenzo Palaia, home"
          data-cursor="HOME"
        >
          <span>
            Lorenzo
            <br />
            Palaia
          </span>
          <i aria-hidden="true" />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {sceneNavigation.map((scene, index) => (
            <button
              type="button"
              onClick={() => scrollToScene(scene.id)}
              className={activeScene === index ? "is-active" : ""}
              key={scene.id}
              data-cursor="GO"
            >
              <span>{scene.index}</span>
              {scene.label}
            </button>
          ))}
        </nav>
        <Link
          href="mailto:info@lorenzopalaia.com"
          className="header-contact"
          data-cursor="EMAIL"
        >
          <Mail size={16} />
          <span>Get in touch</span>
        </Link>
      </header>
      <div ref={viewportRef} className="scene-viewport">
        <section id="intro" className="scene scene--intro">
          <div className="scene-meta scene-meta--intro">
            <span>Rome / Italy</span>
            <span>Software engineer</span>
            <span>2026</span>
          </div>
          <div className="intro-copy">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="intro-kicker"
            >
              Building software with a strong feeling for the details.
            </motion.p>
            <h1>
              <span>Software</span>
              <span className="outline-word">engineer</span>
              <span>by nature.</span>
            </h1>
            <p className="intro-description">
              I’m Lorenzo Palaia — a Rome-based engineer interested in product
              development, AI, developer tools, automation and ideas best
              understood by building them.
            </p>
            <button
              className="text-cta"
              onClick={() => scrollToScene("work")}
              data-cursor="EXPLORE"
            >
              Explore selected work <ArrowDownRight size={20} />
            </button>
          </div>
          <Image
            className="hero-asset"
            src="/assets/images/bg/intro.webp"
            alt=""
            width={1920}
            height={1080}
          />
          <TechnicalGraphic />
          <CoordinateRail index="00" label="ORIGIN / 41.9028" />
          <div className="intro-side-note">
            An independent portfolio
            <br />
            as a piece of software.
          </div>
        </section>
        <section id="work" className="scene scene--work">
          <div className="scene-heading">
            <div>
              <span className="scene-eyebrow">01 / Selected work</span>
              <h2>Useful things, built to be explored.</h2>
            </div>
            <p>
              Four products that make systems, information and familiar
              development workflows easier to move through.
            </p>
          </div>
          <Image
            className="work-asset"
            src="/assets/images/bg/work.webp"
            alt=""
            width={1920}
            height={1080}
          />
          <ProjectRail projects={projects} />
          <CoordinateRail index="01" label="WORK / 04 OBJECTS" />
          <div className="scene-footer">
            <Link href="/projects" data-cursor="INDEX">
              Open full work index <ArrowRight size={15} />
            </Link>
            <span>01—04</span>
          </div>
        </section>
        <section id="about" className="scene scene--about">
          <div className="about-aside">
            <span className="scene-eyebrow">02 / About</span>
            <span className="vertical-index">SYSTEM / PERSON</span>
          </div>
          <div className="about-copy">
            <h2>
              I like the point where a useful system becomes a good experience.
            </h2>
            <div className="about-grid">
              <p>
                I’m a Software Engineer at Reply and a Computer and Automation
                Engineering graduate from Sapienza University of Rome. I work
                across product thinking and implementation, with a practical
                interest in how software behaves in the real world.
              </p>
              <p>
                My orbit includes artificial intelligence, blockchain, finance,
                interfaces, automation and creative technology. The common
                thread is curiosity: making something is usually the fastest way
                to understand it.
              </p>
            </div>
            <div
              className="skill-tape"
              aria-label="Selected tools and interests"
            >
              {skills.slice(0, 9).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="about-mark">
            <span>LP</span>
            <i />
          </div>
          <CoordinateRail index="02" label="PERSON / SYSTEM" />
        </section>
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
              Open full record <ArrowRight size={15} />
            </Link>
            <span>2019—now</span>
          </div>
        </section>
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
          />
          <TechnicalGraphic variant="lab" />
          <CoordinateRail index="04" label="LAB / EXPERIMENT" dark />
          <div className="lab-items">
            {labItems.map((item) => (
              <article
                key={item.code}
                className="lab-item"
                data-cursor="EXPLORE"
              >
                <span>{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <Sparkles size={16} />
              </article>
            ))}
          </div>
        </section>
        <section id="notes" className="scene scene--notes">
          <div className="notes-intro">
            <span className="scene-eyebrow">05 / Field notes</span>
            <h2>Technical curiosity, put into words.</h2>
            <Link href="/blog" className="text-cta" data-cursor="READ">
              Open the archive <ArrowRight size={20} />
            </Link>
          </div>
          <div className="notes-list">
            {articles.slice(0, 4).map((note, index) => (
              <Link
                key={note.slug}
                href={`/blog/${note.slug}`}
                data-cursor="READ"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{note.title}</h3>
                <em>{note.publishedAt.slice(0, 4)}</em>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <CoordinateRail index="05" label="NOTES / INDEX" />
        </section>
        <section id="contact" className="scene scene--contact">
          <div className="contact-top">
            <span className="scene-eyebrow">06 / Contact</span>
            <span>Available for interesting systems.</span>
          </div>
          <div className="contact-main">
            <h2>
              Let’s make the next
              <br />
              <em>useful thing.</em>
            </h2>
            <ContactPanel />
          </div>
          <footer className="site-footer">
            <span>© {new Date().getFullYear()} Lorenzo Palaia</span>
            <div>
              {socials.map((social) => (
                <Link
                  onClick={() =>
                    unlockSignal(
                      social.label === "LinkedIn" ? "linkedin" : "socials",
                    )
                  }
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  data-cursor="↗"
                >
                  {social.label}
                </Link>
              ))}
            </div>
            <div className="footer-utility">
              <Link href="/privacy">Privacy</Link>
              <Link
                href="https://github.com/lorenzopalaia"
                target="_blank"
                rel="noreferrer"
                className="footer-github"
                data-cursor="↗"
              >
                <Github size={16} /> Source
              </Link>
            </div>
          </footer>
          <CoordinateRail index="06" label="CONTACT / OPEN" />
        </section>
      </div>
      <AnimatePresence>
        <motion.div
          className="scene-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>{String(activeScene + 1).padStart(2, "0")}</span>
          <i>
            <b
              style={{
                transform: `scaleX(${(activeScene + 1) / scenes.length})`,
              }}
            />
          </i>
          <span>{String(scenes.length).padStart(2, "0")}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
