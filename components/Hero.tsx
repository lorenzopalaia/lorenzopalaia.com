import { FileDown, MapPin } from "lucide-react";

import Link from "next/link";

import Socials from "@/components/Socials";

import ShinyButton from "@/components/ui/shiny-button";
import TypingAnimation from "@/components/ui/typing-animation";

export default function Hero() {
  return (
    <section className="mt-8">
      <TypingAnimation
        className="text-4xl sm:text-5xl title"
        text="Hi, Lorenzo here! 👋"
      />
      <h1 className="font-light text-muted-foreground mt-4">
        Software Engineer | Computer and Automatic Engineering Graduate
      </h1>
      <h2 className="font-light text-muted-foreground mt-2">
        Crypto enthusiast, passionate about programming, artificial
        intelligence, blockchain, finance and traveling. Computer and Automatic
        Engineering graduate at Sapienza University of Rome. Currently working
        as a freelance fullstack developer.
      </h2>
      <div className="flex gap-1 title mt-4">
        Rome, Italy
        <MapPin />
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
