import Link from "next/link";

import { ArrowRight } from "lucide-react";

import Posts from "@/components/blog/Posts";

import { getPosts } from "@/lib/posts";

import path from "path";

const blogDirectory = path.join(process.cwd(), "blog/posts");
const LIMIT = 3;

export default async function RecentPosts() {
  const posts = await getPosts(blogDirectory, LIMIT);

  return (
    <section className="my-16">
      <div className="flex items-center justify-between">
        <p className="title text-2xl sm:text-3xl">Recent Posts</p>
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-primary flex items-center gap-2"
        >
          View More <ArrowRight size={16} />
        </Link>
      </div>
      <div className="mt-8">
        <Posts posts={posts} />
      </div>
    </section>
  );
}
