async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const data = await response.json();

      if (typeof data?.error === "string") {
        message = data.error;
      }
    } catch {
      // Keep default message.
    }

    throw new Error(message);
  }

  return response.json();
}

export type GithubUserResponse = {
  followers: number;
  following: number;
  publicRepos: number;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  stars: number;
  forks: number;
};

export type GithubRepoResponse = {
  html_url: string;
  name: string;
  description: string | null;
  languages: string[];
  stargazers_count: number;
  forks_count: number;
};

export type NpmDownloadsResponse = {
  downloads: number;
  package?: string;
};

export type ReactionResponse = {
  likes: number;
  dislikes: number;
};

export async function getGithubUser() {
  return request<GithubUserResponse>("/api/github-user");
}

export async function getGithubRepos() {
  return request<GithubRepoResponse[]>("/api/github-repos");
}

export async function getNpmDownloads(packageName: string) {
  return request<NpmDownloadsResponse>(
    `/api/npm-downloads?package=${encodeURIComponent(packageName)}`,
  );
}

export async function getReactions(postId: string) {
  return request<ReactionResponse>(
    `/api/reactions?postId=${encodeURIComponent(postId)}`,
  );
}

export async function submitReaction({
  postId,
  action,
  previousAction,
}: {
  postId: string;
  action: "like" | "dislike" | "none";
  previousAction: "like" | "dislike" | "none";
}) {
  return request<ReactionResponse>("/api/reactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      action,
      previousAction,
    }),
  });
}
