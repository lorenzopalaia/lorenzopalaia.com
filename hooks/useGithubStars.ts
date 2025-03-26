import { useState, useEffect } from "react";

interface UseGithubStarsProps {
  owner: string;
  repo: string;
  initialData?: number; // Per l'SSR
  skipFetch?: boolean; // Nuova proprietà per saltare la fetch
}

interface UseGithubStarsResult {
  stars: number | null;
  isLoading: boolean;
  error: Error | null;
}

export function useGithubStars({
  owner,
  repo,
  skipFetch = false,
}: UseGithubStarsProps): UseGithubStarsResult {
  const [stars, setStars] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skipFetch);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Se skipFetch è true, non eseguiamo la fetch
    if (skipFetch) {
      setIsLoading(false);
      return;
    }

    const fetchStars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/github-stars?owner=${owner}&repo=${repo}`,
        );

        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();
        setStars(data.stars);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Errore sconosciuto"));
        console.error(
          `Errore nel caricamento delle stelle per ${owner}/${repo}:`,
          err,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStars();
  }, [owner, repo, skipFetch]);

  return { stars, isLoading, error };
}
