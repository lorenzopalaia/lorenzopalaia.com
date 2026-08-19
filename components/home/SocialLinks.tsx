"use client";

import Link from "next/link";

import { unlockSignal } from "@/components/ExplorationSignals";

import { socials } from "@/data/portfolio";

export default function SocialLinks() {
  return (
    <div>
      {socials.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          onClick={() =>
            unlockSignal(social.label === "LinkedIn" ? "linkedin" : "socials")
          }
          target={social.label === "Email" ? undefined : "_blank"}
          rel="noreferrer"
          data-cursor="↗"
        >
          {social.label}
        </Link>
      ))}
    </div>
  );
}
