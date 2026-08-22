"use client";

import type { ReactNode } from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CoordinateRail } from "@/components/CoordinateRail";
import { unlockSignal } from "@/components/ExplorationSignals";

import { articles, formatArticleDate, getArticle } from "@/content/articles";

import { useReactions, useSubmitReaction } from "@/hooks/api/useReactions";

type Action = "like" | "dislike" | "none";

export default function ArticleReader({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const article = getArticle(slug);

  const [action, setAction] = useState<Action>("none");

  const reactionQuery = useReactions(slug);
  const reactionMutation = useSubmitReaction(slug);

  useEffect(() => {
    const storedAction = localStorage.getItem(
      `note-reaction:${slug}`,
    ) as Action | null;

    setAction(storedAction ?? "none");
  }, [slug]);

  useEffect(() => {
    if (article) {
      unlockSignal("blog-post");
    }
  }, [article]);

  if (!article) {
    return (
      <main className="detail-page detail-page--missing">
        <Link href="/blog" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to notes
        </Link>

        <h1>Document not found.</h1>
      </main>
    );
  }

  const index = articles.findIndex((entry) => entry.slug === slug);

  const previous = articles[index + 1];
  const next = articles[index - 1];

  const documentIndex = String(index + 1).padStart(2, "0");

  const submit = async (nextAction: Exclude<Action, "none">) => {
    const resolved = action === nextAction ? "none" : nextAction;

    try {
      await reactionMutation.mutateAsync({
        action: resolved,
        previousAction: action,
      });

      setAction(resolved);

      localStorage.setItem(`note-reaction:${slug}`, resolved);

      if (resolved === "like") {
        unlockSignal("post-like");
      }
    } catch (error) {
      console.error("Failed to submit reaction:", error);
    }
  };

  return (
    <main className="article-page">
      <header className="detail-header">
        <Link href="/blog" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to notes
        </Link>

        <span className="scene-eyebrow">Document / {documentIndex}</span>
      </header>

      <section className="article-hero">
        <div className="article-hero__copy">
          <p className="detail-category">{article.tags[0]}</p>

          <h1>{article.title}</h1>

          <p>{article.summary}</p>

          <div className="article-meta">
            <span>{formatArticleDate(article.publishedAt)}</span>

            <span>Written by Lorenzo Palaia</span>
          </div>
        </div>

        <ArticleSchematic topic={article.tags[0]} />

        <CoordinateRail coordinate="article" index={documentIndex} />
      </section>

      <section className="article-layout">
        <aside className="article-aside">
          <span>Tags</span>

          {article.tags.map((tag) => (
            <em key={tag}>{tag}</em>
          ))}
        </aside>

        <article className="article-content">{children}</article>
      </section>

      <section className="reaction-strip" aria-label="Article reactions">
        <div>
          <span className="scene-eyebrow">Signal received?</span>

          <p>Useful document, useful feedback.</p>
        </div>

        <div className="reaction-strip__controls">
          <button
            type="button"
            onClick={() => submit("like")}
            disabled={reactionMutation.isPending || reactionQuery.isLoading}
            className={action === "like" ? "is-active" : ""}
            data-cursor="LIKE"
          >
            <ThumbsUp size={17} />
            <b>{reactionQuery.data?.likes ?? 0}</b>
          </button>

          <button
            type="button"
            onClick={() => submit("dislike")}
            disabled={reactionMutation.isPending || reactionQuery.isLoading}
            className={action === "dislike" ? "is-active" : ""}
            data-cursor="DISLIKE"
          >
            <ThumbsDown size={17} />
            <b>{reactionQuery.data?.dislikes ?? 0}</b>
          </button>
        </div>
      </section>

      <nav className="article-neighbors" aria-label="Adjacent documents">
        {previous ? (
          <Link
            href={`/blog/${previous.slug}`}
            className="article-neighbor article-neighbor--previous"
          >
            <ChevronLeft
              className="article-neighbor__icon"
              size={18}
              aria-hidden="true"
            />

            <div className="article-neighbor__content">
              <span>Previous</span>
              <strong>{previous.title}</strong>
            </div>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="article-neighbor article-neighbor--next"
          >
            <div className="article-neighbor__content">
              <span>Next</span>
              <strong>{next.title}</strong>
            </div>

            <ChevronRight
              className="article-neighbor__icon"
              size={18}
              aria-hidden="true"
            />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <footer className="article-source">
        <span>Original content archive / V3.1</span>

        <Link
          href="https://www.lorenzopalaia.com/blog"
          target="_blank"
          rel="noreferrer"
          data-cursor="↗"
        >
          Previous archive
          <ArrowUpRight size={15} />
        </Link>
      </footer>
    </main>
  );
}

function ArticleSchematic({ topic }: { topic: string }) {
  return (
    <div className="article-schematic" aria-hidden="true">
      <span>NOTE / {topic.toUpperCase()}</span>

      <svg viewBox="0 0 460 310">
        <path
          className="article-schematic__grid"
          d="M28 48H432M28 108H432M28 168H432M28 228H432M92 24V278M184 24V278M276 24V278M368 24V278"
        />

        <path
          className="article-schematic__trace"
          d="M35 226H113V165H184V85H273V128H350V60H424"
        />

        <path
          className="article-schematic__trace article-schematic__trace--muted"
          d="M35 93H114V125H224V222H424"
        />

        <circle cx="35" cy="226" r="5" />

        <circle cx="184" cy="85" r="4" />

        <circle cx="424" cy="60" r="6" />
      </svg>

      <em>
        Source image preserved in archive / reading diagram generated for V3
      </em>
    </div>
  );
}
