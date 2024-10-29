import { Linkedin, Github, Mail } from "lucide-react";

import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex gap-4">
      <Link href="https://linkedin.com/in/lorenzopalaia">
        <Linkedin className="text-muted-foreground hover:text-primary" />
      </Link>
      <Link href="https://github.com/lorenzopalaia">
        <Github className="text-muted-foreground hover:text-primary" />
      </Link>
      <Link href="mailto:lorenzopalaia53@gmail.com">
        <Mail className="text-muted-foreground hover:text-primary" />
      </Link>
    </div>
  );
}
