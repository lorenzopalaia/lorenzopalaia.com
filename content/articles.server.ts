import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function stripLegacyMdx(raw: string) {
  let content = matter(raw).content.trim();

  // Remove legacy JSX components that Streamdown cannot render.
  content = content.replace(/<TOCInline[\s\S]*?\/>/g, "");

  // Remove section wrappers.
  content = content
    .replace(/<section[^>]*>/g, "")
    .replace(/<\/section>/g, "");

  // Remove remaining JSX/HTML tags from the legacy MDX.
  content = content.replace(/<[^>]+>/g, "");

  return content;
}

export function getArticleBody(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "posts",
    `${slug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");

  return stripLegacyMdx(raw);
}