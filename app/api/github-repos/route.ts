import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import type { RestEndpointMethodTypes } from "@octokit/rest";

type Repo =
  RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];

interface RepoWithLanguages extends Repo {
  languages: string[];
  img: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

const fetchGithubRepos = async (): Promise<Repo[]> => {
  const response = await octokit.repos.listForUser({
    username: "lorenzopalaia",
  });
  return response.data;
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
    const githubRepos: Repo[] = await fetchGithubRepos();

    const reposWithLanguages: RepoWithLanguages[] = await Promise.all(
      githubRepos.map(async (repo) => {
        try {
          let languages: string[] = await fetchRepoLanguages(
            repo.owner.login,
            repo.name,
          );
          if (
            languages.includes("Jupyter Notebook") &&
            !languages.includes("Python")
          ) {
            languages.push("Python");
          }
          if (
            languages.includes("TypeScript") &&
            languages.includes("JavaScript")
          ) {
            languages = languages.filter(
              (language) => language !== "JavaScript",
            );
          }
          if (repo.name.toLowerCase().includes("tailwind")) {
            languages.push("TailwindCSS");
          }
          if (languages.length === 0) {
            languages = ["Markdown"];
          }
          return {
            ...repo,
            languages,
            img: `https://raw.githubusercontent.com/lorenzopalaia/${repo.name}/main/repo_assets/preview.png`,
          };
        } catch (error) {
          console.error("Error while fetching repository languages:", error);
          return {
            ...repo,
            languages: [],
            img: `https://raw.githubusercontent.com/lorenzopalaia/${repo.name}/main/repo_assets/preview.png`,
          };
        }
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
