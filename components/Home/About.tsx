import BaseLink from "@/components/Links/BaseLink";
import InternalLink from "@/components/Links/InternalLink";
import ExternalLink from "@/components/Links/ExternalLink";

import SectionTitle from "@/components/SectionTitle";

export default function About() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <SectionTitle>About</SectionTitle>
      <div>
        <p className="mb-4">
          Hello fellow Earthlings! 🌍 I&apos;m Lorenzo, your friendly
          neighborhood <BaseLink>Software Engineer</BaseLink>.
        </p>
        <p className="mb-4">
          When I&apos;m not coding, you can find me exploring the vast realms of{" "}
          <BaseLink href="https://www.github.com/lorenzopalaia">
            programming
          </BaseLink>
          , diving deep into the mysteries of{" "}
          <BaseLink>artificial intelligence</BaseLink>, and navigating the{" "}
          <BaseLink>blockchain</BaseLink> universe.
        </p>
        <p className="mb-4">
          I&apos;ve got a knack for <BaseLink>finance</BaseLink>, and I love to{" "}
          <BaseLink>embark on adventures</BaseLink> around the globe. Let&apos;s
          create some magic with code!
        </p>
        <p>
          I always like to introduce some{" "}
          <BaseLink href="/milestones">gamification</BaseLink> 🕹️ into my
          projects. Here I would like to summarize my work path through the{" "}
          <InternalLink href="/milestones">Milestones</InternalLink>
        </p>
      </div>
      <div className="mt-12">
        <div className="mb-4">
          <InternalLink href="/assets/resume.pdf">
            View Full Résumé
          </InternalLink>
        </div>
        <div>
          <ExternalLink href="https://cal.com/lorenzopalaia/30min">
            Book a Call
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
