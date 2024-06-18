import GitHubIcon from "./Icons/GitHubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import TwitterIcon from "./Icons/TwitterIcon";

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/lorenzopalaia",
        icon: <GitHubIcon />,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/lorenzopalaia/",
        icon: <LinkedInIcon />,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/lorenzo_palaia/",
        icon: <InstagramIcon />,
    },
    {
        name: "Twitter",
        href: "https://twitter.com/lorenzo_palaia",
        icon: <TwitterIcon />,
    },
];

const Socials = () => {
    return (
        <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
            {socials.map((social) => (
                <li key={social.name} className="mr-5 shrink-0 text-xs">
                    <a
                        className="block hover:text-slate-200"
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.name + " (opens in a new tab)"}
                        title={social.name}
                    >
                        <span className="sr-only">{social.name}</span>
                        {social.icon}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Socials;
