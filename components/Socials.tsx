import GitHubIcon from "./Icons/GitHubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import ResumeIcon from "./Icons/ResumeIcon";
import EnvelopeIcon from "./Icons/EnvelopeIcon";

import Link from "next/link";

const socials = [
  {
    name: "GitHub",
    href: "https://www.github.com/lorenzopalaia",
    icon: <GitHubIcon className="size-6" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/lorenzopalaia/",
    icon: <LinkedInIcon className="size-6" />,
  },
  /* {
    name: "Instagram",
    href: "https://www.instagram.com/lorenzo_palaia/",
    icon: <InstagramIcon className="size-6" />,
  }, */
  {
    name: "Twitter",
    href: "https://twitter.com/lorenzo_palaia",
    icon: <TwitterIcon className="size-5" />,
  },
  {
    name: "Resume",
    href: "/assets/resume.pdf",
    icon: <ResumeIcon className="size-5" />,
  },
  {
    name: "Email",
    href: "mailto:lorenzopalaia53@gmail.com",
    icon: <EnvelopeIcon className="size-6" />,
  },
];

const Socials = () => {
  return (
    <ul className="flex items-center mt-8 ml-1" aria-label="Social media">
      {socials.map((social) => (
        <li key={social.name} className="mr-5 text-xs shrink-0">
          <Link
            className="block hover:text-slate-200"
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.name + " (opens in a new tab)"}
            title={social.name}
          >
            <span className="sr-only">{social.name}</span>
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
