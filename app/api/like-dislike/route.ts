import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, postId: string): boolean {
  const key = `${ip}:${postId}`;
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 3;

  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

setInterval(
  () => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  },
  5 * 60 * 1000,
);

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";

  const { postId, action, previousAction } = await req.json();

  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  const isAllowed = checkRateLimit(ip, postId);
  if (!isAllowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
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
