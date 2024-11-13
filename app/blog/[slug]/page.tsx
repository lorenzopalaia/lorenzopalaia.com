import MDXContent from "@/components/MDXContent";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";
import Link from "next/link";

const blogDirectory = path.join(process.cwd(), "content");

export async function generateStaticParams() {
  const posts = await getPosts(blogDirectory);
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(blogDirectory, slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, publishedAt } = metadata;

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <Link
        href="/blog"
        className="flex gap-2 items-center text-muted-foreground hover:text-primary"
      >
        <ArrowLeft />
        Back to blog
      </Link>
      {image && (
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
          <Image src={image} alt={title || ""} className="object-cover" fill />
        </div>
      )}
      <header>
        <h1 className="title text-5xl">{title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatDate(publishedAt ?? "")}
        </p>
      </header>
      <main className="prose dark:prose-invert">
        <MDXContent source={content} />
      </main>
    </article>
  );
}
