"use client";

import { Suspense } from "react";

import { PostMetadata } from "@/lib/posts";

import { Delete } from "lucide-react";

import { useSearchParams, useRouter } from "next/navigation";

import Posts from "@/components/blog/Posts";
import Lead from "@/components/blog/Lead";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  posts: PostMetadata[];
}

function SearchContainer({ posts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    window.history.replaceState(null, "", `?${params.toString()}`);
    router.refresh();
  };

  const resetFilter = () => {
    window.history.replaceState(null, "", window.location.pathname);
    router.refresh();
  };

  const filtered = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <>
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-background"
        />
        <Button
          size="sm"
          variant="secondary"
          onClick={resetFilter}
          disabled={searchQuery.length === 0}
          className="cursor-pointer"
        >
          Clear
          <Delete className="ml-2 size-4" />
        </Button>
      </div>
      <Posts posts={filtered} />
    </>
  );
}

export default function PostsWithSearch({ posts }: Props) {
  return (
    <>
      <div className="mt-8 flex flex-col gap-12">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchContainer posts={posts} />
        </Suspense>
      </div>
      <div className="mt-8">
        <Lead />
      </div>
    </>
  );
}
