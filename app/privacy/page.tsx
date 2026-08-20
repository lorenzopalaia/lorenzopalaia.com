/** Quiet Systems style reminder: legal information is rendered as a precise document, not buried as disposable footer text. */

import type { Metadata } from "next";

import { getSEOTags } from "@/lib/seo";
import Privacy from "@/components/pages/Privacy";

export const metadata: Metadata = getSEOTags({
  title: "Privacy — Lorenzo Palaia",
  description:
    "Privacy information for the Lorenzo Palaia portfolio, contact form and field-notes subscription.",
  canonicalUrlRelative: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return <Privacy />;
}
