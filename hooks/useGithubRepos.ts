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
  const [error, setError] = useState<Error | null>(null); // Aggiungi stato per l'errore

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Resetta l'errore all'inizio
      try {
        const response = await fetch("/api/github-repos");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );
        }
        const data = await response.json();

        // * Concatenate the new repositories to the array from the config file
        const updatedRepos = [...data, ...config.projects];

        // * Process the languages and add npm package name
        const processedRepos = updatedRepos.map((repo) => {
          const repoName = repo.name;
          // Cerca il nome del pacchetto npm nella configurazione
          const npmPackageName =
            config.npmProjects[repoName as keyof typeof config.npmProjects] ||
            null;

          return {
            ...repo,
            languages: processLanguages(repo.languages, repoName),
            npm_package_name: npmPackageName, // Aggiungi il nome del pacchetto npm
          };
        });

        setRepos(processedRepos);
      } catch (fetchError) {
        console.error("Error fetching GitHub repos data:", fetchError);
        setError(
          fetchError instanceof Error
            ? fetchError
            : new Error("Errore sconosciuto nel fetch dei repo"),
        );
        setRepos(
          [...config.projects].map((repo) => ({
            // Fallback ai soli progetti locali in caso di errore
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
  }, []); // L'effetto viene eseguito solo al mount

  // Restituisci anche lo stato di errore
  return { repos, isLoading, error };
}
