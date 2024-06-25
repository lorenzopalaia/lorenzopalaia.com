import Link from "next/link";
import { ReactNode } from "react";
import RightUpArrowIcon from "../Icons/RightUpArrowIcon";

const CardLink = ({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      className="inline-flex items-baseline text-base font-medium leading-tight group/link text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${href} (opens in a new tab)`}
    >
      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
      <span>
        {children}
        <span className="inline-block">
          <RightUpArrowIcon className="inline-block w-4 h-4 ml-1 transition-transform translate-y-px shrink-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
        </span>
      </span>
    </Link>
  );
};

export default CardLink;
