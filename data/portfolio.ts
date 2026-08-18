/**
 * Quiet Systems style reminder: verified engineering content is presented through
 * editorial scenes; data stays separate from visual choreography.
 */

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  description: string;
  summary: string;
  technologies: string[];
  repository: string;
  live: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "hacktrack-eu",
    index: "01",
    name: "HackTrack EU",
    category: "Platform",
    description:
      "An up-to-date platform listing all the hackathons happening across Europe.",
    summary:
      "A focused product for discovering European hackathons through a maintained, browsable platform.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
    repository: "https://github.com/lorenzopalaia/HackTrack-EU",
    live: "https://hacktrack-eu.vercel.app",
    accent: "#F05A24",
  },
  {
    slug: "mediashift",
    index: "02",
    name: "MediaShift",
    category: "Utility",
    description:
      "Free, self-hosted, no-limits, no-ads file conversion service.",
    summary:
      "A direct utility for moving between media formats without the usual friction, limits, or advertising layer.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/lorenzopalaia/MediaShift",
    live: "https://mediashift.lorenzopalaia.com",
    accent: "#E76F51",
  },
  {
    slug: "stackhound",
    index: "03",
    name: "StackHound",
    category: "Developer tool",
    description:
      "Analyze GitHub repositories to quickly identify the programming languages, frameworks, and tools used in their tech stack.",
    summary:
      "A compact way to turn a repository into an immediate technical stack readout.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/lorenzopalaia/StackHound",
    live: "https://stackhound.vercel.app",
    accent: "#CF4A1A",
  },
  {
    slug: "turboclone",
    index: "04",
    name: "TurboClone",
    category: "Workflow",
    description: "Instantly clone GitHub repositories.",
    summary:
      "A deliberately small workflow tool for removing friction from a familiar development task.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/lorenzopalaia/TurboClone",
    live: "https://turboclone.lorenzopalaia.com",
    accent: "#FF7A45",
  },
];

export const experience = [
  {
    period: "2026 — now",
    company: "Reply",
    role: "Technical Lead",
    client: "Enel",
    detail:
      "Planning development work, coordinating delivery and working on AI agents connected to internal knowledge bases.",
  },
  {
    period: "2025 — 2026",
    company: "Reply",
    role: "Technical Lead / Support Engineer",
    client: "Nexi",
    detail:
      "Supporting payment and authentication systems, with a practical focus on incident resolution and reliability.",
  },
  {
    period: "2025",
    company: "Reply",
    role: "Fullstack Developer",
    client: "Enel",
    detail:
      "Building enterprise applications across Angular frontends and backend-for-frontend systems orchestrated with Apache Camel and Kafka.",
  },
  {
    period: "2019 — now",
    company: "Independent",
    role: "Software Developer",
    client: "Freelance",
    detail:
      "Designing and maintaining websites, bots, trackers and digital tools for private and corporate clients.",
  },
  {
    period: "2021 — 2022",
    company: "Sapienza Flight Team",
    role: "Computer Vision Software Engineer",
    client: "Research team",
    detail:
      "Developing object detection, terrain mapping and UAV-to-ground-station communication systems.",
  },
];

export const labItems = [
  {
    code: "01",
    title: "Open source",
    detail:
      "Contributions to Tailark, Plane, JSON Crack, Filepizza, tweakcn, Origin UI and Maybe Finance.",
  },
  {
    code: "02",
    title: "AI music",
    detail:
      "A Reply AI Music Contest project, built collaboratively around generated audio and visual workflows.",
  },
  {
    code: "03",
    title: "Research by making",
    detail:
      "Experiments around computer vision, neural style transfer, automation and developer tooling.",
  },
];

export type RecordEntry = {
  title: string;
  company: string;
  period: string;
  items: string[];
  href?: string;
  image?: string;
  links?: { title: string; href: string }[];
};

