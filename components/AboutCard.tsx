import Image from "next/image";

import Link from "next/link";

import CardButton from "@/components/CardButton";

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
  items?: React.ReactNode[];
  href: string;
  img: string;
  links?: { title: string; href: string }[];
}) {
  return (
    <li className="relative ml-10 py-4">
      <Link
        target="_blank"
        className="absolute -left-16 top-4 flex items-center justify-center rounded-full"
        href={href}
      >
        <span className="relative flex size-12 shrink-0 overflow-hidden rounded-full border-2">
          <Image
            className="aspect-square h-full w-full bg-background object-contain"
            alt={company}
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
        <p className="title text-sm text-muted-foreground">{title}</p>
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
    items?: React.ReactNode[];
    href: string;
    img: string;
    links?: {
      title: string;
      href: string;
    }[];
  }[];
}) {
  return (
    <div className="rounded-xl border-2 bg-card text-card-foreground shadow">
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
