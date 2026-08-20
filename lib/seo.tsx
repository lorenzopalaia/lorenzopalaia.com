import type { Metadata } from "next";

import { siteConfig } from "@/data/config";
import { person } from "@/data/person";

type SEOOptions = {
  title?: Metadata["title"];
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: "website" | "article";
    images?: Metadata["openGraph"] extends infer T
      ? T extends { images?: infer I }
        ? I
        : never
      : never;
  };
  canonicalUrlRelative?: string;
  extraTags?: Record<string, string>;
};

const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : siteConfig.url;

export function getSEOTags({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: SEOOptions = {}): Metadata {
  const resolvedTitle = title ?? person.title;

  const resolvedDescription = description ?? person.description;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords ?? [person.name],

    applicationName: person.name,

    metadataBase: new URL(`${SITE_URL}/`),

    openGraph: {
      title:
        openGraph?.title ??
        (typeof resolvedTitle === "string" ? resolvedTitle : person.name),

      description: openGraph?.description ?? resolvedDescription,

      url:
        openGraph?.url ??
        (canonicalUrlRelative
          ? `${SITE_URL}${canonicalUrlRelative}`
          : SITE_URL),

      siteName: person.name,

      locale: "en_US",

      type: openGraph?.type ?? "website",

      ...(openGraph?.images ? { images: openGraph.images } : {}),
    },

    twitter: {
      title:
        openGraph?.title ??
        (typeof resolvedTitle === "string" ? resolvedTitle : person.name),

      description: openGraph?.description ?? resolvedDescription,

      card: "summary_large_image",
      creator: "@lorenzopalaia",
    },

    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),

    ...extraTags,
  };
}
