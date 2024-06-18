import { useState, useEffect } from "react";

const useGithubRepos = (useCache = true) => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/githubRepos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRepos(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      }
    };

    fetchData();
  }, [useCache]);

  return { repos, isLoading };
};

export default useGithubRepos;
