import config from "@/config";
import Link from "next/link";

import BackLink from "@/components/Links/BackLink";

import { ArrowUpRight } from "lucide-react";

import formatLink from "@/utils/formatLink";

export default function ExtraActivities() {
  return (
    <div className="max-w-screen-xl min-h-screen px-6 py-12 mx-auto font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:py-24">
        <BackLink href="/">Lorenzo Palaia</BackLink>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Extra Activities
        </h1>
        <table id="content" className="w-full mt-12 text-left border-collapse">
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
            {config.extraActivities.map((activity, index) => (
              <tr
                key={index}
                className="border-b border-slate-300/10 last:border-none"
              >
                <td className="py-4 pr-4 text-sm align-top">{activity.date}</td>
                <td className="py-4 pr-4 font-semibold leading-snug align-top text-slate-200">
                  {activity.activity}
                </td>
                <td className="hidden py-4 pr-4 text-sm align-top sm:table-cell">
                  {activity.role}
                </td>
                <td className="hidden py-4 pr-4 text-sm align-top lg:table-cell">
                  {activity.location}
                </td>
                <td className="hidden py-4 pr-4 align-top sm:table-cell">
                  <ul className="flex -translate-y-1.5 flex-wrap">
                    {activity.badges.map((badge, index) => (
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
                    <li key={index} className="flex items-center mb-1">
                      <Link
                        className="inline-flex items-baseline text-sm font-medium leading-tight hover:text-teal-300 focus-visible:text-teal-300 text-slate-400 group/link"
                        href={activity.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${activity.url} (opens in a new tab)`}
                      >
                        <span>
                          {" "}
                          <span className="inline-block">
                            {formatLink(activity.url)}
                            <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5" />
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
      </div>
    </div>
  );
}
