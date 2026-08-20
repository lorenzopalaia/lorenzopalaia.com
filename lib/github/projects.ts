import "server-only";

import { Octokit } from "@octokit/rest";
import { unstable_cache } from "next/cache";

import {
  additionalProjectsLanguages,
  includedForkRepos,
  localProjects,
  npmProjects,
  projectPresentation,
  type LocalProject,
  type PortfolioProject,
} from "@/data/projects";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

type GithubRepository = Awaited<
  ReturnType<typeof octokit.repos.listForUser>
>["data"][number];

const frameworkNames = new Set([
  "NextJS",
  "React",
  "Angular",
  "Vue",
  "TailwindCSS",
  "Spring Boot",
  "Express",
  "NestJS",
  "FastAPI",
  "Flask",
  "Django",
  "Laravel",
  "Rails",
]);

const toolNames = new Set([
  "NodeJS",
  "Supabase",
  "Docker",
  "Git",
  "Jenkins",
  "Kubernetes",
  "ServiceNow",
  "PostgreSQL",
  "Jupyter Notebook",
  "Linux",
  "Bash",
  "Markdown",
  "Arduino",
]);

const languageAliases: Record<string, string> = {
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Python: "Python",
  Java: "Java",
  C: "C",
  "C++": "C++",
  "C#": "C#",
  Go: "Go",
  Rust: "Rust",
  PHP: "PHP",
  Ruby: "Ruby",
  Swift: "Swift",
  Kotlin: "Kotlin",
  Dart: "Dart",
  Shell: "Shell",
  HTML: "HTML",
  CSS: "CSS",
  SQL: "SQL",
};

async function fetchGithubRepositories(): Promise<GithubRepository[]> {
  const response = await octokit.repos.listForUser({
    username: "lorenzopalaia",
    per_page: 100,
  });

  return response.data.filter(
    (repo) =>
      !repo.fork ||
      includedForkRepos.includes(
        repo.name as (typeof includedForkRepos)[number],
      ),
  );
}

async function fetchRepositoryLanguages(
  owner: string,
  repository: string,
): Promise<string[]> {
  const response = await octokit.repos.listLanguages({
    owner,
    repo: repository,
  });

  return Object.keys(response.data);
}

function normalizeStack(
  languages: string[],
  repositoryName: string,
): Pick<PortfolioProject, "languages" | "frameworks" | "tools"> {
  let normalized = [...languages];

  const additional = additionalProjectsLanguages[repositoryName];

  if (additional) {
    normalized = [...normalized, ...additional];
  }

  if (
    normalized.includes("Jupyter Notebook") &&
    !normalized.includes("Python")
  ) {
    normalized.push("Python");
  }

  if (normalized.includes("TypeScript") && normalized.includes("JavaScript")) {
    normalized = normalized.filter((technology) => technology !== "JavaScript");
  }

  if (
    normalized.some(
      (technology) => technology.toLowerCase() === "tailwindcss",
    ) ||
    repositoryName.toLowerCase().includes("tailwind")
  ) {
    normalized.push("TailwindCSS");
  }

  if (normalized.includes("TailwindCSS") && normalized.includes("CSS")) {
    normalized = normalized.filter((technology) => technology !== "CSS");
  }

  normalized = Array.from(new Set(normalized));

  const classified = normalized.map((technology) => {
    if (languageAliases[technology]) {
      return {
        name: languageAliases[technology],
        type: "language" as const,
      };
    }

    if (frameworkNames.has(technology)) {
      return {
        name: technology,
        type: "framework" as const,
      };
    }

    return {
      name: technology,
      type: "tool" as const,
    };
  });

  return {
    languages: Array.from(
      new Set(
        classified
          .filter((entry) => entry.type === "language")
          .map((entry) => entry.name),
      ),
    ),

    frameworks: Array.from(
      new Set(
        classified
          .filter((entry) => entry.type === "framework")
          .map((entry) => entry.name),
      ),
    ),

    tools: Array.from(
      new Set(
        classified
          .filter((entry) => entry.type === "tool")
          .map((entry) => entry.name),
      ),
    ),
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPresentation(name: string) {
  const presentation = projectPresentation[name];

  return {
    slug: presentation?.slug ?? slugify(name),

    category: presentation?.category ?? "Repository",

    summary:
      presentation?.summary ??
      "A public software project maintained on GitHub.",

    accent: presentation?.accent,
  };
}

function buildGithubProject(
  repository: GithubRepository,
  languages: string[],
): PortfolioProject {
  const presentation = getPresentation(repository.name);

  const stack = normalizeStack(languages, repository.name);

  return {
    slug: presentation.slug,
    name: repository.name,

    description: repository.description ?? "No public description supplied.",

    summary: presentation.summary,

    category: presentation.category,

    ...stack,

    repository: repository.html_url,

    live: repository.homepage || undefined,

    image: `https://raw.githubusercontent.com/lorenzopalaia/${repository.name}/main/repo_assets/preview.png`,

    stars: repository.stargazers_count ?? 0,

    forks: repository.forks_count ?? 0,

    npmPackage: npmProjects[repository.name],

    updatedAt:
      repository.updated_at ??
      repository.created_at ??
      new Date(0).toISOString(),

    source: "github",

    isFork: repository.fork,
  };
}

function buildLocalProject(project: LocalProject): PortfolioProject {
  const presentation = getPresentation(project.name);

  const stack = normalizeStack(project.languages, project.name);

  return {
    slug: presentation.slug,

    name: project.name,

    description: project.description,

    summary: presentation.summary ?? project.description,

    category: presentation.category ?? "Project",

    ...stack,

    repository: project.repository,

    live: project.live,

    image: project.image,

    stars: 0,
    forks: 0,

    npmPackage: npmProjects[project.name],

    updatedAt: project.updatedAt ?? "1970-01-01T00:00:00Z",

    source: "local",

    isFork: false,
  };
}

async function buildPortfolioProjects(): Promise<PortfolioProject[]> {
  const repositories = await fetchGithubRepositories();

  const githubProjects = await Promise.all(
    repositories.map(async (repository) => {
      const languages = await fetchRepositoryLanguages(
        repository.owner.login,
        repository.name,
      );

      return buildGithubProject(repository, languages);
    }),
  );

  const githubNames = new Set(githubProjects.map((project) => project.name));

  const localOnlyProjects = localProjects
    .filter((project) => !githubNames.has(project.name))
    .map(buildLocalProject);

  return [...githubProjects, ...localOnlyProjects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

const getCachedPortfolioProjects = unstable_cache(
  buildPortfolioProjects,
  ["portfolio-projects-v2"],
  {
    revalidate: 3600,
  },
);

export async function getPortfolioProjects() {
  return getCachedPortfolioProjects();
}

export async function getPortfolioProject(slug: string) {
  const projects = await getPortfolioProjects();

  return projects.find((project) => project.slug === slug);
}
