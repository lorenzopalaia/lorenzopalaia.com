import { Octokit } from "octokit";

const CACHE_KEY = "projectsCache";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 60 minutes

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

/*
async function fetchReposWithLanguages(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    const response = await fetch(data[i].languages_url);
    const languages = await response.json();
    data[i].languages = Object.keys(languages);
    data[i].repo_preview = `https://raw.githubusercontent.com/lorenzopalaia/${data[i].name}/main/repo_assets/preview.png`
  }
  return data;
}
*/

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
    return data;
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
}

async function getCachedProjects() {
  let cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    cachedData = JSON.parse(cachedData);
    const currentTime = new Date().getTime();
    if (currentTime - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
      return cachedData.projects;
    }
  }
  return null;
}

async function fetchProjectsAndUpdateCache(username) {
  const data = await fetchReposWithLanguages(username);
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ projects: data, timestamp: new Date().getTime() })
  );
  return data;
}

function redirectToExternalLink(url) {
  if (url) window.open(url, "_blank");
}


export { fetchReposWithLanguages, getCachedProjects, fetchProjectsAndUpdateCache, redirectToExternalLink };