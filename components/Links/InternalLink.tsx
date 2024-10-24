import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export default function InternalLink({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={`group inline-flex items-center font-semibold leading-tight text-slate-200 ${className}`}
      aria-label="View Full Archive"
      href={href}
    >
      <span>
        <span className="pb-px transition border-b border-transparent group-hover:border-teal-300 motion-reduce:transition-none">
          {children}
        </span>
        <span className="whitespace-nowrap">
          <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform -translate-y-px shrink-0 group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
        </span>
      </span>
    </Link>
  );
}
