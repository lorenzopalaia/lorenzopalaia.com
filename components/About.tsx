import config from "@/config";
import CustomLink from "./CustomLink";

const About = () => {
    return (
        <section
            id="about"
            className="mb-32 mx-4 md:mt-16 mt-8 section" // section class is unused ?
        >
            {config.about.map((paragraph, index) => (
                <p key={index} className="mb-4 font-light">
                    {paragraph}
                </p>
            ))}
            <CustomLink href={config.socials.cal} target="_blank">
                Book a Call
            </CustomLink>
            <p className="font-light mt-8">
                I always like to introduce some gamification 🕹️ into my
                projects. Here I would like to summarize my work path through
                the{" "}
                <CustomLink href="/milestones" className="inline">
                    Milestones
                </CustomLink>
            </p>
        </section>
    );
};

export default About;
