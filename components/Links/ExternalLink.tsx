import Link from "next/link";
import { ReactNode } from "react";
import RightUpArrowIcon from "@/components/Icons/RightUpArrowIcon";

const ExternalLink = ({
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
      className={`group/link inline-flex items-baseline text-base font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${href} (opens in a new tab)`}
    >
      <span>
        {children}
        <span className="inline-block">
          <RightUpArrowIcon className="inline-block w-4 h-4 ml-1 transition-transform translate-y-px shrink-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
        </span>
      </span>
    </Link>
  );
};

export default ExternalLink;
