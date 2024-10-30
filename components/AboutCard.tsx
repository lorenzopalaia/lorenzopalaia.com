import Image from "next/image";

import Link from "next/link";

import { Button } from "./ui/button";

import { Globe, Github } from "lucide-react";

function CardItem({
  title,
  company,
  startDate,
  endDate,
  items,
  href,
  img,
  links,
}: {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  items?: string[];
  href: string;
  img: string;
  links?: { title: string; href: string }[];
}) {
  return (
    <li className="relative ml-10 py-4">
      <Link
        target="_blank"
        className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white"
        href={href}
      >
        <span className="relative flex shrink-0 overflow-hidden rounded-full size-12 border">
          <Image
            className="aspect-square h-full w-full bg-background object-contain"
            alt="DBS Bank"
            src={img}
            width={48}
            height={48}
          />
        </span>
      </Link>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-xs text-muted-foreground">
          <span>{startDate}</span>
          {startDate && endDate && <span> - </span>}
          <span>{endDate}</span>
        </time>
        <h2 className="font-semibold leading-none">{company}</h2>
        <p className="text-sm text-muted-foreground title">{title}</p>
        {items && items.length > 0 && (
          <ul className="ml-4 list-outside list-disc">
            {items.map((item, index) => (
              <li key={index} className="prose pr-8 text-sm dark:prose-invert">
                {item}
              </li>
            ))}
          </ul>
        )}
        {links && links.length > 0 && (
          <div className="flex gap-2 mt-2">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                <Button size="sm" className="font-bold py-0.5 px-2.5">
                  {link.href.includes("github") ? <Github /> : <Globe />}
                  {link.title}
                </Button>
              </Link>
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
    links?: {
      title: string;
      href: string;
    }[];
  }[];
}) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-0">
        <ul className="ml-10 border-l">
          {data.map((item, index) => (
            <CardItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
