import { NextResponse } from "next/server";

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "The 'id' parameter is required" },
        { status: 400 },
      );
    }

    const response = await octokit.request("GET /repositories/{repo_id}", {
      repo_id: id,
    });
    const username = response.data.owner.login;
    const repoName = response.data.name;
    const starCount = response.data.stargazers_count;

    return NextResponse.json(
      {
        username,
        repoName,
        stars: starCount,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching repo:", error);
    return NextResponse.json({ error: "Error fetching repo" }, { status: 500 });
  }
}
