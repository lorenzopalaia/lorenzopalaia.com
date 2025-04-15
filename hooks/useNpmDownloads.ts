import { useState, useEffect } from "react";

interface UseNpmDownloadsProps {
  packageName: string | null;
}

interface UseNpmDownloadsResult {
  downloads: number | null;
  isLoading: boolean;
  error: Error | null;
}

export function useNpmDownloads({
  packageName,
}: UseNpmDownloadsProps): UseNpmDownloadsResult {
  const [downloads, setDownloads] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(!!packageName);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!packageName) {
      setIsLoading(false);
      setDownloads(null);
      return;
    }

    const fetchDownloads = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/npm-downloads?package=${encodeURIComponent(packageName)}`,
        );

        if (!response.ok) {
          if (response.status === 404) {
            setDownloads(0);
            setError(null);
          } else {
            throw new Error(
              `HTTP Error: ${response.status} ${response.statusText}`,
            );
          }
        } else {
          const data = await response.json();
          setDownloads(data.downloads);
          setError(null);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error fetching downloads"),
        );
        console.error(`Error loading downloads for ${packageName}:`, err);
        setDownloads(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloads();
  }, [packageName]);

  return { downloads, isLoading, error };
}
