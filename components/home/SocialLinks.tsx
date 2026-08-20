"use client";

import Link from "next/link";

import { unlockSignal } from "@/components/ExplorationSignals";
import { socials } from "@/data/socials";

export default function SocialLinks() {
  return (
    <div>
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          onClick={() =>
            unlockSignal(social.name === "LinkedIn" ? "linkedin" : "socials")
          }
          target={social.name === "Email" ? undefined : "_blank"}
          rel="noreferrer"
          data-cursor="↗"
        >
          {social.name}
        </Link>
      ))}
    </div>
  );
}
