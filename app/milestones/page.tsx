"use client";

import config from "@/config";
import Link from "next/link";
import Image from "next/legacy/image";

import useMousePosition from "@/hooks/useMousePosition";
import { useState } from "react";

export default function Milestones() {
  const { x, y } = useMousePosition();
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const sortedMilestones = config.milestones.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const BackgroundHandler = () => (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
      style={{
        background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    ></div>
  );

  const SkipToContent = () => (
    <a
      href="#content"
      className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
    >
      Skip to Content
    </a>
  );

  const LeftArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  return (
    <>
      <BackgroundHandler />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <SkipToContent />
        <div className="lg:py-24">
          <Link
            className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300"
            href="/"
          >
            <LeftArrowIcon />
            Lorenzo Palaia
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
            Milestones
          </h1>
          <ul className="mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-16">
            {sortedMilestones.map((milestone, index) => (
              <li key={index} className="flex flex-col">
                <div className="text-center group">
                  <div className="transform w-24 h-24 relative overflow-hidden rounded-full mx-auto">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-teal-400/10 animate-pulse"></div>
                    )}
                    <Image
                      src={`/assets/imgs/milestones/${milestone.img}.webp`}
                      alt="University Start"
                      layout="fill"
                      loading="lazy"
                      objectFit="cover"
                      className="scale-[1.75] group-hover:animate-pulse"
                      onLoadingComplete={handleImageLoad}
                    />
                  </div>
                  <p className="font-semibold leading-snug text-slate-200 group-hover:text-teal-300 mt-2">
                    {milestone.name}
                  </p>
                  <p className="mt-1">{milestone.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
