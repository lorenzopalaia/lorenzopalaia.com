"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getReactions, submitReaction } from "@/lib/api";

import { queryKeys } from "@/lib/queryKeys";

export function useReactions(postId: string) {
  return useQuery({
    queryKey: queryKeys.reactions(postId),
    queryFn: () => getReactions(postId),
  });
}

export function useSubmitReaction(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      action: "like" | "dislike" | "none";
      previousAction: "like" | "dislike" | "none";
    }) =>
      submitReaction({
        postId,
        ...input,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reactions(postId),
      });
    },
  });
}
