import { FileDown, MapPin } from "lucide-react";

import Link from "next/link";

import Image from "next/image";

import Socials from "@/components/Socials";

import ShinyButton from "@/components/ui/shiny-button";

export default function Hero() {
  return (
    <section className="mt-8 max-w-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Image
          src="/images/avatar.png"
          alt="Lorenzo Palaia"
          width={512}
          height={512}
          className="size-20"
        />
        <div>
          <p className="title text-4xl tracking-tight sm:text-5xl">
            Lorenzo Palaia
          </p>
          <h1 className="mt-2 font-light text-muted-foreground">
            Software Engineer | Computer and Automatic Engineering Graduate
          </h1>
        </div>
      </div>
      <h2 className="mt-4 font-light text-muted-foreground">
        Crypto enthusiast, passionate about programming, artificial
        intelligence, blockchain, finance and traveling. Computer and Automatic
        Engineering graduate at Sapienza University of Rome. Currently working
        as a freelance fullstack developer.
      </h2>
      <div className="title mt-4 flex gap-1">
        Rome, Italy
        <MapPin />
      </div>
      <div className="mt-8 flex items-center gap-8">
        <Link href="/assets/resume.pdf" target="_blank">
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
