"use client";

import { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import LikeDislikeButton from "@/components/blog/LikeDislikeButton";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

interface Props {
  posts: PostMetadata[];
}

export default function Posts({ posts }: Props) {
  const { unlockAchievement } = useAchievementsContext();

  return (
    posts.length > 0 && (
      <Card>
        <ul className="flex flex-col">
          {posts.map((post, i) => (
            <li key={i}>
              {i !== 0 && i !== posts.length && <Separator />}
              <div className="flex flex-col justify-between p-6 sm:flex-row sm:items-center">
                <div className="max-w-md md:max-w-lg">
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => unlockAchievement("blog-post")}
                  >
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                  </Link>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm font-light">
                    {post.summary}
                  </p>
                  {post.tags && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {post.tags.map((tag, index) => (
                        <Link key={index} href={`/blog?search=${tag}`}>
                          <Badge key={index}>{tag}</Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {post.publishedAt && (
                    <p className="mt-2 flex w-full justify-end text-sm font-light sm:mt-0 sm:w-auto">
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                  <LikeDislikeButton
                    postId={post.slug}
                    className="justify-end"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    )
  );
}
