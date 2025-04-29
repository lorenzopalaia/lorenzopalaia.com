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

  const handleClick = (type: "like" | "dislike") => {
    const prevAction = userAction;
    handleVote(type);

    if (type === "like" && prevAction !== "like") {
      unlockAchievement("post-like");
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={userAction || undefined}
      className={className}
    >
      <ToggleGroupItem
        value="like"
        aria-label="Like"
        onClick={() => handleClick("like")}
        className="group flex cursor-pointer items-center gap-2 font-bold"
      >
        <ThumbsUp
          fill={userAction === "like" ? "green" : "none"}
          className="group-hover:fill-green-500"
        />
        {likes}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="dislike"
        aria-label="Dislike"
        onClick={() => handleClick("dislike")}
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
