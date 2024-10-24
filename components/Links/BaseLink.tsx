import Link from "next/link";

export default function BaseLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  if (!href) {
    return (
      <span className="font-medium text-slate-200 hover:text-teal-300">
        {children}
      </span>
    );
  }

  return (
    <Link
      className={`font-medium text-slate-200 hover:text-teal-300 ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${href} (opens in a new tab)`}
    >
      {children}
    </Link>
  );
}
