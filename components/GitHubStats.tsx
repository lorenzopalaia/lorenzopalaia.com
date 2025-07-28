"use client";

import { useGitHubUser } from "@/hooks/useGitHubUser";
import { Users, UserPlus, Folder } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function GitHubStats() {
  const { userData, isLoading, error } = useGitHubUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <Users className="text-muted-foreground size-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-1.5">
          <UserPlus className="text-muted-foreground size-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-1.5">
          <Folder className="text-muted-foreground size-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return null;
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1.5">
        <Users className="text-muted-foreground size-4" />
        <span className="text-sm font-medium">
          {userData.followers} followers
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <UserPlus className="text-muted-foreground size-4" />
        <span className="text-sm font-medium">
          {userData.following} following
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Folder className="text-muted-foreground size-4" />
        <span className="text-sm font-medium">
          {userData.publicRepos} repos
        </span>
      </div>
    </div>
  );
}
