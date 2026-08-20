"use client";

/**
 * Quiet Systems style reminder: Notes is an indexed document system with lightweight search,
 * retaining every real entry rather than compressing the archive into a marketing list.
 */

import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { NewsletterSignal } from "@/components/NewsletterSignal";
import { articles, formatArticleDate } from "@/content/articles";

function getSearchQuery() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("search") ?? "";
}

function updateSearchQuery(value: string) {
  const url = new URL(window.location.href);
  const normalized = value.trim();

  if (normalized) {
    url.searchParams.set("search", normalized);
  } else {
    url.searchParams.delete("search");
  }

  const search = url.searchParams.toString();
  const nextUrl = search ? `${url.pathname}?${search}` : url.pathname;

  window.history.replaceState(null, "", nextUrl);
}

export default function Notes() {
  const [query, setQuery] = useState(() => getSearchQuery());

  useEffect(() => {
    const handlePopState = () => {
      setQuery(getSearchQuery());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return articles;
    }

    return articles.filter((article) =>
      [article.title, article.summary, ...article.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    updateSearchQuery(value);
  };

  const clearSearch = () => {
    setQuery("");
    updateSearchQuery("");
  };

  return (
    <main className="notes-page">
      <header className="detail-header">
        <Link href="/#notes" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to the environment
        </Link>

        <span className="scene-eyebrow">Field notes / archive</span>
      </header>

      <section className="notes-head">
        <p className="detail-category">Writing / {articles.length} documents</p>

        <h1>Notes from building, learning, and looking closely.</h1>

        <CoordinateRail index="05" label="FIELD / ARCHIVE" />

        <label className="notes-search">
          <Search size={17} />

          <input
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search title, tag or theme"
            aria-label="Search Notes"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </label>

        <div className="notes-key">
          <span>Index</span>
          <span>Document</span>
          <span>Topic</span>
          <span>Date</span>
          <span>Open</span>
        </div>
      </section>

      <section className="notes-index" aria-label="Article archive">
        {visible.map((note) => {
          const originalIndex = articles.findIndex(
            (article) => article.slug === note.slug,
          );

          // First article = highest number
          // Last article = 01
          const index = articles.length - originalIndex;

          return (
            <Link
              key={note.slug}
              href={`/blog/${note.slug}`}
              data-cursor="READ"
            >
              <span>{String(index).padStart(2, "0")}</span>

              <div>
                <h2>{note.title}</h2>
                <p>{note.summary}</p>
              </div>

              <b>{note.tags[0]}</b>

              <em>{formatArticleDate(note.publishedAt)}</em>

              <ArrowRight size={19} />
            </Link>
          );
        })}
      </section>

      {!visible.length && (
        <p className="notes-empty">
          No document matches this signal. Try another title or tag.
        </p>
      )}

      <NewsletterSignal />
    </main>
  );
}
