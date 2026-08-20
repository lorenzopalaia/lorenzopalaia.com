import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { getSceneIndex } from "@/data/sceneNavigation";
import { articles } from "@/content/articles";

export default function NotesScene() {
  return (
    <section id="notes" className="scene scene--notes">
      <div className="notes-intro">
        <span className="scene-eyebrow">
          {getSceneIndex("notes")} / Field notes
        </span>

        <h2>Technical curiosity, put into words.</h2>

        <Link href="/blog" className="text-cta" data-cursor="READ">
          Open the archive
          <ArrowRight size={20} />
        </Link>
      </div>

      <div className="notes-list">
        {articles.slice(0, 4).map((note, index) => (
          <Link key={note.slug} href={`/blog/${note.slug}`} data-cursor="READ">
            <span>{String(index + 1).padStart(2, "0")}</span>

            <h3>{note.title}</h3>

            <em>{note.publishedAt.slice(0, 4)}</em>

            <ArrowUpRight size={18} />
          </Link>
        ))}
      </div>

      <CoordinateRail scene="notes" />
    </section>
  );
}
