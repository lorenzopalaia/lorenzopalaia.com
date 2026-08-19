import { skills } from "@/data/portfolio";
import { CoordinateRail } from "@/components/CoordinateRail";

export default function AboutScene() {
  return (
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
            Engineering graduate from Sapienza University of Rome. I work across
            product thinking and implementation, with a practical interest in
            how software behaves in the real world.
          </p>

          <p>
            My orbit includes artificial intelligence, blockchain, finance,
            interfaces, automation and creative technology. The common thread is
            curiosity: making something is usually the fastest way to understand
            it.
          </p>
        </div>

        <div className="skill-tape" aria-label="Selected tools and interests">
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
  );
}
