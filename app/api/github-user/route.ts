import { NextResponse } from "next/server";

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

const fetchGithubUser = async () => {
  const [userResponse, starsResponse] = await Promise.all([
    octokit.users.getByUsername({
      username: "lorenzopalaia",
    }),
    fetch("https://api.github-star-counter.workers.dev/user/lorenzopalaia"), // TODO: Replace by applying a reduce on github-repos endpoint
  ]);

  const starsData = await starsResponse.json();

  return {
    followers: userResponse.data.followers,
    following: userResponse.data.following,
    publicRepos: userResponse.data.public_repos,
    name: userResponse.data.name,
    bio: userResponse.data.bio,
    location: userResponse.data.location,
    company: userResponse.data.company,
    stars: starsData.stars,
    forks: starsData.forks,
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
