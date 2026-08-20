export type ActivityRecord = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  period: string;
  items: string[];
  href?: string;
  image: string;
  repositoryId?: number;
  links?: {
    title: string;
    href: string;
  }[];
};

export const activities: ActivityRecord[] = [
  {
    title: "Reply AI Music Contest",
    company: "Reply",
    startDate: "Apr 2025",
    endDate: "Jun 2025",
    period: "Apr 2025 — Jun 2025",
    items: [
      "Led the development of an AI-enhanced music and visual product in a team of 5, orchestrating workflow, timeline, and project management",
      "Set up Stable Audio Open with custom fine-tuning on electronic music for generating audio elements with accurate prompts",
      "Achieved semifinalist status among over 300 submissions",
    ],
    href: "https://challenges.reply.com/challenges/creative/ai-music-contest/home/",
    image: "/assets/images/reply.webp",
  },
  {
    title: "Open Source Contribution",
    company: "Tailark",
    startDate: "Mar 2025",
    endDate: "Apr 2025",
    period: "Mar 2025 — Apr 2025",
    items: [
      "Introduced two new blocks to enhance user experience and design consistency",
    ],
    image: "/assets/images/tailark.webp",
    repositoryId: 933694551,
  },
  {
    title: "Open Source Contribution",
    company: "Plane",
    startDate: "Mar 2025",
    endDate: "Apr 2025",
    period: "Mar 2025 — Apr 2025",
    items: [
      "Enhanced the authentication flow UI to improve clarity and user experience in environments with restricted access",
    ],
    image: "/assets/images/plane.webp",
    repositoryId: 568098118,
  },
  {
    title: "Open Source Contribution",
    company: "JSON Crack",
    startDate: "Mar 2025",
    endDate: "Apr 2025",
    period: "Mar 2025 — Apr 2025",
    items: ["Fixed UI issues and improved accessibility"],
    image: "/assets/images/jsoncrack.webp",
    repositoryId: 453717720,
  },
  {
    title: "Open Source Contribution",
    company: "Filepizza",
    startDate: "Mar 2025",
    endDate: "Apr 2025",
    period: "Mar 2025 — Apr 2025",
    items: [
      "Implemented multi-file selection functionality with sequential upload process, significantly enhancing user experience and workflow",
    ],
    image: "/assets/images/filepizza.webp",
    repositoryId: 31341340,
  },
  {
    title: "Open Source Contribution",
    company: "tweakcn",
    startDate: "",
    endDate: "Mar 2025",
    period: "— Mar 2025",
    items: [
      "Implemented a contrast accessibility checker with an optimized debounce mechanism to improve performance",
    ],
    image: "/assets/images/tweakcn.webp",
    repositoryId: 948174507,
  },
  {
    title: "Open Source Contribution",
    company: "Origin UI",
    startDate: "",
    endDate: "Mar 2025",
    period: "— Mar 2025",
    items: ["Refactored code to improve consistency and readability"],
    image: "/assets/images/origin-ui.webp",
    repositoryId: 872925629,
  },
  {
    title: "Open Source Contribution",
    company: "Maybe Finance",
    startDate: "Jan 2024",
    endDate: "Feb 2024",
    period: "Jan 2024 — Feb 2024",
    items: [
      "Removed 22,000+ lines of legacy code to improve maintainability",
      "Identified and reported multiple UI issues including file download problems and behavior bugs",
    ],
    image: "/assets/images/maybe.webp",
    repositoryId: 737898780,
  },
  {
    title: "<Code.Your.Future> AI Hackathon",
    company: "Randstad",
    startDate: "",
    endDate: "Mar 2023",
    period: "— Mar 2023",
    items: [
      "Guided the development of a job description classification neural network in a team of 5 using TensorFlow within 4 hours",
      "Secured 2nd place, achieving an F1 score of 75% while experimenting with Bag of Words and Word2Vec approaches",
    ],
    href: "https://www.randstad.it/",
    image: "/assets/images/randstad.webp",
    links: [
      {
        title: "Submission",
        href: "https://github.com/lorenzopalaia/Randstad-AI-Hackathon",
      },
    ],
  },
  {
    title: "Computer Vision Software Engineer",
    company: "Sapienza Flight Team",
    startDate: "Sep 2021",
    endDate: "Oct 2022",
    period: "Sep 2021 — Oct 2022",
    items: [
      "Developed object detection and terrain mapping systems for a UAV, training YOLOv5/EfficientNet models with custom datasets",
      "Designed and implemented communication protocols between UAV and Ground Station from scratch, developing a Flask-based API and revamping the GUI",
      "Collaborated in a subteam of 5 within a 60-member team earning a 15th position out of 71 entries for the Technical Design Paper",
    ],
    href: "https://www.sasa-aerospace.it/flight-team/",
    image: "/assets/images/flight-team.webp",
  },
];
