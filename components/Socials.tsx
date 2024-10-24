import Link from "next/link";

import config from "@/config";

export default function Socials() {
  return (
    <ul className="flex items-center mt-8 ml-1" aria-label="Social media">
      {config.socials.map((social) => (
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
}
