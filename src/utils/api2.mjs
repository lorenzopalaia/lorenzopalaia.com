import { Octokit } from "octokit";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function fetchReposWithLanguages(username) {
  try {
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: username,
    });
    const promises = repos.map(async (repo) => {
      const { data: languages } = await octokit.rest.repos.listLanguages({
        owner: username,
        repo: repo.name,
      });
      const repo_preview = `https://raw.githubusercontent.com/${username}/${repo.name}/main/repo_assets/preview.png`;
      return { ...repo, languages: Object.keys(languages), repo_preview };
    });
    const data = await Promise.all(promises);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
}

const data = fetchReposWithLanguages("lorenzopalaia");

export { fetchReposWithLanguages };
