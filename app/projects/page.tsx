"use client";

import config from "@/config";
import Link from "next/link";

import BackLink from "@/components/Links/BackLink";

import { Github, Star, ArrowUpRight } from "lucide-react";

import useGithubRepos from "@/hooks/useGitHubRepos";

import formatLink from "@/utils/formatLink";

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
  const { repos, isLoading } = useGithubRepos();

  const sortedRepos = repos.sort((a: Project, b: Project) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <div className="max-w-screen-xl min-h-screen px-6 py-12 mx-auto font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:py-24">
        <BackLink href="/">Lorenzo Palaia</BackLink>
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
                          aria-label={`${repo.html_url} (opens in a new tab)`}
                        >
                          <span>
                            {repo.name.replaceAll("-", " ")}
                            <span className="inline-block">
                              <ArrowUpRight className="inline-block w-4 h-4 ml-1 transition-transform translate-y-px shrink-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                            </span>
                          </span>
                        </Link>
                      </div>
                      <div className="hidden sm:block">
                        {repo.name.replaceAll("-", " ")}
                        <span className="inline-block ml-2">
                          <Star className="w-3 h-3 mr-1" />
                        </span>
                        {repo.stargazers_count}
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
                          aria-label={`${repo.html_url} (opens in a new tab)`}
                        >
                          <span>
                            {" "}
                            <span className="inline-block">
                              {formatLink(repo.html_url)}
                              {formatLink(repo.html_url) === "github.com" ? (
                                <Github className="inline-block ml-1.5 h-3.5 w-3.5 shrink-0" />
                              ) : (
                                <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5" />
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
  );
}
