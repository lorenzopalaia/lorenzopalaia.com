"use client";

import config from "@/config";
import Link from "next/link";

import useMousePostion from "@/hooks/useMousePosition";

export default function Education() {
  const { x, y } = useMousePostion();

  const formatLink = (link: string) => {
    return link
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split("/")[0];
  };

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

  const RightUpArrowIcon2 = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
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
            Education
          </h1>
          <table
            id="content"
            className="mt-12 w-full border-collapse text-left"
          >
            <thead className="stick top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur-0">
              <tr>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                  Period
                </th>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                  Degree
                </th>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                  School
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                  Location
                </th>
                <th className="hidden py-4 text-sm font-semibold text-slate-200 sm:table-cell">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {config.education.map((degree, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-300/10 last:border-none"
                >
                  <td className="py-4 pr-4 align-top text-sm">{degree.date}</td>
                  <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                    {degree.degree}
                  </td>
                  <td className="py-4 pr-4 align-top text-sm">
                    {degree.school}
                  </td>
                  <td className="hidden py-4 pr-4 align-top text-sm lg:table-cell">
                    {degree.location}
                  </td>
                  <td className="hidden py-4 pr-4 align-top text-sm sm:table-cell">
                    <ul className="translate-y-1">
                      <li key={index} className="mb-1 flex items-center">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 text-sm text-slate-400 hover:text-slate-200 focus-visible:text-teal-300 group/link text-sm"
                          href={degree.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label="website.com (opens in a new tab)"
                        >
                          <span>
                            {" "}
                            <span className="inline-block">
                              {formatLink(degree.url)}
                              <RightUpArrowIcon2 />
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
