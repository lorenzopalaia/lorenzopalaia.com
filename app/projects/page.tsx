"use client";

/**
 * Quiet Systems style reminder: live project data is presented as an inspectable
 * repository field, not a dashboard card wall.
 */

import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  GitFork,
  Github,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { CoordinateRail } from "@/components/CoordinateRail";
import { projects } from "@/data/portfolio";

type GithubRepo = {
  repository: string;
  name: string;
  description: string | null;
  languages: string[];
  stars: number;
  forks: number;
};

type GithubData = {
  profile: {
    repositories: number;
    followers: number;
  };
  totalStars: number;
  repos: GithubRepo[];
};

type NpmData = {
  available: boolean;
  downloads: number;
};

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

async function fetchGithubData(): Promise<GithubData> {
  const [userResponse, reposResponse] = await Promise.all([
    fetch("/api/github-user", {
      method: "GET",
      cache: "no-store",
    }),
    fetch("/api/github-repos", {
      method: "GET",
      cache: "no-store",
    }),
  ]);

  if (!userResponse.ok) {
    throw new Error("Unable to load GitHub user data.");
  }

  if (!reposResponse.ok) {
    throw new Error("Unable to load GitHub repositories.");
  }

  const user = await userResponse.json();
  const repos = await reposResponse.json();

  if (!Array.isArray(repos)) {
    throw new Error("Invalid GitHub repositories response.");
  }

  const normalizedRepos: GithubRepo[] = repos.map((repo) => ({
    repository: repo.html_url,
    name: repo.name,
    description: repo.description ?? null,
    languages: Array.isArray(repo.languages) ? repo.languages : [],
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
  }));

  const totalStars = normalizedRepos.reduce(
    (total, repo) => total + repo.stars,
    0,
  );

  return {
    profile: {
      repositories: user.publicRepos ?? 0,
      followers: user.followers ?? 0,
    },
    totalStars,
    repos: normalizedRepos,
  };
}

async function fetchNpmDownloads(packageName: string): Promise<NpmData> {
  const response = await fetch(
    `/api/npm-downloads?package=${encodeURIComponent(packageName)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      available: false,
      downloads: 0,
    };
  }

  const data = await response.json();

  return {
    available: typeof data.downloads === "number",
    downloads: data.downloads ?? 0,
  };
}

export default function Work() {
  const [github, setGithub] = useState<GithubData | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);

  const [animations, setAnimations] = useState<NpmData>({
    available: false,
    downloads: 0,
  });

  const [patterns, setPatterns] = useState<NpmData>({
    available: false,
    downloads: 0,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setGithubLoading(true);
      setGithubError(false);

      try {
        const [githubData, animationsData, patternsData] = await Promise.all([
          fetchGithubData(),
          fetchNpmDownloads("@lorenzopalaia/tailwind-animations"),
          fetchNpmDownloads("@lorenzopalaia/tailwind-hero-patterns"),
        ]);

        if (cancelled) return;

        setGithub(githubData);
        setAnimations(animationsData);
        setPatterns(patternsData);
      } catch (error) {
        console.error("Failed to load Work data:", error);

        if (cancelled) return;

        setGithubError(true);
        setGithub(null);
      } finally {
        if (!cancelled) {
          setGithubLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="work-page">
      <header className="detail-header">
        <Link href="/#work" className="detail-back" data-cursor="BACK">
          <ArrowLeft size={18} />
          Back to the environment
        </Link>

        <span className="scene-eyebrow">Live work index</span>
      </header>

      <section className="work-hero">
        <div>
          <p className="detail-category">GitHub / source of record</p>

          <h1>
            What is
            <br />
            running now.
          </h1>

          <p>
            Public repositories and lightweight package telemetry from the
            active source system.
          </p>
        </div>

        <div className="work-metrics">
          {github ? (
            <>
              <Metric
                label="Public repos"
                value={github.profile.repositories}
              />

              <Metric label="Followers" value={github.profile.followers} />

              <Metric label="Stars in index" value={github.totalStars} />
            </>
          ) : githubLoading ? (
            <span>Reading live GitHub signal…</span>
          ) : (
            <span>Live GitHub data unavailable.</span>
          )}
        </div>

        <CoordinateRail index="01" label="WORK / LIVE INDEX" />
      </section>

      <section className="work-selected">
        <span className="scene-eyebrow">Selected objects</span>

        <div>
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <span>{project.index}</span>
              <strong>{project.name}</strong>
              <em>{project.category}</em>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="work-repositories">
        <header>
          <span className="scene-eyebrow">Repository field</span>

          <span>
            {github
              ? `${github.repos.length} visible repositories`
              : githubLoading
                ? "Loading live data"
                : "Live data unavailable"}
          </span>
        </header>

        {githubError && (
          <p className="work-source-error">
            Live GitHub data is currently unavailable. Visit the public profile
            directly for the source record.
          </p>
        )}

        <div className="repo-list">
          {github?.repos.map((repo, index) => (
            <article key={repo.repository}>
              <span>{String(index + 1).padStart(2, "0")}</span>

              <div>
                <h2>{repo.name}</h2>

                <p>{repo.description ?? "No public description supplied."}</p>

                <em>{repo.languages.join(" / ") || "Unclassified"}</em>
              </div>

              <div className="repo-stats">
                <span>
                  <Star size={13} />
                  {repo.stars}
                </span>

                <span>
                  <GitFork size={13} />
                  {repo.forks}
                </span>
              </div>

              <Link
                href={repo.repository}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${repo.name} on GitHub`}
                data-cursor="OPEN"
              >
                <Github size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="npm-strip">
        <div>
          <Code2 size={19} />
          <span className="scene-eyebrow">NPM / last 12 months</span>
        </div>

        <div>
          <Metric
            label="Tailwind animations"
            value={
              animations.available
                ? new Intl.NumberFormat("en").format(animations.downloads)
                : "—"
            }
          />

          <Metric
            label="Hero patterns"
            value={
              patterns.available
                ? new Intl.NumberFormat("en").format(patterns.downloads)
                : "—"
            }
          />
        </div>
      </section>
    </main>
  );
}
