import config from "@/config";
import Link from "next/link";

import { MapPin } from "lucide-react";

const Hero = () => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
        <Link href="/">{config.hero.name}</Link>
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
        {config.hero.title}
      </h2>
      <div className="flex items-center mt-2 text-slate-300">
        <MapPin className="w-4 h-4 mr-2" />
        <span className="font-medium tracking-tight text-md sm:text-lg">
          {config.hero.location}
        </span>
      </div>
      <p className="max-w-md mt-4 leading-normal">{config.hero.description}</p>
    </>
  );
};

export default Hero;
