import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Privacy Policy | Lorenzo Palaia",
  description:
    "Privacy Policy of Lorenzo Palaia. Learn about how I handle your data and protect your privacy.",
  canonicalUrlRelative: "/privacy",
  keywords: config.settings.keywords,
});

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
