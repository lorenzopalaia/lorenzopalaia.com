import { NextResponse } from "next/server";

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "The 'owner' and 'repo' parameters are required" },
        { status: 400 },
      );
    }

    const response = await octokit.repos.get({
      owner,
      repo,
    });

    const starCount = response.data.stargazers_count;

    return NextResponse.json(
      { stars: starCount },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching stars:", error);
    return NextResponse.json(
      { error: "Error fetching stars" },
      { status: 500 },
    );
  }
}
