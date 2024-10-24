import config from "@/config";
import SectionTitle from "@/components/SectionTitle";
import Progress from "@/components/Progress";

export default function SkillsAndLangs() {
  return (
    <section
      id="skills-and-langs"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Skills & Languages"
    >
      <SectionTitle>Skills & Languages</SectionTitle>
      <div className="mb-20">
        {config.skills.map((skill, index) => (
          <div key={skill.name} className="flex flex-col mb-9 lg:flex-row">
            <div className="lg:w-1/4">
              <p className="mt-2 mb-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                {skill.name}
              </p>
            </div>
            <div className="lg:w-3/4">
              <Progress value={skill.value} index={index} />
            </div>
          </div>
        ))}
      </div>
      <div>
        {config.languages.map((language, index) => (
          <div key={language.name} className="flex flex-col mb-9 lg:flex-row">
            <div className="lg:w-1/4">
              <p className="mt-2 mb-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                {language.name}
              </p>
            </div>
            <div className="lg:w-3/4">
              <Progress
                value={language.value}
                index={index + config.skills.length}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
