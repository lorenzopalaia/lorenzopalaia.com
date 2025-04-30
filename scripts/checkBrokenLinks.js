import { config } from "../config.ts";

const whitelist = new Set(
  (config.socials || [])
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
  const headController = new AbortController();
  const headTimeout = setTimeout(() => headController.abort(), 10000);

  try {
    let response = await fetch(url, {
      method: "HEAD",
      signal: headController.signal,
      redirect: "follow",
    });
    clearTimeout(headTimeout);

    if (!response.ok && response.status === 405) {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 15000);
      try {
        response = await fetch(url, {
          method: "GET",
          signal: getController.signal,
          redirect: "follow",
        });
        clearTimeout(getTimeout);
      } catch (getError) {
        clearTimeout(getTimeout);
        if (getError.name === "AbortError") {
          return { url, ok: false, error: "Timeout GET" };
        }

        return { url, ok: false, error: getError.message };
      }
    }

    if (!response.ok) {
      return { url, ok: false, status: response.status };
    }

    process.stdout.write(".");
    return { url, ok: true, status: response.status };
  } catch (error) {
    clearTimeout(headTimeout);

    if (error.name === "AbortError") {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 15000);
      try {
        const response = await fetch(url, {
          method: "GET",
          signal: getController.signal,
          redirect: "follow",
        });
        clearTimeout(getTimeout);
        if (!response.ok) {
          return { url, ok: false, status: response.status };
        }
        process.stdout.write(".");
        return { url, ok: true, status: response.status };
      } catch (getError) {
        clearTimeout(getTimeout);
        if (getError.name === "AbortError") {
          return { url, ok: false, error: "Timeout GET after Timeout HEAD" };
        }

        return { url, ok: false, error: getError.message };
      }
    }

    return { url, ok: false, error: error.message };
  }
}

async function main() {
  console.log("🔍 Checking links in config.js...");
  const urlsToCheck = extractUrls(config);
  const brokenLinks = [];

  if (urlsToCheck.length === 0) {
    console.log(
      "✅ No external links found to check (after whitelist filtering).",
    );
    process.exit(0);
  }

  console.log(
    `🔗 Found ${urlsToCheck.length} external links to check (excluding whitelist). Checking in progress...`,
  );

  const results = await Promise.allSettled(urlsToCheck.map(checkUrl));
  console.log("\n");

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value && !result.value.ok) {
      brokenLinks.push({
        url: result.value.url,
        status: result.value.status,
        error: result.value.error,
      });
    } else if (result.status === "rejected") {
      console.error(`\n❌ Promise rejected unexpectedly: ${result.reason}`);

      const url = result.reason?.url || "Unknown URL (Promise Rejected)";
      brokenLinks.push({
        url: url,
        error:
          result.reason?.message ||
          String(result.reason) ||
          "Unknown rejection reason",
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
    console.error(
      `\nBuild failed due to ${brokenLinks.length} broken link(s).`,
    );
    process.exit(1);
  } else {
    console.log("✅ All checked external links are working!");
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(
    "\n🚨 An unexpected error occurred during the link checking process:",
    error,
  );
  process.exit(1);
});
