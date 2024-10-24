"use client";

import config from "@/config";
import useNavigation from "@/hooks/useNavigation";

import Link from "next/link";

const Navigation = () => {
  const activeSection = useNavigation();

  return (
    <nav className="hidden nav lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {config.navigation.map((section) => {
          return (
            <li key={section.id}>
              <Link
                className="flex items-center py-3 group"
                href={`#${section.id}`}
              >
                <span
                  className={`nav-indicator mr-4 h-px transition-all  group-hover:w-16  group-hover:bg-slate-200  group-focus-visible:w-16  group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
                    activeSection === section.id
                      ? "w-16 bg-slate-200"
                      : "w-8 bg-slate-600"
                  }`}
                ></span>
                <span
                  className={`nav-text  text-xs  font-bold  uppercase  tracking-widest  group-hover:text-slate-200  group-focus-visible:text-slate-200 ${
                    activeSection === section.id
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {section.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
