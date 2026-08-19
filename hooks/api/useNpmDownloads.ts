"use client";

import { useQuery } from "@tanstack/react-query";

import { getNpmDownloads } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export function useNpmDownloads(packageName: string) {
  return useQuery({
    queryKey: queryKeys.npmDownloads(packageName),
    queryFn: () => getNpmDownloads(packageName),
  });
}
