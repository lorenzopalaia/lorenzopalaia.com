/** Quiet Systems style reminder: legal information is rendered as a precise document, not buried as disposable footer text. */

import { getSEOTags } from "@/lib/seo";
import type { Metadata } from "next";
import Privacy from "@/components/pages/Privacy";

export const metadata: Metadata = getSEOTags({
  title: "Privacy — Lorenzo Palaia",
  description:
    "Privacy information for the Lorenzo Palaia portfolio, contact relay and field-notes subscription.",
  canonicalUrlRelative: "/privacy",
});

export default function PrivacyPage() {
  return <Privacy />;
}
