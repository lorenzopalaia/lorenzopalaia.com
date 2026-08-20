import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getSEOTags } from "@/lib/seo";

import { articles, getArticle } from "@/content/articles";

import { getArticleSource } from "@/content/articles.server";

import ArticleReader from "@/components/pages/ArticleReader";
import StructuredData from "@/components/seo/StructuredData";

import { siteConfig } from "@/data/config";

import { LatexCompiler } from "@/components/mdx/LatexCompiler";

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
      description: "The requested field note could not be found.",
      canonicalUrlRelative: `/blog/${slug}`,
    });
  }

  return getSEOTags({
    title: `${article.seoTitle ?? article.title} — Lorenzo Palaia`,
    description: article.summary,
    canonicalUrlRelative: `/blog/${article.slug}`,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${siteConfig.url}/blog/${article.slug}`,
      type: "article",
    },
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = getArticle(slug);
  const source = getArticleSource(slug);

  if (!article || !source) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "en",
    url: articleUrl,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags,
  };

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: {
      LatexCompiler,
    },
  });

  return (
    <>
      <StructuredData data={structuredData} />

      <ArticleReader slug={slug}>{content}</ArticleReader>
    </>
  );
}
