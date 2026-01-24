"use client";

import Image from "next/image";
import Link from "next/link";

import CardButton from "@/components/card/CardButton";

import { useContributedRepos } from "@/hooks/useContributedRepos";

import { Star } from "lucide-react";

type Position = {
  title: string;
  client?: string;
  startDate: string;
  endDate: string;
  items?: string[];
};

type TimelineItem = {
  company: string;
  img: string;
  href?: string;
  id?: number;
  links?: { title: string; href: string }[];
  positions?: Position[];
  title?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
  items?: string[];
};

function CardItem({
  company,
  img,
  href,
  links,
  id,
  positions,
  title,
  client,
  startDate,
  endDate,
  items,
}: TimelineItem) {
  const repoId = id ?? 0;
  const { username, repoName, stars } = useContributedRepos({
    id: repoId,
    skipFetch: !id,
  });

  const companyLink =
    username && repoName
      ? `https://github.com/${username}/${repoName}`
      : (href ?? "#");

  const positionsToRender: Position[] = positions
    ? positions
    : title
      ? [
          {
            title,
            startDate: startDate || "",
            endDate: endDate || "",
            items,
            client,
          },
        ]
      : [];

  return (
    <li className="relative mx-10 py-4">
      <Link
        target="_blank"
        className="absolute top-4 -left-16 flex items-center justify-center rounded-full"
        href={companyLink}
      >
        <span className="relative flex size-12 shrink-0 overflow-hidden rounded-full border-2">
          <Image
            className="bg-background aspect-square h-full w-full object-contain"
            alt={company}
            src={img}
            width={48}
            height={48}
          />
        </span>
      </Link>
      <div className="flex flex-1 flex-col justify-start gap-3">
        <h2 className="flex items-center gap-2 leading-none font-semibold">
          {company}
          {stars !== null && (
            <span className="text-muted-foreground flex gap-1 text-xs">
              <Star size={16} className="text-yellow-500" />{" "}
              {stars.toLocaleString()}
            </span>
          )}
        </h2>

        <div className="flex flex-col gap-4">
          {positionsToRender.map((position, index) => (
            <div
              key={`${position.title}-${position.startDate}-${index}`}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="title text-muted-foreground text-sm font-semibold">
                  {position.title}
                  {position.client ? ` - ${position.client}` : ""}
                </p>
                <time className="text-muted-foreground text-xs">
                  <span>{position.startDate}</span>
                  {position.startDate && position.endDate && <span> - </span>}
                  <span>{position.endDate}</span>
                </time>
              </div>
              {position.items && position.items.length > 0 && (
                <ul className="ml-4 list-outside list-disc">
                  {position.items.map((item, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="prose dark:prose-invert text-sm"
                    >
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {links && links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {links.map((link, index) => (
              <CardButton key={index} link={link} />
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function AboutCard({ data }: { data: TimelineItem[] }) {
  return (
    <div className="bg-card text-card-foreground rounded-xl border-2 shadow-sm">
      <div className="p-0">
        <ul className="ml-10 border-l-2">
          {data.map((item, index) => (
            <CardItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
