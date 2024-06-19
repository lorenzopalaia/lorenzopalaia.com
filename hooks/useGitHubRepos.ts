import { useState, useEffect } from "react";
import config from "@/config"; // Importa l'oggetto config da "@/config"

const useGithubRepos = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/githubRepos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Concatena i nuovi repositori all'array presente in config.projects
        const updatedRepos = [...data, ...config.projects];

        setRepos(updatedRepos);
        setIsLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      }
    };

    fetchData();
  }, []);

  return { repos, isLoading };
};

export default useGithubRepos;
