import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function BackLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={`inline-flex items-center mb-2 font-semibold leading-tight text-teal-300 group ${className}`}
      href={href}
    >
      <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-2" />
      {children}
    </Link>
  );
}
