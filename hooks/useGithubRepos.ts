import { useState, useEffect } from "react";
import { config } from "@/config";

function processLanguages(languages: string[], repoName: string): string[] {
  let processedLanguages = [...languages];

  // * Check if the repository has additional languages in the config file
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/github-repos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // * Concatenate the new repositories to the array from the config file
        const updatedRepos = [...data, ...config.projects];

        // * Process the languages
        const processedRepos = updatedRepos.map((repo) => ({
          ...repo,
          languages: processLanguages(repo.languages, repo.name),
        }));

        setRepos(processedRepos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { repos, isLoading };
}
