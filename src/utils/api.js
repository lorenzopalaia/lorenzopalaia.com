async function fetchRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    const response = await fetch(data[i].languages_url);
    const languages = await response.json();
    data[i].languages = Object.keys(languages);
  }
  return data;
}

function redirectToExternalLink(url) {
  if (url) window.open(url, "_blank");
}

export { fetchRepos, redirectToExternalLink };
