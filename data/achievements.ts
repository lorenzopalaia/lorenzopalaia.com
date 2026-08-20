export const achievementCatalog = [
  {
    id: "linkedin",
    title: "LinkedIn",
    points: 10,
  },
  {
    id: "resume",
    title: "Resume",
    points: 15,
  },
  {
    id: "socials",
    title: "Socials",
    points: 15,
  },
  {
    id: "thesis-paper",
    title: "Thesis Paper",
    points: 15,
  },
  {
    id: "blog-post",
    title: "Blog Post",
    points: 15,
  },
  {
    id: "post-like",
    title: "Post Like",
    points: 15,
  },
  {
    id: "theme",
    title: "Theme Switch",
    points: 5,
  },
  {
    id: "contact",
    title: "Contact",
    points: 30,
  },
  {
    id: "lead",
    title: "Blog Subscription",
    points: 30,
  },
] as const;

export type AchievementId = (typeof achievementCatalog)[number]["id"];
