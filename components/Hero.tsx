import { Button } from "./ui/button";

import { FileDown } from "lucide-react";

import Link from "next/link";

import Socials from "@/components/Socials";

export default function Hero() {
  return (
    <section className="mt-8">
      <p className="text-6xl font-bold">Hi, Lorenzo here! 👋</p>
      <h1 className="text-lg text-muted-foreground mt-6">
        I&apos;m a software engineer and a designer.
      </h1>
      <h2 className="text-lg text-muted-foreground mt-2">
        I love building things for the web.
      </h2>
      <p className="text-lg font-bold mt-4">
        I&apos;m currently working on a new project. Stay tuned!
      </p>
      <div className="mt-6 flex items-center gap-8">
        <Link href="/resume.pdf">
          <Button variant="outline" className="font-bold">
            Resume
            <FileDown />
          </Button>
        </Link>
        <Socials />
      </div>
    </section>
  );
}
