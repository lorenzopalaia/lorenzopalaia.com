import { useState, useEffect } from "react";

import { config } from "@/config";

function processLanguages(languages: string[], repoName: string): string[] {
  let processedLanguages = [...languages];

  // * Add languages from the config
  if (repoName in config.additionalProjectsLanguages) {
    processedLanguages = [
      ...new Set([
        ...processedLanguages,
        ...config.additionalProjectsLanguages[
          repoName as keyof typeof config.additionalProjectsLanguages
        ],
      ]),
    ];
  }

  if (languages.includes("Jupyter Notebook") && !languages.includes("Python")) {
    processedLanguages.push("Python");
  }

  if (languages.includes("TypeScript") && languages.includes("JavaScript")) {
    processedLanguages = processedLanguages.filter(
      (language) => language !== "JavaScript",
    );
  }

  if (repoName.toLowerCase().includes("tailwind")) {
    processedLanguages.push("TailwindCSS");
  }

  if (
    processedLanguages.includes("TailwindCSS") &&
    processedLanguages.includes("CSS")
  ) {
    processedLanguages = processedLanguages.filter(
      (language) => language !== "CSS",
    );
  }

  return processedLanguages.length ? processedLanguages : ["Markdown"];
}

export default function useGithubRepos() {
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/github-repos");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );
        }
        const data = await response.json();

        const updatedRepos = [...data, ...config.projects];

        const processedRepos = updatedRepos.map((repo) => {
          const repoName = repo.name;

          const npmPackageName =
            config.npmProjects[repoName as keyof typeof config.npmProjects] ||
            null;

          return {
            ...repo,
            languages: processLanguages(repo.languages, repoName),
            npm_package_name: npmPackageName,
          };
        });

        setRepos(processedRepos);
      } catch (fetchError) {
        console.error("Error fetching GitHub repos data:", fetchError);
        setError(
          fetchError instanceof Error
            ? fetchError
            : new Error("An unknown error occurred"),
        );
        setRepos(
          [...config.projects].map((repo) => ({
            ...repo,
            languages: processLanguages(repo.languages, repo.name),
            npm_package_name:
              config.npmProjects[
                repo.name as keyof typeof config.npmProjects
              ] || null,
          })),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { repos, isLoading, error };
}
