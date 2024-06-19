import BadgeList from "@/components/BadgeList";
import LinkList from "./LinkList";
import Link from "next/link";
import RightUpArrowIcon from "./Icons/RightUpArrowIcon";
import CardLink from "./Links/CardLink";

const DateCard = ({
    date,
    title1,
    title2,
    title3,
    title4,
    description,
    links,
    badges,
    url,
}: {
    date: string;
    title1: string;
    title2?: string;
    title3?: string;
    title4?: string;
    description: string[];
    links?: {
        name: string;
        url: string;
    }[];
    badges?: string[];
    url: string;
}) => {
    return (
        <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
            <header
                className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                aria-label={date}
            >
                {date}
            </header>
            <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                        <CardLink href={url}>
                            {title1} {title2 && `· ${title2}`}
                        </CardLink>
                    </div>
                    {title3 && (
                        <div>
                            <div className="text-slate-500" aria-hidden="true">
                                {title3}
                            </div>
                        </div>
                    )}
                    {title4 && (
                        <div>
                            <div className="text-slate-500" aria-hidden="true">
                                {title4}
                            </div>
                        </div>
                    )}
                </h3>
                {description.map((paragraph, index) => (
                    <p className="mt-2 text-sm leading-normal" key={index}>
                        {paragraph}
                    </p>
                ))}
                {links && <LinkList links={links} />}
                {badges && <BadgeList badges={badges} />}
            </div>
        </div>
    );
};

export default DateCard;
