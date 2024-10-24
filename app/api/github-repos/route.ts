import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import type { RestEndpointMethodTypes } from "@octokit/rest";

// Tipi per il repository GitHub (ottenuti automaticamente dall'Octokit)
type Repo =
  RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];

// Estendi il tipo `Repo` con la proprietà `languages` e `img`
interface RepoWithLanguages extends Repo {
  languages: string[];
  img: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

// Funzione per recuperare i repository di un utente
const fetchGithubRepos = async (): Promise<Repo[]> => {
  const response = await octokit.repos.listForUser({
    username: "lorenzopalaia",
  });
  return response.data;
};

// Funzione per recuperare le lingue di un repository
const fetchRepoLanguages = async (
  owner: string,
  repo: string
): Promise<string[]> => {
  const response = await octokit.repos.listLanguages({
    owner,
    repo,
  });
  return Object.keys(response.data);
};

export async function GET() {
  try {
    // Recupera i repository GitHub
    const githubRepos: Repo[] = await fetchGithubRepos();

    // Itera i repository per recuperare le lingue
    const reposWithLanguages: RepoWithLanguages[] = await Promise.all(
      githubRepos.map(async (repo) => {
        try {
          let languages: string[] = await fetchRepoLanguages(
            repo.owner.login,
            repo.name
          );
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
      })
    );

    // Imposta l'header Cache-Control per cacheare la risposta per 1 ora
    return NextResponse.json(reposWithLanguages, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Error retrieving data" },
      { status: 500 }
    );
  }
}
