import { getSEOTags } from "@/lib/seo";
import { config } from "@/config";

export const metadata = getSEOTags({
  title: "Contact | Lorenzo Palaia",
  description:
    "Get in touch with Lorenzo Palaia for any inquiries or collaborations.",
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
