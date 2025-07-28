"use client";

import { useState, useEffect } from "react";

interface GitHubUserData {
  followers: number;
  following: number;
  publicRepos: number;
  name: string;
  bio: string;
  location: string;
  company: string;
}

interface UseGitHubUserResult {
  userData: GitHubUserData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useGitHubUser(): UseGitHubUserResult {
  const [userData, setUserData] = useState<GitHubUserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/github-user");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Error fetching GitHub user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, isLoading, error };
}
