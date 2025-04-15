import { useState, useEffect } from "react";

interface UseGithubStarsProps {
  owner: string;
  repo: string;
  initialData?: number; // For SSR
  skipFetch?: boolean; // New property to skip the fetch
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
    // If skipFetch is true, do not perform the fetch
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
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setStars(data.stars);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error(`Error loading stars for ${owner}/${repo}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStars();
  }, [owner, repo, skipFetch]);

  return { stars, isLoading, error };
}
