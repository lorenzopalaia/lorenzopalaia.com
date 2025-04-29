"use client";

import Image from "next/image";
import Link from "next/link";

import CardButton from "@/components/card/CardButton";

import { useGithubStars } from "@/hooks/useGithubStars";

import { Star } from "lucide-react";

function CardItem({
  title,
  company,
  startDate,
  endDate,
  items,
  href,
  img,
  links,
  owner,
  repo,
}: {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  items?: string[];
  href: string;
  img: string;
  links?: { title: string; href: string }[];
  owner?: string;
  repo?: string;
}) {
  const { stars } = useGithubStars({
    owner: owner || "",
    repo: repo || "",
    skipFetch: !owner || !repo,
  });

  return (
    <li className="relative ml-10 py-4">
      <Link
        target="_blank"
        className="absolute top-4 -left-16 flex items-center justify-center rounded-full"
        href={href}
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
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-muted-foreground text-xs">
          <span>{startDate}</span>
          {startDate && endDate && <span> - </span>}
          <span>{endDate}</span>
        </time>
        <h2 className="flex items-center gap-2 leading-none font-semibold">
          {company}
          {stars !== null && (
            <span className="text-muted-foreground flex gap-1 text-xs">
              <Star size={16} className="text-yellow-500" />{" "}
              {stars.toLocaleString()}
            </span>
          )}
        </h2>
        <p className="title text-muted-foreground text-sm">{title}</p>
        {items && items.length > 0 && (
          <ul className="ml-4 list-outside list-disc">
            {items.map((item, index) => (
              <li key={index} className="prose dark:prose-invert pr-8 text-sm">
                <p>{item}</p>
              </li>
            ))}
          </ul>
        )}
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

export default function AboutCard({
  data,
}: {
  data: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    items?: string[];
    href: string;
    img: string;
    owner?: string;
    repo?: string;
    links?: {
      title: string;
      href: string;
    }[];
  }[];
}) {
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
