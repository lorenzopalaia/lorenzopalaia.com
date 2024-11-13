"use client";

import React from "react";

export default function TOCInline({
  sections,
}: {
  sections: { title: string; url: string }[];
}) {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
  ) => {
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
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {sections.map((section, i) => (
          <li key={i}>
            <a href={section.url} onClick={(e) => handleClick(e, section.url)}>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
