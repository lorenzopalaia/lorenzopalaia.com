import { FileDown, ArrowDownRight } from "lucide-react";

import Link from "next/link";

import Socials from "@/components/Socials";

import ShinyButton from "@/components/ui/shiny-button";

export default function Hero() {
  return (
    <section className="mt-8">
      <p className="text-5xl title">Hi, Lorenzo here! 👋</p>
      <h1 className="font-light text-muted-foreground mt-4">
        Software Developer & Computer Engineering and Automation Graduate
      </h1>
      <h2 className="font-light text-muted-foreground mt-2">
        I love building things for the web.
      </h2>
      <div className="flex gap-1 items-center title mt-4">
        Currently looking for new opportunities
        <ArrowDownRight className="animate-bounce" />
      </div>
      <div className="mt-8 flex items-center gap-8">
        <Link href="/resume.pdf">
          <ShinyButton className="title">
            <div className="flex items-center gap-2">
              Resume
              <FileDown />
            </div>
          </ShinyButton>
        </Link>
        <Socials />
      </div>
    </section>
  );
}
