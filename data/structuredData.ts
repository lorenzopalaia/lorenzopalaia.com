import { siteConfig } from "@/data/config";
import { person } from "@/data/person";
import { socials } from "@/data/socials";

const profileSocials = socials
  .map((social) => social.href)
  .filter((href) => /^https?:\/\//i.test(href));

export const personStructuredData = {
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: person.name,
  url: siteConfig.url,
  jobTitle: "Software Engineer",
  description: person.description,
  image: `${siteConfig.url}/assets/images/avatar.webp`,
  homeLocation: {
    "@type": "Place",
    name: person.location,
  },
  sameAs: profileSocials,
  worksFor: {
    "@type": "Organization",
    name: "Reply",
    url: "https://www.reply.com/",
  },
};

export const websiteStructuredData = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: person.description,
  inLanguage: "en",
  publisher: {
    "@id": `${siteConfig.url}/#person`,
  },
};
