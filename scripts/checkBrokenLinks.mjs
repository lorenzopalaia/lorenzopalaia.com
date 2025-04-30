import { config } from "../config.js";

const whitelist = new Set(
  config.socials
    .filter((social) => ["LinkedIn", "X"].includes(social.name))
    .map((social) => social.href),
);

function extractUrls(cfg) {
  const urls = new Set();

  const recursiveExtract = (obj) => {
    if (!obj) return;

    if (
      typeof obj === "string" &&
      (obj.startsWith("http://") || obj.startsWith("https://"))
    ) {
      if (obj.includes("mailto:") || obj.startsWith("/") || whitelist.has(obj))
        return;
      urls.add(obj);
    } else if (Array.isArray(obj)) {
      obj.forEach(recursiveExtract);
    } else if (typeof obj === "object") {
      if (obj.href && typeof obj.href === "string") {
        recursiveExtract(obj.href);
      }
      if (obj.html_url && typeof obj.html_url === "string") {
        recursiveExtract(obj.html_url);
      }

      Object.values(obj).forEach(recursiveExtract);
    }
  };

  recursiveExtract(cfg);
  return Array.from(urls);
}

async function checkUrl(url) {
  try {
    let response = await fetch(url, { method: "HEAD", timeout: 10000 });

    if (!response.ok && response.status === 405) {
      console.warn(`⚠️ HEAD not allowed for ${url}, trying GET...`);
      response = await fetch(url, { method: "GET", timeout: 15000 });
    }

    if (!response.ok) {
      console.error(`\n❌ Failed: ${url} (Status: ${response.status})`);
      return { url, ok: false, status: response.status };
    }

    return { url, ok: true, status: response.status };
  } catch (error) {
    console.error(`\n❌ Error fetching ${url}: ${error.message}`);
    return { url, ok: false, error: error.message };
  }
}

async function main() {
  console.log("🔍 Checking links in config.js...");
  const urlsToCheck = extractUrls(config);
  const brokenLinks = [];

  if (urlsToCheck.length === 0) {
    console.log(
      "✅ No external links found to check (after filtering whitelist).",
    );
    process.exit(0);
  }

  console.log(
    `🔗 Found ${urlsToCheck.length} external links to check (excluding whitelist).`,
  );

  const results = await Promise.allSettled(urlsToCheck.map(checkUrl));

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value && !result.value.ok) {
      brokenLinks.push({
        url: result.value.url,
        status: result.value.status,
        error: result.value.error,
      });
    } else if (result.status === "rejected") {
      console.error(`\n❌ Promise rejected for a URL check: ${result.reason}`);

      brokenLinks.push({
        url: "Unknown URL (Promise Rejected)",
        error: result.reason?.message || result.reason || "Unknown Error",
      });
    }
  });

  if (brokenLinks.length > 0) {
    console.error("\n💥 Found broken or problematic links:");
    brokenLinks.forEach((link) => {
      const reason = link.status
        ? `Status: ${link.status}`
        : `Error: ${link.error || "Unknown error"}`;
      console.error(`  - ${link.url} (${reason})`);
    });
    console.error(`\nBuild failed due to ${brokenLinks.length} broken links.`);
    process.exit(1);
  } else {
    console.log("\n✅ All checked external links are working!");
    process.exit(0);
  }
}

main();
