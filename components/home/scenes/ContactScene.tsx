import { Github } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { ContactPanel } from "@/components/ContactPanel";

import SocialLinks from "@/components/home/SocialLinks";

export default function ContactScene() {
  return (
    <section id="contact" className="scene scene--contact">
      <div className="contact-top">
        <span className="scene-eyebrow">06 / Contact</span>

        <span>Available for interesting systems.</span>
      </div>

      <div className="contact-main">
        <h2>
          Let’s make the next
          <br />
          <em>useful thing.</em>
        </h2>

        <ContactPanel />
      </div>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Lorenzo Palaia</span>

        <SocialLinks />

        <div className="footer-utility">
          <Link href="/privacy">Privacy</Link>

          <Link
            href="https://github.com/lorenzopalaia"
            target="_blank"
            rel="noreferrer"
            className="footer-github"
            data-cursor="↗"
          >
            <Github size={16} />
            Source
          </Link>
        </div>
      </footer>

      <CoordinateRail index="06" label="CONTACT / OPEN" />
    </section>
  );
}
