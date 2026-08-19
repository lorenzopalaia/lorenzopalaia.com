import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getSEOTags } from "@/lib/seo";

import { articles, getArticle } from "@/content/articles";

import { getArticleSource } from "@/content/articles.server";

import ArticleReader from "@/components/ArticleReader";

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
      canonicalUrlRelative: `/blog/${slug}`,
    });
  }

  return getSEOTags({
    title: `${article.title} — Lorenzo Palaia`,
    description: article.summary,
    canonicalUrlRelative: `/blog/${article.slug}`,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://www.lorenzopalaia.com/blog/${article.slug}`,
      type: "article",
      images: [
        {
          url: article.image,
        },
      ],
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

  return <ArticleReader slug={slug}>{content}</ArticleReader>;
}
