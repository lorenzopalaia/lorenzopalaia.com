import Link from "next/link";
import { ReactNode } from "react";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

const LocalLink = ({
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
            className={`group inline-flex items-center font-medium font-semibold leading-tight text-slate-200 text-slate-200 ${className}`}
            aria-label="View Full Archive"
            href={href}
        >
            <span>
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                    {children}
                </span>
                <span className="whitespace-nowrap">
                    <RightArrowIcon />
                </span>
            </span>
        </Link>
    );
};

export default LocalLink;
