import config from "@/config";
import SectionTitle from "./SectionTitle";

const SkillsAndLanguages = () => {
  return (
    <section
      id="skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Skills"
    >
      <SectionTitle>Skills & Languages</SectionTitle>
      <div className="mb-12">
        {config.skills.map((skill) => (
          <div key={skill.name} className="flex flex-col lg:flex-row mb-4">
            <div className="w-1/4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-2 mb-0">
                {skill.name}
              </p>
            </div>
            <div className="w-3/4">
              <progress
                className="progress progress-primary bg-teal-400/10 progress-animate"
                data-value={skill.value}
                max="100"
                value={skill.value}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        {config.languages.map((language) => (
          <div key={language.name} className="flex flex-col lg:flex-row mb-4">
            <div className="w-1/4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-2 mb-0">
                {language.name}
              </p>
            </div>
            <div className="w-3/4">
              <progress
                className="progress progress-primary bg-teal-400/10 progress-animate"
                data-value={language.value}
                max="100"
                value={language.value}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsAndLanguages;
