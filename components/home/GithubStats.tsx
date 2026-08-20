"use client";

import { useGithubRepos, useGithubUser } from "@/hooks/api/useGithub";

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function GithubStats() {
  const githubUser = useGithubUser();
  const githubRepos = useGithubRepos();

  const isLoading = githubUser.isLoading || githubRepos.isLoading;

  const isError = githubUser.isError || githubRepos.isError;

  const totalStars =
    githubRepos.data?.reduce(
      (total, repo) => total + repo.stargazers_count,
      0,
    ) ?? 0;

  return (
    <div className="work-metrics">
      {isLoading ? (
        <span>Reading live GitHub signal…</span>
      ) : isError ? (
        <span>Live GitHub data unavailable.</span>
      ) : (
        <>
          <Metric
            label="Public repos"
            value={githubUser.data?.publicRepos ?? 0}
          />

          <Metric label="Followers" value={githubUser.data?.followers ?? 0} />

          <Metric label="Stars in index" value={totalStars} />
        </>
      )}
    </div>
  );
}
