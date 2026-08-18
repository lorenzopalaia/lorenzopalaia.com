import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSEOTags } from "@/lib/seo";
import { articles, getArticle } from "@/content/articles";
import { getArticleBody } from "@/content/articles.server";
import ArticleReader from "@/components/ArticleReader";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getArticle(slug);

  if (!article) {
    return getSEOTags({
      title: "Document not found — Lorenzo Palaia",
      canonicalUrlRelative: `/blog/${slug}`,
    });
  }

  return getSEOTags({
    title: `${article.title} — Lorenzo Palaia`,
    description: article.summary,
    canonicalUrlRelative: `/blog/${article.slug}`,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://www.lorenzopalaia.com/blog/${article.slug}`,
      type: "article",
    },
    keywords: article.tags,
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = getArticle(slug);
  const body = getArticleBody(slug);

  if (!article || !body) {
    notFound();
  }

  return <ArticleReader slug={slug} body={body} />;
}
