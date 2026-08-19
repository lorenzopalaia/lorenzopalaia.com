import "server-only";

import fs from "node:fs";
import path from "node:path";

export function getArticleSource(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "posts",
    `${slug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}