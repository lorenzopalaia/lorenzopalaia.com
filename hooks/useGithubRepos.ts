import { useState, useEffect } from "react";
import { config } from "@/config";

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

        // * Concatenate the new repositories to the array present in config.projects
        const updatedRepos = [...data, ...config.projects];

        setRepos(updatedRepos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { repos, isLoading };
}
