import { useState, useEffect } from "react";

interface UseContributedReposProps {
  id: number; // The ID of the repository
  initialData?: number; // For SSR
  skipFetch?: boolean; // New property to skip the fetch
}

interface UseContributedReposResult {
  username: string | null;
  repoName: string | null;
  stars: number | null;
  isLoading: boolean;
  error: Error | null;
}

export function useContributedRepos({
  id,
  skipFetch = false,
}: UseContributedReposProps): UseContributedReposResult {
  const [username, setUsername] = useState<string | null>(null);
  const [repoName, setRepoName] = useState<string | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skipFetch);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If skipFetch is true, do not perform the fetch
    if (skipFetch) {
      setIsLoading(false);
      return;
    }

    const fetchRepo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/contributed-repos?id=${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setUsername(data.username);
        setRepoName(data.repoName);
        setStars(data.stars);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error(`Error loading stars for ${id}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepo();
  }, [id, skipFetch]);

  return { username, repoName, stars, isLoading, error };
}
