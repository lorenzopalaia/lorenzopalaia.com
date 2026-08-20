import { contact } from "@/data/contact";

export const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/lorenzopalaia/",
  },
  {
    name: "GitHub",
    href: "https://github.com/lorenzopalaia",
  },
  {
    name: "X",
    href: "https://x.com/lorenzopalaia",
  },
  {
    name: "Email",
    href: `mailto:${contact.email}`,
  },
  {
    name: "Book a Meeting",
    href: contact.bookingUrl,
  },
] as const;
