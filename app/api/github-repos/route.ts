import { NextResponse } from "next/server";

import { Octokit } from "@octokit/rest";

import type { RestEndpointMethodTypes } from "@octokit/rest";

import { config } from "@/config";

type Repo =
  RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

const fetchGithubRepos = async (): Promise<Repo[]> => {
  const response = await octokit.repos.listForUser({
    username: "lorenzopalaia",
  });

  return response.data.filter(
    (repo) =>
      !repo.fork || (repo.fork && config.includedForkRepos.includes(repo.name)),
  );
};

const fetchRepoLanguages = async (
  owner: string,
  repo: string,
): Promise<string[]> => {
  const response = await octokit.repos.listLanguages({
    owner,
    repo,
  });
  return Object.keys(response.data);
};

export async function GET() {
  try {
    const githubRepos = await fetchGithubRepos();
    const reposWithLanguages = await Promise.all(
      githubRepos.map(async (repo) => {
        const languages = await fetchRepoLanguages(repo.owner.login, repo.name);
        return {
          ...repo,
          languages,
          img: `https://raw.githubusercontent.com/lorenzopalaia/${repo.name}/main/repo_assets/preview.png`,
        };
      }),
    );

    return NextResponse.json(reposWithLanguages, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Error retrieving data" },
      { status: 500 },
    );
  }
}
