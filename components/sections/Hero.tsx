import { MapPin } from "lucide-react";

import Achievements from "@/components/Achievements";
import ResumeButton from "@/components/ResumeButton";
import Socials from "@/components/Socials";

import Image from "next/image";

import { config } from "@/config";

export default function Hero() {
  return (
    <section className="mt-8 max-w-2xl">
      <Achievements />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Image
          src="/images/avatar.webp"
          alt="Lorenzo Palaia"
          width={80}
          height={80}
          className="size-20"
        />
        <div>
          <p className="title text-4xl tracking-tight sm:text-5xl">
            {config.about.name}
          </p>
          <h1 className="text-muted-foreground mt-2 font-light">
            {config.about.title}
          </h1>
        </div>
      </div>
      <h2 className="text-muted-foreground mt-4 font-light">
        {config.about.description}
      </h2>
      <div className="title mt-4 flex gap-1">
        Rome, Italy
        <MapPin />
      </div>
      <div className="mt-8 flex items-center gap-8">
        <ResumeButton />
        <Socials />
      </div>
    </section>
  );
}
