const config = {
  siteUrl: process.env.SITE_URL || "https://www.lorenzopalaia.com",
  generateRobotsTxt: true,
  // * use this to exclude routes from the sitemap (i.e. a user dashboard). By default, NextJS app router metadata files are excluded (https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
  exclude: [
    "/twitter-image.*",
    "/opengraph-image.*",
    "/icon.*",
    "/apple-icon.*",
    "/sitemap.xml",
    "/robots.txt",
    "/api/*",
    "/_next/*",
    "/_error",
    "/404",
    "/500",
    "/_app",
    "/_document",
    "/_error",
  ],
  transform: (config, url) => {
    let priority = 0.5;
    let changefreq = "monthly";

    let path;
    try {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } catch (e) {
      path = url;
    }

    if (
      path === "" ||
      path === "/" ||
      url === "https://www.lorenzopalaia.com" ||
      url === "https://www.lorenzopalaia.com/"
    ) {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path === "/blog" || url.endsWith("/blog")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path === "/projects" || url.endsWith("/projects")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path === "/contact" || url.endsWith("/contact")) {
      priority = 0.6;
      changefreq = "yearly";
    } else if (path.startsWith("/blog/") || url.includes("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
    }

    return {
      loc: url,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Slurp", // Yahoo bot
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api/*", "/_next/*", "/privacy"],
      },
    ],
    additionalSitemaps: [],
  },
};

export default config;
