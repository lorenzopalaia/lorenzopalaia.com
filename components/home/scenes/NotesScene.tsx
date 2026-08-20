import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { getSceneIndex } from "@/data/sceneNavigation";
import { articles } from "@/content/articles";

export default function NotesScene() {
  return (
    <section
      id="notes"
      className="scene scene--notes"
      aria-labelledby="notes-title"
    >
      <div className="notes-intro">
        <span className="scene-eyebrow">
          {getSceneIndex("notes")} / Field notes
        </span>

        <h2 id="notes-title">Technical curiosity, put into words.</h2>

        <Link href="/blog" className="text-cta" data-cursor="READ">
          Open the archive
          <ArrowRight size={20} />
        </Link>
      </div>

      <ol className="notes-list" aria-label="Recent field notes">
        {articles.slice(0, 4).map((note, index) => (
          <li key={note.slug}>
            <Link href={`/blog/${note.slug}`} data-cursor="READ">
              <span>{String(index + 1).padStart(2, "0")}</span>

              <h3>{note.title}</h3>

              <em>{note.publishedAt.slice(0, 4)}</em>

              <ArrowUpRight size={18} />
            </Link>
          </li>
        ))}
      </ol>

      <CoordinateRail scene="notes" />
    </section>
  );
}
