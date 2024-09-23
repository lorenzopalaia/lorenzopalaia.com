// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
import config from "@/config";
import SectionTitle from "./SectionTitle";

const SkillsAndLanguages = () => {
  /* const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 }); */

  /* //! animation is triggered every time the element is in view and mouse is moved (?), not just once
  const ProgressBar = ({ value, index }: { value: number; index: number }) => {
    return (
      <div className="w-full h-2 mt-3 mb-0 rounded-full bg-teal-400/10">
        <motion.div
          className="h-2 bg-teal-300 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.25 * index,
          }}
        />
      </div>
    );
  }; */

  const ProgressBar = ({ value, index }: { value: number; index: number }) => {
    return (
      <div className="w-full h-2 mt-3 mb-0 rounded-full bg-teal-400/10">
        <div
          className="h-2 bg-teal-300 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };

  return (
    <section
      // ref={ref}
      id="skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Skills"
    >
      <SectionTitle>Skills & Languages</SectionTitle>
      <div className="mb-12">
        {config.skills.map((skill, index) => (
          <div key={skill.name} className="flex flex-col mb-4 lg:flex-row">
            <div className="w-1/4">
              <p className="mt-2 mb-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                {skill.name}
              </p>
            </div>
            <div className="w-3/4">
              <ProgressBar value={skill.value} index={index} />
            </div>
          </div>
        ))}
      </div>
      <div>
        {config.languages.map((language, index) => (
          <div key={language.name} className="flex flex-col mb-4 lg:flex-row">
            <div className="w-1/4">
              <p className="mt-2 mb-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                {language.name}
              </p>
            </div>
            <div className="w-3/4">
              <ProgressBar
                value={language.value}
                index={index + config.skills.length}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsAndLanguages;
