import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CoordinateRail } from "@/components/CoordinateRail";

export default function Privacy() {
  return (
    <main className="privacy-page">
      <header className="detail-header">
        <Link href="/#contact" className="detail-back">
          <ArrowLeft size={18} /> Back to the environment
        </Link>
        <span className="scene-eyebrow">Privacy / V3.1</span>
      </header>
      <section className="privacy-hero">
        <p className="detail-category">Information handling</p>
        <h1>Privacy, stated plainly.</h1>
        <p>
          This portfolio keeps data collection deliberately limited and explains
          operational services in the same direct way it presents its work.
        </p>
        <CoordinateRail index="08" label="PRIVACY / OPEN" />
      </section>
      <article className="privacy-copy">
        <section>
          <h2>What this site processes</h2>
          <p>
            When you use the contact form, the information you enter—name, email
            address and message—is sent to the portfolio owner for the purpose
            of responding to your request. When you subscribe to field notes,
            only the email address you provide is added to the selected email
            audience.
          </p>
        </section>
        <section>
          <h2>Service providers</h2>
          <p>
            Email delivery and subscriptions are processed through Resend.
            Public project information may be retrieved from GitHub, while
            package-download data may be retrieved from the npm registry. These
            services receive only the requests necessary to provide the relevant
            feature.
          </p>
        </section>
        <section>
          <h2>Local exploration state</h2>
          <p>
            The portfolio stores optional exploration signals and the selected
            Ink/Paper theme in your browser’s local storage. This state stays on
            your device and can be cleared through your browser settings.
          </p>
        </section>
        <section>
          <h2>Analytics and links</h2>
          <p>
            The site may use privacy-oriented visit analytics configured by the
            hosting environment. Links to external websites, repositories and
            documents are governed by their respective providers’ policies once
            you leave this site.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
            You can request information about, correction of or deletion of
            personal data submitted through this portfolio by contacting{" "}
            <Link href="mailto:info@lorenzopalaia.com">
              info@lorenzopalaia.com
            </Link>
            . You can unsubscribe from field notes using the option provided in
            the emails you receive.
          </p>
        </section>
        <p className="privacy-updated">Last updated: August 2026</p>
      </article>
    </main>
  );
}
