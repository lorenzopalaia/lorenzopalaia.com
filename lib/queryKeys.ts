export const queryKeys = {
  githubUser: ["github-user"] as const,

  githubRepos: ["github-repos"] as const,

  npmDownloads: (packageName: string) =>
    ["npm-downloads", packageName] as const,

  reactions: (postId: string) => ["reactions", postId] as const,
};
