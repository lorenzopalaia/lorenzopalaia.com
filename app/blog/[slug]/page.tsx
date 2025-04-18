import { getPostBySlug, getPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

import path from "path";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import MDXServer from "@/components/mdx/MDXServer";

import LikeDislikeButton from "@/components/blog/LikeDislikeButton";

const blogDirectory = path.join(process.cwd(), "blog/posts");

export async function generateStaticParams() {
  const posts = await getPosts(blogDirectory);
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

function BackToBlog() {
  return (
    <Link
      href="/blog"
      className="text-muted-foreground hover:text-primary flex items-center gap-2"
    >
      <ArrowLeft />
      Back to blog
    </Link>
  );
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(blogDirectory, slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, publishedAt, tags, author: authorId } = metadata;

  const author = authorId ? getAuthor({ id: authorId }) : null;

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.lorenzopalaia.com/blog/${slug}`,
            },
            headline: title,
            image: [image],
            datePublished: publishedAt,
            dateModified: publishedAt,
            author: {
              "@type": "Person",
              name: author?.name || "Lorenzo Palaia",
            },
            publisher: {
              "@type": "Organization",
              name: "Lorenzo Palaia",
              logo: {
                "@type": "ImageObject",
                url: "https://www.lorenzopalaia.com/images/avatar.webp",
              },
            },
            description: content.slice(0, 150), // Assuming the first 150 characters as excerpt
          })}
        </script>
      </Head>
      <article className="mt-8 flex flex-col gap-8 pb-16">
        <BackToBlog />
        {image && (
          <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title || ""}
              className="object-cover"
              fill
            />
          </div>
        )}
        <header>
          <h1 className="title text-5xl">{title}</h1>
          <p className="text-muted-foreground my-2 text-xs">
            {formatDate(publishedAt ?? "")}
          </p>
          <LikeDislikeButton postId={slug} className="justify-start" />
          {author && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Image
                src={author.avatar}
                alt={author.name}
                width={48}
                height={48}
                className="size-12 rounded-full"
              />
              <p className="text-md">
                <span className="title">{author.name}</span>
                <br />
                <span className="text-muted-foreground">
                  {author.occupation}
                </span>
              </p>
            </div>
          )}
          <Separator className="mt-8 h-[2px]" />
        </header>
        <main className="prose dark:prose-invert">
          <MDXServer source={content} />
        </main>
        <footer className="mt-8">
          <Separator className="h-[2px]" />
          <div className="flex items-center justify-between gap-2">
            {tags && (
              <div>
                <p className="title text-muted-foreground mt-4">TAGS</p>
                <div className="mt-2 mb-8 flex flex-wrap items-center gap-2">
                  {tags.map((tag, index) => (
                    <Link key={index} href={`/blog?search=${tag}`}>
                      <Badge key={index}>{tag}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <LikeDislikeButton postId={slug} />
          </div>
          <BackToBlog />
        </footer>
      </article>
    </>
  );
}
