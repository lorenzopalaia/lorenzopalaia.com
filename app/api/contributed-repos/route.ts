import { NextResponse } from "next/server";

import { getContributedRepository } from "@/lib/github/contributions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawId = searchParams.get("id");

    if (!rawId) {
      return NextResponse.json(
        {
          error: "The 'id' parameter is required",
        },
        {
          status: 400,
        },
      );
    }

    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        {
          error: "The 'id' parameter must be a positive integer",
        },
        {
          status: 400,
        },
      );
    }

    const repository = await getContributedRepository(id);

    return NextResponse.json(
      {
        username: repository.username,

        repoName: repository.repoName,

        stars: repository.stars,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching contributed repository:", error);

    return NextResponse.json(
      {
        error: "Error fetching repo",
      },
      {
        status: 500,
      },
    );
  }
}
