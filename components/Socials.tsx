import config from "@/config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Socials = () => {
    return (
        <div className="mt-8">
            <Link href={config.socials.github} target="_blank">
                <FontAwesomeIcon
                    icon={faGithub}
                    size="2xl"
                    className="mr-4 text-gray-500 hover:text-neutral-300 cursor-pointer"
                />
            </Link>
            <Link href={config.socials.linkedin} target="_blank">
                <FontAwesomeIcon
                    icon={faLinkedin}
                    size="2xl"
                    className="mr-4 text-gray-500 hover:text-neutral-300 cursor-pointer"
                />
            </Link>
            <Link href={`mailto:${config.socials.mail}`}>
                <FontAwesomeIcon
                    icon={faEnvelope}
                    size="2xl"
                    className="mr-4 text-gray-500 hover:text-neutral-300 cursor-pointer"
                />
            </Link>
        </div>
    );
};

export default Socials;
