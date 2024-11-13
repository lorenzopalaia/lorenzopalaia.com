import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/posts";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");

export default async function BlogPage() {
  const posts = await getPosts(blogDirectory);

  return (
    <section className="my-16">
      <div className="min-h-screen">
        <h1 className="text-2xl sm:text-3xl title">Blog</h1>
        <PostsWithSearch posts={posts} />
      </div>
    </section>
  );
}
