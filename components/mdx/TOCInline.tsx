"use client";

import { MouseEvent } from "react";

import Link from "next/link";

export default function TOCInline({
  sections,
}: {
  sections: { title: string; url: string }[];
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();
    const targetElement = document.querySelector(url);
    if (targetElement) {
      const offset = 96;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <h2>Table of Contents</h2>
      <ul>
        {sections.map((section, i) => (
          <li key={i}>
            <Link
              href={section.url}
              onClick={(e) => handleClick(e, section.url)}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
