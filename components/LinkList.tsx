import Link from "next/link";
import LinkIcon from "./Icons/LinkIcon";

const LinkList = ({
  links,
}: {
  links: {
    name: string;
    url: string;
  }[];
}) => {
  return (
    <ul className="flex flex-wrap mt-2" aria-label="Related links">
      {links.map((link, index) => (
        <li className="mr-4" key={index}>
          <Link
            className="relative inline-flex items-center mt-2 text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.name} (opens in a new tab)`}
          >
            <LinkIcon />
            <span>{link.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
