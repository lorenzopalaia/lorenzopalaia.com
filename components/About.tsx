import config from "@/config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const About = () => {
    return (
        <section
            id="about"
            className="mb-32 mx-4 md:mt-16 mt-8 section" // section class is unused ?
        >
            {config.about.map((paragraph, index) => (
                <p key={index} className="font-light">
                    {paragraph}
                </p>
            ))}
            <Link
                href={config.socials.cal}
                target="_blank"
                className="no-underline"
            >
                <p className="gtoup hover:underline decoration-primary">
                    Book a Call
                </p>
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 group-hover:ml-3"
                />
            </Link>
            <p className="font-light">
                I always like to introduce some gamification 🕹️ into my
                projects. Here I would like to summarize my work path through
                the
                <Link
                    href="/milestones"
                    className="no-underline group hover:underline decoration-primary"
                >
                    Milestones
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 group-hover:ml-3"
                    />
                </Link>
            </p>
        </section>
    );
};

export default About;
