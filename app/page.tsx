import type { Metadata } from "next";

import Home from "@/components/pages/Home";
import StructuredData from "@/components/seo/StructuredData";

import { siteConfig } from "@/data/config";
import { person } from "@/data/person";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Software Engineer`,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/#profile`,
  url: siteConfig.url,
  name: `${person.name} — Software Engineer`,
  description: person.description,
  inLanguage: "en",
  mainEntity: {
    "@id": `${siteConfig.url}/#person`,
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={structuredData} />

      <Home />
    </>
  );
}
