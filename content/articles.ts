/**
 * Quiet Systems style reminder: real legacy MDX is treated as a versioned archive;
 * routes render documents as calm technical reading spaces, not generic blog cards.
 */

export type ArticleMeta = {
  slug: string;
  title: string;
  seoTitle?: string;
  summary: string;
  publishedAt: string;
  tags: string[];
};

export const articles: ArticleMeta[] = [
  {
    slug: "outsourcing-technical-debt",
    title: "Outsourcing and Technical Debt: Managing the Trade-offs",
    seoTitle: "Outsourcing and Technical Debt",
    summary:
      "How outsourcing can create technical debt, where that debt comes from, and practical ways to limit, measure and pay it down.",
    publishedAt: "2025-10-19",
    tags: ["Software Engineering", "Outsourcing", "Technical Debt"],
  },
  {
    slug: "real-world-vs-leetcode",
    title:
      "Why Real-World Coding Beats LeetCode: The Case for Practical Technical Interviews",
    seoTitle: "Why Real-World Coding Beats LeetCode",
    summary:
      "A blunt critique of algorithm-centric interviews and a call for hiring processes rooted in real-world engineering—bug fixing, feature building, and actual problem solving.",
    publishedAt: "2025-07-23",
    tags: [
      "Tech Jobs",
      "Hiring",
      "Interviews",
      "Programming",
      "Software Engineering",
    ],
  },
  {
    slug: "negativity-bias-and-tech-job-search",
    title:
      "Negativity Bias and the Tech Job Search: Breaking Free from the Cycle in 2025",
    seoTitle: "Negativity Bias and the Tech Job Search",
    summary:
      "A candid exploration of how negativity bias and online reviews shape the job search for software engineers—especially in consulting—and why hope and perspective are still essential.",
    publishedAt: "2025-07-09",
    tags: ["Tech Jobs", "Consulting", "Psychology", "Programming"],
  },
  {
    slug: "apple-liquid-glass",
    title:
      "Apple's Liquid Glass: A Beautiful Design Revolution with Contrast Challenges",
    seoTitle: "Apple's Liquid Glass: Design & Contrast",
    summary:
      "Exploring Apple's new Liquid Glass design system introduced in iOS 26, examining its visual appeal, ecosystem unification, and accessibility concerns around contrast and readability.",
    publishedAt: "2025-06-12",
    tags: [
      "Apple",
      "iOS 26",
      "Liquid Glass",
      "UI Design",
      "UX Design",
      "Accessibility",
    ],
  },
  {
    slug: "gemini-diffusion",
    title:
      "Gemini Diffusion: Google DeepMind's Leap Beyond Autoregressive Language Models",
    seoTitle: "Gemini Diffusion: Google's New AI Model",
    summary:
      "Exploring Gemini Diffusion, the experimental text diffusion model from Google DeepMind that promises blazing speed, improved coherence, and a new paradigm for language generation.",
    publishedAt: "2025-06-06",
    tags: [
      "AI",
      "Diffusion Models",
      "LLM",
      "Google DeepMind",
      "Text Generation",
    ],
  },
  {
    slug: "italy-tech-stagnation-2025",
    title:
      "Italy’s Tech Stagnation: Why Programmers and Startups Are Still Struggling in 2025",
    seoTitle: "Italy's Tech Stagnation in 2025",
    summary:
      "A frank look at the persistent problems plaguing Italy’s tech and startup ecosystem in 2025—bureaucracy, low salaries, and cultural barriers—and a call to action for a new beginning.",
    publishedAt: "2025-06-04",
    tags: ["Italy", "Startups", "Tech Jobs", "Innovation", "Programming"],
  },
  {
    slug: "how-notion-scaled-to-handle-billions-of-blocks",
    title: "How Notion Scaled to Handle 200 Billion Blocks",
    seoTitle: "How Notion Scaled to 200 Billion Blocks",
    summary:
      "An exploration of Notion's technical evolution from a single database to a sophisticated architecture capable of handling over 200 billion blocks of content.",
    publishedAt: "2025-03-27",
    tags: ["Database", "Scalability", "Notion", "Sharding"],
  },
  {
    slug: "understanding-gibberlink-a-deep-dive-into-ai-sound-based-communication",
    title:
      "Understanding GibberLink: A Deep Dive into AI Sound-Based Communication",
    seoTitle: "GibberLink: AI Sound-Based Communication",
    summary:
      "An exploration of GibberLink, an innovative sound-based communication protocol for AI agents, which enables efficient network-independent communication using sound waves.",
    publishedAt: "2025-02-27",
    tags: ["AI", "Communication Protocol", "GibberLink", "Sound-Based AI"],
  },
  {
    slug: "matrix-profile-for-detecting-anomalies-or-patterns-in-time-series",
    title: "Matrix Profile for Detecting Anomalies or Patterns in Time Series",
    seoTitle: "Matrix Profile for Time Series Analysis",
    summary:
      "An introduction to the matrix profile, a powerful technique for detecting anomalies or patterns in time series data, and its applications in various domains.",
    publishedAt: "2025-02-19",
    tags: ["Data Science", "Time Series", "Anomaly Detection"],
  },
  {
    slug: "can-ai-predict-chaos-the-three-body-problem",
    title: "Can AI Predict Chaos? The Three-Body Problem",
    seoTitle: "Can AI Predict Chaos?",
    summary:
      "Exploring the capabilities and limitations of neural networks in predicting chaotic systems like the Three-Body Problem.",
    publishedAt: "2025-01-31",
    tags: ["AI", "Chaos Theory", "Neural Networks", "Physics"],
  },
  {
    slug: "advent-of-code-2024-my-journey",
    title: "Advent of Code 2024: My Journey",
    seoTitle: "Advent of Code 2024: My Journey",
    summary:
      "My experience with Advent of Code 2024, tackling programming puzzles, competing with a vibrant community, and reflecting on the challenges and triumphs of the event.",
    publishedAt: "2024-12-27",
    tags: ["Programming", "Challenges"],
  },
  {
    slug: "quantum-computing-unlocking-the-future-of-computation",
    title: "Quantum Computing: Unlocking the Future of Computation",
    seoTitle: "Quantum Computing: The Future of Computation",
    summary:
      "Quantum computing is a revolutionary technology that leverages quantum mechanics to perform computations at speeds unimaginable with classical computers.",
    publishedAt: "2024-12-12",
    tags: ["Quantum Computing", "Technology"],
  },
  {
    slug: "building-my-personal-webiste-a-minimalist-approach",
    title: "Building My Personal Website: A Minimalist Approach",
    seoTitle: "Building My Personal Website",
    summary:
      "In the second iteration of my personal website, I shifted from a CV-oriented design to a minimalistic, user-focused approach.",
    publishedAt: "2024-11-19",
    tags: ["Web Development"],
  },
  {
    slug: "rediscovering-physics-and-motion-derivatives-with-formula-1",
    title: "Rediscovering Physics and Motion Derivatives with Formula 1",
    seoTitle: "Physics and Motion Derivatives with F1",
    summary:
      "Rediscovering physics during my university years reminded me to think outside the box and explore beyond conventional boundaries.",
    publishedAt: "2024-10-23",
    tags: ["Physics", "Mathematics"],
  },
  {
    slug: "the-importance-of-contributing-to-open-source-projects",
    title: "The importance of contributing to open source projects",
    seoTitle: "The Importance of Open Source Contributions",
    summary:
      "A reflection on the importance of contributing to open source projects and the personal experiences of the author.",
    publishedAt: "2024-01-17",
    tags: ["Reflection", "Open Source"],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
