import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Contact | Lorenzo Palaia",
  canonicalUrlRelative: "/contact",
  keywords: config.settings.keywords,
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
