"use client";

import config from "@/config";

import useGithubRepos from "@/hooks/useGitHubRepos";
import useMousePosition from "@/hooks/useMousePosition";

import Link from "next/link";

interface Project {
  updated_at: string;
  created_at: string;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  languages: string[];
  img: string;
}

export default function Projects() {
  const { x, y } = useMousePosition();
  const { repos, isLoading } = useGithubRepos();

  const sortedRepos = repos.sort((a: Project, b: Project) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

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

  const RightUpArrowIcon1 = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="inline-block w-4 h-4 ml-1 transition-transform translate-y-px shrink-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
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

  const GitHubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="inline-block ml-1.5 h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
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
            Projects
          </h1>
          {isLoading ? (
            <table
              id="content"
              className="w-full mt-12 text-left border-collapse animate-pulse"
            >
              <thead className="top-0 z-10 px-6 py-5 border-b stick border-slate-300/10 bg-slate-900/75 backdrop-blur-0">
                <tr>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                    <div className="w-full h-4 rounded bg-teal-400/10"></div>
                  </th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                    <div className="w-full h-4 rounded bg-teal-400/10"></div>
                  </th>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                    <div className="w-full h-4 rounded bg-teal-400/10"></div>
                  </th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                    <div className="w-full h-4 rounded bg-teal-400/10"></div>
                  </th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                    <div className="w-full h-4 rounded bg-teal-400/10"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: config.projects.length,
                }).map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-300/10 last:border-none"
                  >
                    <td className="py-4 pr-8 text-sm align-top">
                      <div className="w-full h-4 rounded bg-teal-400/10"></div>
                    </td>
                    <td className="hidden py-4 pr-8 text-sm align-top lg:table-cell">
                      <div className="w-full h-4 rounded bg-teal-400/10"></div>
                    </td>
                    <td className="py-4 pr-8 font-semibold leading-snug align-top text-slate-200">
                      <div className="w-full h-4 rounded bg-teal-400/10"></div>
                    </td>
                    <td className="hidden py-4 pr-8 align-top lg:table-cell">
                      <div className="w-full h-4 rounded bg-teal-400/10"></div>
                    </td>
                    <td className="hidden py-4 pr-8 align-top sm:table-cell">
                      <div className="w-full h-4 rounded bg-teal-400/10"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table
              id="content"
              className="w-full mt-12 text-left border-collapse"
            >
              <thead className="top-0 z-10 px-6 py-5 border-b stick border-slate-300/10 bg-slate-900/75 backdrop-blur-0">
                <tr>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                    Updated
                  </th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                    Started
                  </th>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                    Project
                  </th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                    Technologies
                  </th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedRepos.map((repo: Project, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-300/10 last:border-none"
                  >
                    <td className="py-4 pr-4 text-sm align-top">
                      <div className="translate-y-px">
                        {new Date(repo.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: undefined,
                        })}
                      </div>
                    </td>
                    <td className="hidden py-4 pr-4 text-sm align-top lg:table-cell">
                      <div className="translate-y-px">
                        {new Date(repo.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: undefined,
                        })}
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-semibold leading-snug align-top text-slate-200">
                      <div>
                        <div className="block sm:hidden">
                          <Link
                            className="inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 sm:hidden group/link"
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Website (opens in a new tab)"
                          >
                            <span>
                              {repo.name.replaceAll("-", " ")}
                              <span className="inline-block">
                                <RightUpArrowIcon1 />
                              </span>
                            </span>
                          </Link>
                        </div>
                        <div className="hidden sm:block">
                          {repo.name.replaceAll("-", " ")}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pr-4 align-top lg:table-cell">
                      <ul className="flex -translate-y-1.5 flex-wrap">
                        {repo.languages.map((language, index) => (
                          <li key={index} className="my-1 mr-1.5">
                            <div className="flex items-center px-3 py-1 text-xs font-medium leading-5 text-teal-300 rounded-full bg-teal-400/10 ">
                              {language}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="hidden py-4 align-top sm:table-cell">
                      <ul className="translate-y-1">
                        <li className="flex items-center mb-1">
                          <Link
                            className="inline-flex items-baseline text-sm font-medium leading-tight hover:text-teal-300 focus-visible:text-teal-300 text-slate-400 group/link"
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="website.com (opens in a new tab)"
                          >
                            <span>
                              {" "}
                              <span className="inline-block">
                                {formatLink(repo.html_url)}
                                {formatLink(repo.html_url) === "github.com" ? (
                                  <GitHubIcon />
                                ) : (
                                  <RightUpArrowIcon2 />
                                )}
                              </span>
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
