const CACHE_KEY = "projectsCache";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 60 minutes

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