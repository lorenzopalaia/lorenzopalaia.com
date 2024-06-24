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
          <div key={skill.name} className="flex flex-col mb-4 lg:flex-row">
            <div className="w-1/4">
              <p className="mt-2 mb-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                {skill.name}
              </p>
            </div>
            <div className="w-3/4">
              <div className="w-full h-2 mt-3 mb-0 rounded-full bg-teal-400/10">
                <div
                  className="h-2 bg-teal-300 rounded-full"
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {config.languages.map((language) => (
          <div key={language.name} className="flex flex-col mb-4 lg:flex-row">
            <div className="w-1/4">
              <p className="mt-2 mb-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                {language.name}
              </p>
            </div>
            <div className="w-3/4">
              <div className="w-full h-2 mt-3 mb-0 rounded-full bg-teal-400/10">
                <div
                  className="h-2 bg-teal-300 rounded-full"
                  style={{ width: `${language.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsAndLanguages;
