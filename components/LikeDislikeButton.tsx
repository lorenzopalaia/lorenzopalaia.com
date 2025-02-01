"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useAchievementsContext } from "@/contexts/AchievementsContext";
import useLikeDislike from "@/hooks/useLikeDislike";

interface LikeDislikeButtonProps {
  postId: string;
  className?: string;
}

export default function LikeDislikeButton({
  postId,
  className,
}: LikeDislikeButtonProps) {
  const { likes, dislikes, userAction, handleVote } = useLikeDislike(postId);
  const { unlockAchievement } = useAchievementsContext();

  return (
    <ToggleGroup
      type="single"
      value={userAction || undefined}
      className={`${className}`}
    >
      <ToggleGroupItem
        onClick={() => {
          handleVote("like");
          unlockAchievement("post-like");
        }}
        value="like"
        aria-label="Like"
        className="group flex cursor-pointer items-center gap-2 font-bold"
      >
        <ThumbsUp
          fill={userAction === "like" ? "green" : "none"}
          className="group-hover:fill-green-500"
        />
        {likes}
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => handleVote("dislike")}
        value="dislike"
        aria-label="Dislike"
        className="group flex cursor-pointer items-center gap-2 font-bold"
      >
        <ThumbsDown
          fill={userAction === "dislike" ? "red" : "none"}
          className="group-hover:fill-red-500"
        />
        {dislikes}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
