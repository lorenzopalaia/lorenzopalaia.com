import { useEffect } from "react";
import { useLikeDislikeStore } from "@/store/likeDislikeStore";

type PostReaction = {
  likes: number;
  dislikes: number;
  userAction: "like" | "dislike" | null;
};

const calculateNewCounts = (
  current: PostReaction,
  newAction: "like" | "dislike" | null,
): PostReaction => {
  let { likes, dislikes } = current;

  if (current.userAction === "like") likes--;
  if (current.userAction === "dislike") dislikes--;

  if (newAction === "like") likes++;
  if (newAction === "dislike") dislikes++;

  return { likes, dislikes, userAction: newAction };
};

export default function useLikeDislike(postId: string) {
  const { reactions, pendingSync, setReaction, queueSync, syncWithServer } =
    useLikeDislikeStore();
  const localData = reactions[postId] || {
    likes: 0,
    dislikes: 0,
    userAction: null,
  };
  const pendingData = pendingSync[postId];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`/api/like-dislike?postId=${postId}`);
        const data = await response.json();
        setReaction(postId, {
          likes: data.likes,
          dislikes: data.dislikes,
          userAction: data.userAction,
        });
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    if (!reactions[postId]) {
      fetchInitialData();
    }
  }, [postId, setReaction, reactions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pendingSync[postId]) {
        syncWithServer(postId);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [postId, pendingSync, syncWithServer]);

  const handleVote = (action: "like" | "dislike") => {
    const currentAction = localData.userAction;
    const newAction = currentAction === action ? null : action;

    const updatedData = calculateNewCounts(localData, newAction);
    setReaction(postId, updatedData);
    queueSync(postId, updatedData);
  };

  return {
    likes: pendingData?.likes || localData.likes,
    dislikes: pendingData?.dislikes || localData.dislikes,
    userAction: localData.userAction,
    handleVote,
  };
}
