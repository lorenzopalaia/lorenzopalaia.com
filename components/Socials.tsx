import { config } from "@/config";

import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex gap-4">
      {config.socials.map((social, index) => (
        <Link key={index} href={social.href}>
          {social.icon}
        </Link>
      ))}
    </div>
  );
}
