"use client";

import { Skeleton } from "@/components/ui/skeleton";

import useWakatime from "@/hooks/useWakatime";

export default function Wakatime() {
  const { wakatime, isLoading } = useWakatime();

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <p className="">
          Time coded this week:{" "}
          {wakatime.data.human_readable_total_including_other_language}
        </p>
      )}
    </>
  );
}
