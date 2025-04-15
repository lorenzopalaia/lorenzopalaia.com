import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
  const { postId, action, previousAction } = await req.json();
  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  const likeKey = `likes:${postId}`;
  const dislikeKey = `dislikes:${postId}`;

  if (previousAction === "like") {
    await redis.decr(likeKey);
  } else if (previousAction === "dislike") {
    await redis.decr(dislikeKey);
  }

  if (action === "like") {
    await redis.incr(likeKey);
  } else if (action === "dislike") {
    await redis.incr(dislikeKey);
  }

  const likes = (await redis.get(likeKey)) || 0;
  const dislikes = (await redis.get(dislikeKey)) || 0;

  return NextResponse.json({ likes, dislikes });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  const likeKey = `likes:${postId}`;
  const dislikeKey = `dislikes:${postId}`;

  const likes = (await redis.get(likeKey)) || 0;
  const dislikes = (await redis.get(dislikeKey)) || 0;

  return NextResponse.json({ likes, dislikes });
}
