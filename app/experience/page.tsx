"use client";

import GitHubIcon from "@/components/Icons/GitHubIcon";
import config from "@/config";

import useMousePosition from "@/hooks/useMousePosition";
import Link from "next/link";

export default function Experience() {
  const { x, y } = useMousePosition();

  const formatLink = (link: string) => {
    return link
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split("/")[0];
  };

  const BackgroundHandler = () => (
    <div
      className="fixed inset-0 z-30 transition duration-300 pointer-events-none lg:absolute"
      style={{
        background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    ></div>
  );

  const SkipToContent = () => (
    <Link
      href="#content"
      className="absolute top-0 left-0 block px-4 py-3 text-sm font-bold tracking-widest text-white uppercase -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 focus-visible:translate-x-0"
    >
      Skip to Content
    </Link>
  );

  const LeftArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 mr-1 transition-transform rotate-180 group-hover:-translate-x-2"
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
      <div className="max-w-screen-xl min-h-screen px-6 py-12 mx-auto font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <SkipToContent />
        <div className="lg:py-24">
          <Link
            className="inline-flex items-center mb-2 font-semibold leading-tight text-teal-300 group"
            href="/"
          >
            <LeftArrowIcon />
            Lorenzo Palaia
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
            Experience
          </h1>
          <table
            id="content"
            className="w-full mt-12 text-left border-collapse"
          >
            <thead className="top-0 z-10 px-6 py-5 border-b stick border-slate-300/10 bg-slate-900/75 backdrop-blur-0">
              <tr>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                  Period
                </th>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                  Company
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                  Role
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                  Location
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                  Technologies
                </th>
                <th className="py-4 text-sm font-semibold text-slate-200">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {config.experience.map((experience, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-300/10 last:border-none"
                >
                  <td className="py-4 pr-4 text-sm align-top">
                    {experience.date}
                  </td>
                  <td className="py-4 pr-4 font-semibold leading-snug align-top text-slate-200">
                    {experience.company}
                  </td>
                  <td className="hidden py-4 pr-4 text-sm align-top sm:table-cell">
                    {experience.role}
                  </td>
                  <td className="hidden py-4 pr-4 text-sm align-top lg:table-cell">
                    {experience.location}
                  </td>
                  <td className="hidden py-4 pr-4 align-top sm:table-cell">
                    <ul className="flex -translate-y-1.5 flex-wrap">
                      {experience.badges.map((badge, index) => (
                        <li key={index} className="my-1 mr-1.5">
                          <div className="flex items-center px-3 py-1 text-xs font-medium leading-5 text-teal-300 rounded-full bg-teal-400/10 ">
                            {badge}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 pr-4 text-sm align-top">
                    <ul className="translate-y-1">
                      {experience.links.map((link, index) => (
                        <li key={index} className="flex items-center mb-1">
                          <Link
                            className="inline-flex items-baseline text-sm font-medium leading-tight hover:text-teal-300 focus-visible:text-teal-300 text-slate-400 group/link"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="website.com (opens in a new tab)"
                          >
                            <span>
                              {" "}
                              <span className="inline-block">
                                {formatLink(link.url)}
                                {formatLink(link.url) === "github.com" ? (
                                  <GitHubIcon className="inline-block ml-1.5 h-3.5 w-3.5 shrink-0" />
                                ) : (
                                  <RightUpArrowIcon2 />
                                )}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
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
