"use client";

import { useQuery } from "@tanstack/react-query";

import { getNpmDownloads } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export function useNpmDownloads(packageName: string | null) {
  return useQuery({
    queryKey: queryKeys.npmDownloads(packageName),
    queryFn: () => {
      if (!packageName) {
        throw new Error("NPM package name is required");
      }

      return getNpmDownloads(packageName);
    },
    enabled: Boolean(packageName),
  });
}
