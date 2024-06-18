import { ReactNode } from "react";
import Link from "next/link";

const PlainLink = ({
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
            className={`font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 ${className}`}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${href} (opens in a new tab)`}
        >
            {children}
        </Link>
    );
};

export default PlainLink;
