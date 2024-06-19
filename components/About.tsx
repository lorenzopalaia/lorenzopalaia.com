import PlainLink from "@/components/Links/PlainLink";
import LocalLink from "@/components/Links/LocalLink";
import ExternalLink from "@/components/Links/ExternalLink";

const SectionTitle = () => (
  <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
      About
    </h2>
  </div>
);

const About = () => {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <SectionTitle />
      <div>
        <p className="mb-4">
          Hello fellow Earthlings! 🌍 I&apos;m Lorenzo, your friendly
          neighborhood <PlainLink href="/">Software Engineer</PlainLink>.
        </p>
        <p className="mb-4">
          When I&apos;m not coding, you can find me exploring the vast realms of{" "}
          <PlainLink href="https://github.com/lorenzopalaia">
            programming
          </PlainLink>
          , , diving deep into the mysteries of{" "}
          <PlainLink href="/">artificial intelligence</PlainLink>, and
          navigating the <PlainLink href="/">blockchain</PlainLink> universe.
        </p>
        <p className="mb-4">
          I&apos;ve got a knack for <PlainLink href="/">finance</PlainLink>, and
          I love to <PlainLink href="/">embark on adventures</PlainLink> around
          the globe. Let&apos;s create some magic with code!
        </p>
        <p>
          I always like to introduce some gamification 🕹️ into my projects. Here
          I would like to summarize my work path through the{" "}
          <LocalLink href="/milestones">Milestones</LocalLink>
        </p>
      </div>
      <div className="mt-12">
        <div className="mb-4">
          <LocalLink href="/resume.pdf">View Full Résumé</LocalLink>
        </div>
        <div>
          <ExternalLink href="/">Book a Call</ExternalLink>
        </div>
      </div>
    </section>
  );
};

export default About;
