import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomLink = ({
    href,
    target,
    children,
    className,
}: {
    href: string;
    target?: string;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <Link
            href={href}
            target={target}
            className="no-underline text-primary font-bold"
        >
            <span
                className={`group hover:underline decoration-primary ${className}`}
            >
                {children}
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 group-hover:ml-3"
                />
            </span>
        </Link>
    );
};

export default CustomLink;
