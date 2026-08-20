type ProjectSource = "github" | "local";

export type ProjectPresentation = {
  slug?: string;
  category?: string;
  summary?: string;
  accent?: string;
};

export type LocalProject = {
  name: string;
  description: string;
  languages: string[];
  repository?: string;
  live?: string;
  image?: string;
  updatedAt?: string;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  description: string;
  summary: string;
  category: string;

  languages: string[];
  frameworks: string[];
  tools: string[];

  repository?: string;
  live?: string;
  image?: string;

  stars: number;
  forks: number;

  npmPackage?: string;

  updatedAt: string;

  source: ProjectSource;
  isFork: boolean;
};

export const featuredProjectNames = [
  "HackTrack-EU",
  "Blocktracr",
  "Neural-Style-Transfer-and-Genre-Classification",
  "Arduino-Oscilloscope",
] as const;

export const additionalProjectsLanguages: Record<string, string[]> = {
  Blocktracr: ["NextJS", "TailwindCSS", "React", "Supabase"],

  "lorenzopalaia.com": ["NextJS", "TailwindCSS", "React"],

  MediaShift: ["NextJS", "TailwindCSS", "React"],

  TurboClone: ["NextJS", "TailwindCSS", "React"],

  StackHound: ["NextJS", "TailwindCSS", "React"],

  "HackTrack-EU": ["NextJS", "TailwindCSS", "React", "Supabase", "Markdown"],
};

export const npmProjects: Record<string, string> = {
  "Tailwind-Animations": "@lorenzopalaia/tailwind-animations",

  "Tailwind-Hero-Patterns": "@lorenzopalaia/tailwind-hero-patterns",
};

export const includedForkRepos = ["Randstad-AI-Hackathon"] as const;

export const localProjects: LocalProject[] = [
  {
    name: "Linktree",
    description: "Personal linktree for socials.",
    languages: ["NextJS", "React", "TypeScript", "TailwindCSS", "Supabase"],
    updatedAt: "2024-10-07T00:00:00Z",
  },

  {
    name: "SitePulse",
    description: "Website monitoring tool for developers.",
    languages: ["NextJS", "React", "TypeScript", "TailwindCSS", "Supabase"],
    updatedAt: "2024-10-01T00:00:00Z",
  },

  {
    name: "Alfa Impianti S.r.l.",
    description: "Developed a corporate website for Alfa Impianti S.r.l.",
    languages: ["JavaScript", "HTML", "CSS"],
    live: "https://www.alfa-impiantiservice.it/",
    updatedAt: "2020-10-01T00:00:00Z",
  },
];

export const projectPresentation: Record<string, ProjectPresentation> = {
  "HackTrack-EU": {
    slug: "hacktrack-eu",
    category: "Platform",
    summary:
      "A focused product for discovering European hackathons through a maintained, browsable platform.",
    accent: "#F05A24",
  },

  MediaShift: {
    slug: "mediashift",
    category: "Utility",
    summary:
      "A direct utility for moving between media formats without the usual friction, limits, or advertising layer.",
    accent: "#E76F51",
  },

  StackHound: {
    slug: "stackhound",
    category: "Developer tool",
    summary:
      "A compact way to turn a repository into an immediate technical stack readout.",
    accent: "#CF4A1A",
  },

  TurboClone: {
    slug: "turboclone",
    category: "Workflow",
    summary:
      "A deliberately small workflow tool for removing friction from a familiar development task.",
    accent: "#FF7A45",
  },
};
