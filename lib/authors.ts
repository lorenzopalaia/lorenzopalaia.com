import { authors } from "@/blog/authors";

export function getAuthor({ id }: { id: string }) {
  return authors.find((author) => author.id === id);
}
