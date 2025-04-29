import { create } from "zustand";

type PostReaction = {
  likes: number;
  dislikes: number;
  userAction: "like" | "dislike" | null;
};

interface LikeDislikeStore {
  reactions: Record<string, PostReaction>;
  pendingSync: Record<string, PostReaction>;
  setReaction: (postId: string, reaction: PostReaction) => void;
  queueSync: (postId: string, reaction: PostReaction) => void;
  syncWithServer: (postId: string) => Promise<void>;
}

export const useLikeDislikeStore = create<LikeDislikeStore>((set, get) => ({
  reactions: {},
  pendingSync: {},
  setReaction: (postId, reaction) =>
    set((state) => ({
      reactions: { ...state.reactions, [postId]: reaction },
    })),
  queueSync: (postId, reaction) =>
    set((state) => ({
      pendingSync: { ...state.pendingSync, [postId]: reaction },
    })),
  syncWithServer: async (postId) => {
    const { pendingSync, reactions } = get();
    const data = pendingSync[postId];

    if (!data) return;

    try {
      const response = await fetch("/api/like-dislike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          action: data.userAction,
          previousAction: reactions[postId]?.userAction || null,
        }),
      });

      if (response.ok) {
        set((state) => {
          const { [postId]: _, ...rest } = state.pendingSync;
          return { pendingSync: rest };
        });
      }
    } catch (error) {
      console.error("Sync failed:", error);
    }
  },
}));
