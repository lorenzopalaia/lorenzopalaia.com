import config from "@/config";

import BackLink from "@/components/Links/BackLink";

import Image from "next/legacy/image";

export default function Milestones() {
  const sortedMilestones = config.milestones.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-screen-xl min-h-screen px-6 py-12 mx-auto font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:py-24">
        <BackLink href="/">Lorenzo Palaia</BackLink>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Milestones
        </h1>
        <ul className="grid grid-cols-3 gap-16 mt-12 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {sortedMilestones.map((milestone, index) => (
            <li key={index} className="flex flex-col">
              <div className="text-center group">
                <div className="relative w-24 h-24 mx-auto overflow-hidden transform rounded-full">
                  <div className="absolute inset-0 bg-teal-400/10 animate-pulse"></div>
                  <Image
                    src={`/assets/imgs/milestones/${milestone.img}.webp`}
                    alt={milestone.name}
                    layout="fill"
                    objectFit="cover"
                    className="scale-[1.75] group-hover:animate-pulse"
                  />
                </div>
                <p className="mt-2 font-semibold leading-snug text-slate-200 group-hover:text-teal-300">
                  {milestone.name}
                </p>
                <p className="mt-1">{milestone.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
