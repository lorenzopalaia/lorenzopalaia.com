import { NextResponse, NextRequest } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.NEXT_GITHUB_TOKEN,
});

const CACHE_DURATION = 2 * 3600 * 1000; // 2 ore in millisecondi
let cachedData: any | null = null;
let cacheTimestamp: number | null = null;

const fetchGithubRepos = async () => {
  const response = await octokit.repos.listForUser({
    username: "lorenzopalaia",
  });
  console.log("Retrieving data from GitHub");
  return response.data;
};

const fetchRepoLanguages = async (owner: string, repo: string) => {
  const response = await octokit.repos.listLanguages({
    owner,
    repo,
  });
  return Object.keys(response.data);
};

export async function GET(req: NextRequest) {
  const now = Date.now();

  const headers = {
    "Cache-Control": `public, max-age=${CACHE_DURATION / 1000}`,
  };

  if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    console.log("Retrieving data from cache");
    return NextResponse.json(cachedData, { headers });
  }

  try {
    const githubRepos = await fetchGithubRepos();

    const reposWithLanguages = await Promise.all(
      githubRepos.map(async (repo) => {
        try {
          const languages = await fetchRepoLanguages(
            repo.owner.login,
            repo.name
          );
          return {
            ...repo,
            languages,
          };
        } catch (error) {
          console.error(
            "Errore durante il recupero dei dati della lingua della repository:",
            error
          );
          return {
            ...repo,
            languages: [],
          };
        }
      })
    );

    const reposWithImage = reposWithLanguages.map((repo) => ({
      ...repo,
      img: `https://raw.githubusercontent.com/lorenzopalaia/${repo.name}/main/repo_assets/preview.png`,
    }));

    cachedData = reposWithImage;
    cacheTimestamp = now;

    return NextResponse.json(reposWithImage);
  } catch (error) {
    console.error("Errore durante il recupero dei dati:", error);
    return NextResponse.json(
      { error: "Errore nel recupero dei dati" },
      { status: 500 }
    );
  }
}
