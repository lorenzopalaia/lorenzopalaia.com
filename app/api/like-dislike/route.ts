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

  try {
    const pipeline = redis.pipeline();

    if (previousAction === "like") {
      pipeline.decr(`likes:${postId}`);
    } else if (previousAction === "dislike") {
      pipeline.decr(`dislikes:${postId}`);
    }

    if (action === "like") {
      pipeline.incr(`likes:${postId}`);
    } else if (action === "dislike") {
      pipeline.incr(`dislikes:${postId}`);
    }

    await pipeline.exec();

    const likeKey = `likes:${postId}`;
    const dislikeKey = `dislikes:${postId}`;

    const [likes, dislikes] = await Promise.all([
      redis.get(likeKey) || 0,
      redis.get(dislikeKey) || 0,
    ]);

    return NextResponse.json({
      likes: Number(likes),
      dislikes: Number(dislikes),
    });
  } catch (error) {
    console.error("Redis operation failed:", error);
    return NextResponse.json(
      { error: "Failed to update counts" },
      { status: 500 },
    );
  }
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
