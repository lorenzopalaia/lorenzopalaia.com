import { useState, useEffect } from "react";

export default function useLikeDislike(postId: string) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState<string | null>(null);

  useEffect(() => {
    const storedAction = localStorage.getItem(`likeStatus-${postId}`);
    if (storedAction) setUserAction(storedAction);

    fetch(`/api/like-dislike?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      })
      .catch((error) => console.error("Error fetching likes:", error));

    const syncState = (event: StorageEvent) => {
      if (event.key === `likeStatus-${postId}`) {
        setUserAction(event.newValue);
        fetch(`/api/like-dislike?postId=${postId}`)
          .then((res) => res.json())
          .then((data) => {
            setLikes(data.likes);
            setDislikes(data.dislikes);
          });
      }
    };

    window.addEventListener("storage", syncState);
    return () => window.removeEventListener("storage", syncState);
  }, [postId]);

  const handleVote = async (action: "like" | "dislike") => {
    const previousAction = userAction;
    let newAction: string | null = action;

    if (previousAction === action) {
      newAction = null;
    }

    const res = await fetch("/api/like-dislike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, action: newAction, previousAction }),
    });

    const data = await res.json();
    setLikes(data.likes);
    setDislikes(data.dislikes);
    setUserAction(newAction);

    if (newAction) {
      localStorage.setItem(`likeStatus-${postId}`, newAction);
    } else {
      localStorage.removeItem(`likeStatus-${postId}`);
    }

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: `likeStatus-${postId}`,
        newValue: newAction,
      }),
    );
  };

  return { likes, dislikes, userAction, handleVote };
}
