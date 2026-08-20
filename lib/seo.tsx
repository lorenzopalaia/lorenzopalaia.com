import type { Metadata } from "next";

import { siteConfig } from "@/data/config";
import { person } from "@/data/person";

type SEOOptions = {
  title?: Metadata["title"];
  description?: string;
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
  noIndex?: boolean;
  extraTags?: Record<string, string>;
};

const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : siteConfig.url;

function resolveTitle(title: Metadata["title"]) {
  if (typeof title === "string") {
    return title;
  }

  return person.name;
}

export function getSEOTags({
  title,
  description,
  openGraph,
  canonicalUrlRelative,
  noIndex = false,
  extraTags,
}: SEOOptions = {}): Metadata {
  const resolvedTitle = title ?? `${person.name} — Software Engineer`;

  const resolvedDescription = description ?? person.description;

  const resolvedTitleString = resolveTitle(resolvedTitle);

  const canonicalUrl = canonicalUrlRelative
    ? `${SITE_URL}${canonicalUrlRelative}`
    : SITE_URL;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: siteConfig.name,
    metadataBase: new URL(`${SITE_URL}/`),
    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: openGraph?.title ?? resolvedTitleString,
      description: openGraph?.description ?? resolvedDescription,
      url: openGraph?.url ?? canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: openGraph?.type ?? "website",
      ...(openGraph?.images
        ? {
            images: openGraph.images,
          }
        : {}),
    },
    twitter: {
      title: openGraph?.title ?? resolvedTitleString,
      description: openGraph?.description ?? resolvedDescription,
      card: "summary_large_image",
      creator: "@lorenzopalaia",
    },
    ...extraTags,
  };
}