export const recordGroups: {
  id: string;
  label: string;
  entries: RecordEntry[];
}[] = [
  {
    id: "work",
    label: "Work log",
    entries: [
      {
        title: "Technical Lead",
        company: "Reply / Enel",
        period: "Jan 2026 — Present",
        href: "https://www.reply.com/",
        image: "/assets/images/reply.webp",
        items: [
          "Analyzed client requests, estimated developments, planned sprints, and coordinated a team of developers to deliver high-quality features within established deadlines",
          "Handled production releases to ensure smooth deployments and minimal downtime for critical applications",
          "Developed AI agents integrated with company knowledge base to streamline access to internal documents",
        ],
      },
      {
        title: "Technical Lead / Support Engineer",
        company: "Reply / Nexi",
        period: "Oct 2025 — Jun 2026",
        href: "https://www.reply.com/",
        image: "/assets/images/reply.webp",
        items: [
          "Managed and closed 100+ incidents per month, implementing fixes for payment processing systems and authentication workflows",
        ],
      },
      {
        title: "Fullstack Developer",
        company: "Reply / Enel",
        period: "Sep 2025 — Dec 2025",
        href: "https://www.reply.com/",
        image: "/assets/images/reply.webp",
        items: [
          "Developed enterprise applications for company management systems, implementing Angular frontend and a scalable backend leveraging a Backend-for-Frontend pattern, orchestrated via Apache Camel and Kafka",
          "Resolved critical frontend-backend integration issues, achieving 95%+ task completion rate while maintaining code quality standards",
        ],
      },
      {
        title: "Software Developer",
        company: "Freelance",
        period: "2019 — Present",
        href: "https://github.com/lorenzopalaia",
        image: "/assets/images/github.webp",
        links: [{ title: "GitHub", href: "https://github.com/lorenzopalaia" }],
        items: [
          "Engineered websites and applications for over 5 private and corporate clients, delivering solutions including landing pages, bots and trackers",
          "Collaborated with clients to analyze requirements, propose innovative ideas, document solutions and maintain software post-release",
        ],
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    entries: [
      {
        title: "BSc in Computer and Automation Engineering",
        company: "Sapienza University of Rome",
        period: "— Mar 2024",
        href: "https://www.uniroma1.it/it/",
        image: "/assets/images/sapienza.webp",
        links: [
          { title: "Thesis paper", href: "/assets/images/thesis.pdf" },
          {
            title: "Thesis project",
            href: "https://github.com/lorenzopalaia/Neural-Style-Transfer-and-Genre-Classification",
          },
        ],
        items: [
          "Excelled in Operative Systems, Functional Programming, Programming Techniques (4.0 GPA with honors)",
          "Mastered Data Structures & Algorithms, Software Design, Parallel Computing, Electronics, Web Development (4.0 GPA)",
        ],
      },
    ],
  },
  {
    id: "extra",
    label: "Additional activity",
    entries: [
      {
        title: "Reply AI Music Contest",
        company: "Reply",
        period: "Apr 2025 — Jun 2025",
        href: "https://challenges.reply.com/challenges/creative/ai-music-contest/home/",
        image: "/assets/images/reply.webp",
        items: [
          "Led the development of an AI-enhanced music and visual product in a team of 5, orchestrating workflow, timeline, and project management",
          "Set up Stable Audio Open with custom fine-tuning on electronic music for generating audio elements with accurate prompts",
          "Achieved semifinalist status among over 300 submissions",
        ],
      },
      {
        title: "Open Source Contribution",
        company: "Tailark",
        period: "Mar 2025 — Apr 2025",
        image: "/assets/images/tailark.webp",
        items: [
          "Introduced two new blocks to enhance user experience and design consistency",
        ],
      },
      {
        title: "Open Source Contribution",
        company: "Plane",
        period: "Mar 2025 — Apr 2025",
        image: "/assets/images/plane.webp",
        items: [
          "Enhanced the authentication flow UI to improve clarity and user experience in environments with restricted access",
        ],
      },
      {
        title: "Open Source Contribution",
        company: "JSON Crack",
        period: "Mar 2025 — Apr 2025",
        image: "/assets/images/jsoncrack.webp",
        items: ["Fixed UI issues and improved accessibility"],
      },
      {
        title: "Open Source Contribution",
        company: "Filepizza",
        period: "Mar 2025 — Apr 2025",
        image: "/assets/images/filepizza.webp",
        items: [
          "Implemented multi-file selection functionality with sequential upload process, significantly enhancing user experience and workflow",
        ],
      },
      {
        title: "Open Source Contribution",
        company: "tweakcn",
        period: "— Mar 2025",
        image: "/assets/images/tweakcn.webp",
        items: [
          "Implemented a contrast accessibility checker with an optimized debounce mechanism to improve performance",
        ],
      },
      {
        title: "Open Source Contribution",
        company: "Origin UI",
        period: "— Mar 2025",
        image: "/assets/images/origin-ui.webp",
        items: ["Refactored code to improve consistency and readability"],
      },
      {
        title: "Open Source Contribution",
        company: "Maybe Finance",
        period: "Jan 2024 — Feb 2024",
        image: "/assets/images/maybe.webp",
        items: [
          "Removed 22,000+ lines of legacy code to improve maintainability",
          "Identified and reported multiple UI issues including file download problems and behavior bugs",
        ],
      },
      {
        title: "<Code.Your.Future> AI Hackathon",
        company: "Randstad",
        period: "— Mar 2023",
        href: "https://www.randstad.it/",
        image: "/assets/images/randstad.webp",
        links: [
          {
            title: "Submission",
            href: "https://github.com/lorenzopalaia/Randstad-AI-Hackathon",
          },
        ],
        items: [
          "Guided the development of a job description classification neural network in a team of 5 using TensorFlow within 4 hours",
          "Secured 2nd place, achieving an F1 score of 75% while experimenting with Bag of Words and Word2Vec approaches",
        ],
      },
      {
        title: "Computer Vision Software Engineer",
        company: "Sapienza Flight Team",
        period: "Sep 2021 — Oct 2022",
        href: "https://www.sasa-aerospace.it/flight-team/",
        image: "/assets/images/flight-team.webp",
        items: [
          "Developed object detection and terrain mapping systems for a UAV, training YOLOv5/EfficientNet models with custom datasets",
          "Designed and implemented communication protocols between UAV and Ground Station from scratch, developing a Flask-based API and revamping the GUI",
          "Collaborated in a subteam of 5 within a 60-member team earning a 15th position out of 71 entries for the Technical Design Paper",
        ],
      },
    ],
  },
];

export const skills = [
  "NextJS",
  "TypeScript",
  "TailwindCSS",
  "React",
  "Angular",
  "Vue",
  "Docker",
  "Supabase",
  "NodeJS",
  "Git",
  "Python",
  "C",
  "Java",
  "Spring Boot",
  "Jupyter Notebook",
  "HTML",
  "CSS",
  "JavaScript",
  "Linux",
  "Bash",
  "Markdown",
  "Arduino",
  "PostgreSQL",
  "Jenkins",
  "Kubernetes",
  "ServiceNow",
];

export const artifacts = [
  {
    code: "A-01",
    title: "Resume",
    detail: "Current professional resume",
    href: "/assets/resume.pdf",
  },
  {
    code: "A-02",
    title: "Thesis paper",
    detail: "Computer and Automation Engineering thesis",
    href: "/assets/thesis.pdf",
  },
  {
    code: "A-03",
    title: "Thesis project",
    detail: "Neural Style Transfer and Genre Classification",
    href: "https://github.com/lorenzopalaia/Neural-Style-Transfer-and-Genre-Classification",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/lorenzopalaia" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lorenzopalaia/" },
  { label: "X", href: "https://x.com/lorenzopalaia" },
  { label: "Email", href: "mailto:info@lorenzopalaia.com" },
];
