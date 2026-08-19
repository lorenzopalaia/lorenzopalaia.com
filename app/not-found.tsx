import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { CoordinateRail } from "@/components/CoordinateRail";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <header className="not-found-header">
        <Link href="/" className="not-found-back" data-cursor="BACK">
          <ArrowLeft size={16} />
          Back to the environment
        </Link>

        <span className="scene-eyebrow">System / 404</span>
      </header>

      <section className="not-found-main">
        <div className="not-found-meta">
          <span className="detail-category">SIGNAL LOST</span>

          <span className="not-found-code">ERR / 404</span>
        </div>

        <div className="not-found-copy">
          <h1>
            This system
            <br />
            does not exist.
          </h1>

          <p>
            The requested path could not be resolved inside the current
            environment.
          </p>

          <div className="not-found-actions">
            <Link href="/" className="text-cta" data-cursor="HOME">
              Return to the environment
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="not-found-diagram" aria-hidden="true">
          <svg viewBox="0 0 640 460" fill="none">
            <path
              className="not-found-grid"
              d="
                M20 80H620
                M20 170H620
                M20 260H620
                M20 350H620

                M100 20V440
                M210 20V440
                M320 20V440
                M430 20V440
                M540 20V440
              "
            />

            <path
              className="not-found-trace"
              d="
                M38 350
                H125
                V245
                H225
                V110
                H340
                V180
                H460
                V82
                H602
              "
            />

            <path
              className="not-found-trace not-found-trace--muted"
              d="
                M38 125
                H150
                V185
                H275
                V300
                H420
              "
            />

            <circle className="not-found-node" cx="125" cy="350" r="7" />

            <circle className="not-found-node" cx="340" cy="110" r="6" />

            <circle
              className="not-found-node not-found-node--accent"
              cx="460"
              cy="180"
              r="9"
            />

            <circle className="not-found-node" cx="602" cy="82" r="6" />

            <path
              className="not-found-signal"
              d="
                M0 390
                C85 345 120 420 205 392
                C300 362 336 420 430 372
                C495 340 540 358 640 310
              "
            />
          </svg>

          <span>NO ROUTE / NO SIGNAL</span>
        </div>

        <CoordinateRail index="404" label="SIGNAL / LOST" />
      </section>

      <footer className="not-found-footer">
        <span>Lorenzo Palaia / Independent portfolio</span>

        <span>The requested coordinate could not be mapped.</span>
      </footer>
    </main>
  );
}
