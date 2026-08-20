import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { ContactPanel } from "@/components/home/ContactPanel";
import SocialLinks from "@/components/home/SocialLinks";

import { contact, previousVersions } from "@/data/contact";

export default function ContactScene() {
  return (
    <section id="contact" className="scene scene--contact">
      <div className="contact-top">
        <span className="scene-eyebrow">Contact</span>

        <span>Available for interesting systems.</span>
      </div>

      <div className="contact-main">
        <h2>
          Let’s make the next
          <br />
          <em>useful thing.</em>
        </h2>

        <Link
          href={contact.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="contact-orbit"
          data-cursor="CAL"
          aria-label={contact.bookingLabel}
        >
          <CalendarDays size={18} strokeWidth={1.5} />

          <span>{contact.bookingLabel}</span>

          <ArrowUpRight size={14} strokeWidth={1.5} />
        </Link>

        <ContactPanel />
      </div>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Lorenzo Palaia</span>

        <SocialLinks />

        <div className="footer-utility">
          <Link href="/privacy">Privacy</Link>

          <div className="footer-archive">
            <span>Archive</span>

            {previousVersions.map((version) => (
              <Link
                key={version.label}
                href={version.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="↗"
              >
                {version.label}
              </Link>
            ))}
          </div>

          <Link
            href="https://github.com/lorenzopalaia"
            target="_blank"
            rel="noreferrer"
            className="footer-github"
            data-cursor="↗"
          >
            Source
          </Link>
        </div>
      </footer>

      <CoordinateRail scene="contact" />
    </section>
  );
}
