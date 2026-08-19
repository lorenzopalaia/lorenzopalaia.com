"use client";

import { useQuery } from "@tanstack/react-query";

import { getGithubUser, getGithubRepos } from "@/lib/api";

import { queryKeys } from "@/lib/queryKeys";

export function useGithubUser() {
  return useQuery({
    queryKey: queryKeys.githubUser,
    queryFn: getGithubUser,
  });
}

export function useGithubRepos() {
  return useQuery({
    queryKey: queryKeys.githubRepos,
    queryFn: getGithubRepos,
  });
}
