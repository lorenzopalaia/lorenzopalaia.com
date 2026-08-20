import "server-only";

import { Octokit } from "@octokit/rest";
import { unstable_cache } from "next/cache";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export type ContributedRepository = {
  id: number;
  username: string;
  repoName: string;
  stars: number;
};

async function fetchContributedRepository(
  id: number,
): Promise<ContributedRepository> {
  const response = await octokit.request("GET /repositories/{repo_id}", {
    repo_id: id,
  });

  return {
    id,
    username: response.data.owner.login,
    repoName: response.data.name,
    stars: response.data.stargazers_count ?? 0,
  };
}

export async function getContributedRepository(
  id: number,
): Promise<ContributedRepository> {
  const getCachedRepository = unstable_cache(
    () => fetchContributedRepository(id),
    ["github-contributed-repository", String(id)],
    {
      revalidate: 3600,
    },
  );

  return getCachedRepository();
}
