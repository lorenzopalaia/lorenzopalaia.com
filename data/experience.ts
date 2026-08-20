type ExperiencePosition = {
  title: string;
  client?: string;
  startDate: string;
  endDate: string;
  detail: string;
  items: string[];
};

export type ExperienceCompany = {
  company: string;
  href?: string;
  image: string;
  positions: ExperiencePosition[];
  links?: {
    title: string;
    href: string;
  }[];
};

export const workExperience: ExperienceCompany[] = [
  {
    company: "Reply",
    href: "https://www.reply.com/",
    image: "/assets/images/reply.webp",
    positions: [
      {
        title: "Technical Lead",
        client: "Enel",
        startDate: "Jan 2026",
        endDate: "Present",
        detail:
          "Planning development work, coordinating delivery and working on AI agents connected to internal knowledge bases.",
        items: [
          "Analyzed client requests, estimated developments, planned sprints, and coordinated a team of developers to deliver high-quality features within established deadlines",
          "Handled production releases to ensure smooth deployments and minimal downtime for critical applications",
          "Developed AI agents integrated with company knowledge base to streamline access to internal documents",
        ],
      },
      {
        title: "Technical Lead / Support Engineer",
        client: "Nexi",
        startDate: "Oct 2025",
        endDate: "Jun 2026",
        detail:
          "Supporting payment and authentication systems, with a practical focus on incident resolution and reliability.",
        items: [
          "Managed and closed 100+ incidents per month, implementing fixes for payment processing systems and authentication workflows",
        ],
      },
      {
        title: "Fullstack Developer",
        client: "Enel",
        startDate: "Sep 2025",
        endDate: "Dec 2025",
        detail:
          "Building enterprise applications across Angular frontends and backend-for-frontend systems orchestrated with Apache Camel and Kafka.",
        items: [
          "Developed enterprise applications for company management systems, implementing Angular frontend and a scalable backend leveraging a Backend-for-Frontend (BFF) pattern, orchestrated via Apache Camel and Kafka",
          "Resolved critical frontend-backend integration issues, achieving 95%+ task completion rate while maintaining code quality standards",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    href: "https://github.com/lorenzopalaia",
    image: "/assets/images/github.webp",
    positions: [
      {
        title: "Software Developer",
        startDate: "2019",
        endDate: "Present",
        detail:
          "Designing and maintaining websites, bots, trackers and digital tools for private and corporate clients.",
        items: [
          "Engineered websites and applications for over 5 private and corporate clients, delivering solutions including landing pages, bots and trackers",
          "Collaborated with clients to analyze requirements, propose innovative ideas, document solutions and maintain software post-release",
        ],
      },
    ],
    links: [
      {
        title: "GitHub",
        href: "https://github.com/lorenzopalaia",
      },
    ],
  },
];

export const experienceTimeline = workExperience.flatMap((company) =>
  company.positions.map((position) => ({
    company: company.company,
    role: position.title,
    client: position.client ?? "Independent",
    period: `${position.startDate} — ${position.endDate}`,
    detail: position.detail,
  })),
);
