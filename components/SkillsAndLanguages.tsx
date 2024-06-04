import config from "@/config";

const SkillsAndLanguages = () => {
    return (
        <section id="skills" className="section">
            {config.skills.map((skill) => (
                <div
                    key={skill.id || skill.name}
                    className="flex flex-col lg:flex-row mb-12"
                >
                    <div className="w-1/4 mx-4">
                        <p className="uppercase font-light text-neutral-400 text-sm mt-1 mb-0">
                            {skill.name}
                        </p>
                    </div>
                    <div className="w-3/4 mx-4">
                        <progress
                            className="progress progress-primary"
                            value={skill.value}
                            max="100"
                        />
                    </div>
                </div>
            ))}
            {config.languages.map((language) => (
                <div
                    key={language.id || language.name}
                    className="flex flex-col lg:flex-row mb-12"
                >
                    <div className="w-1/4 mx-4">
                        <p className="uppercase font-light text-neutral-400 text-sm mt-1 mb-0">
                            {language.name}
                        </p>
                    </div>
                    <div className="w-3/4 mx-4">
                        <progress
                            className="progress progress-primary"
                            value={language.value}
                            max="100"
                        />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SkillsAndLanguages;
