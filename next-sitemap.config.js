const SITE_URL = process.env.SITE_URL || "https://www.lorenzopalaia.com";

const config = {
  siteUrl: SITE_URL,

  generateRobotsTxt: true,

  exclude: [
    "/privacy",
    "/api/*",
    "/_next/*",
    "/404",
    "/500",
    "/_error",
    "/_app",
    "/_document",
    "/twitter-image.*",
    "/opengraph-image.*",
    "/icon.*",
    "/apple-icon.*",
    "/sitemap.xml",
    "/robots.txt",
  ],

  transform: async (config, url) => {
    let priority = 0.5;
    let changefreq = "monthly";

    let path;

    try {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } catch {
      path = url;
    }

    if (
      path === "" ||
      path === "/" ||
      url === SITE_URL ||
      url === `${SITE_URL}/`
    ) {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path === "/projects" || url.endsWith("/projects")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/projects/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/blog" || url.endsWith("/blog")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/experience") {
      priority = 0.7;
      changefreq = "yearly";
    }

    return {
      loc: url,
      changefreq,
      priority,
      lastmod: undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
  },
};

export default config;
