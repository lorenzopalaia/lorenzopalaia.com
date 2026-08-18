"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import Link from "next/link";
import { CoordinateRail } from "@/components/CoordinateRail";
import { unlockSignal } from "@/components/ExplorationSignals";
import { getArticle, articles, formatArticleDate } from "@/content/articles";

type Action = "like" | "dislike" | "none";

interface ReactionData {
  likes: number;
  dislikes: number;
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

export default function ArticleReader({
  slug,
  body,
}: {
  slug: string;
  body: string | null;
}) {
  const article = getArticle(slug);

  const [action, setAction] = useState<Action>("none");
  const [reaction, setReaction] = useState<ReactionData>({
    likes: 0,
    dislikes: 0,
  });
  const [isLoadingReactions, setIsLoadingReactions] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const storedAction = localStorage.getItem(
      `note-reaction:${slug}`,
    ) as Action | null;

    setAction(storedAction ?? "none");

    if (article) {
      unlockSignal("blog-post");
    }
  }, [article, slug]);

  useEffect(() => {
    if (!article) return;

    const loadReactions = async () => {
      setIsLoadingReactions(true);

      try {
        const response = await fetch(
          `/api/like-dislike?postId=${encodeURIComponent(slug)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load reactions");
        }

        const data = await response.json();

        setReaction({
          likes: Number(data.likes ?? 0),
          dislikes: Number(data.dislikes ?? 0),
        });
      } catch (error) {
        console.error("Failed to load article reactions:", error);
      } finally {
        setIsLoadingReactions(false);
      }
    };

    loadReactions();
  }, [article, slug]);

  if (!article || !body) {
    return (
      <main className="detail-page detail-page--missing">
        <Link href="/blog" className="detail-back">
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

  const submit = async (nextAction: Exclude<Action, "none">) => {
    if (isVoting) return;

    const resolved = action === nextAction ? "none" : nextAction;

    setIsVoting(true);

    try {
      const response = await fetch("/api/like-dislike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: slug,
          action: resolved,
          previousAction: action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to submit reaction.");
      }

      setReaction({
        likes: Number(data.likes ?? 0),
        dislikes: Number(data.dislikes ?? 0),
      });

      setAction(resolved);
      localStorage.setItem(`note-reaction:${slug}`, resolved);

      if (resolved === "like") {
        unlockSignal("post-like");
      }
    } catch (error) {
      console.error("Failed to submit reaction:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <main className="article-page">
      <header className="detail-header">
        <Link href="/blog" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Notes index
        </Link>

        <span className="scene-eyebrow">
          Document / {String(index + 1).padStart(2, "0")}
        </span>
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

        <CoordinateRail
          index={String(index + 1).padStart(2, "0")}
          label="NOTE / READ"
        />
      </section>

      <section className="article-layout">
        <aside className="article-aside">
          <span>Tags</span>

          {article.tags.map((tag) => (
            <em key={tag}>{tag}</em>
          ))}
        </aside>

        <article className="article-content">
          <Streamdown>{body}</Streamdown>
        </article>
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
            disabled={isVoting || isLoadingReactions}
            className={action === "like" ? "is-active" : ""}
            data-cursor="LIKE"
          >
            <ThumbsUp size={17} />
            <b>{reaction.likes}</b>
          </button>

          <button
            type="button"
            onClick={() => submit("dislike")}
            disabled={isVoting || isLoadingReactions}
            className={action === "dislike" ? "is-active" : ""}
            data-cursor="DISLIKE"
          >
            <ThumbsDown size={17} />
            <b>{reaction.dislikes}</b>
          </button>
        </div>
      </section>

      <nav className="article-neighbors" aria-label="Adjacent documents">
        {previous ? (
          <Link href={`/blog/${previous.slug}`}>
            <ChevronLeft size={18} />
            <span>Previous</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link href={`/blog/${next.slug}`}>
            <span>Next</span>
            <strong>{next.title}</strong>
            <ChevronRight size={18} />
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
