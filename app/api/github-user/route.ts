import { NextResponse } from "next/server";

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

const fetchGithubUser = async () => {
  const response = await octokit.users.getByUsername({
    username: "lorenzopalaia",
  });

  return {
    followers: response.data.followers,
    following: response.data.following,
    publicRepos: response.data.public_repos,
    name: response.data.name,
    bio: response.data.bio,
    location: response.data.location,
    company: response.data.company,
  };
};

export async function GET() {
  try {
    const userData = await fetchGithubUser();

    return NextResponse.json(userData, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error retrieving GitHub user data:", error);
    return NextResponse.json(
      { error: "Error retrieving GitHub user data" },
      { status: 500 },
    );
  }
}
