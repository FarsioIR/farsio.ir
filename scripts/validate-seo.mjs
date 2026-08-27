import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

const routes = [
  "/fa",
  "/en",
  "/fa/products",
  "/en/products",
  "/fa/products/neveshtyar",
  "/en/products/neveshtyar",
  "/fa/products/ava",
  "/en/products/ava",
  "/fa/features",
  "/en/features",
  "/fa/docs",
  "/en/docs",
  "/fa/faq",
  "/en/faq",
  "/fa/releases",
  "/en/releases",
  "/fa/community",
  "/en/community",
  "/fa/report-issue",
  "/en/report-issue",
  "/fa/contribute",
  "/en/contribute",
  "/fa/about",
  "/en/about",
  "/fa/contact",
  "/en/contact",
  "/fa/privacy",
  "/en/privacy",
];

function routeFile(route) {
  return `${DIST}${route}.html`;
}

function capture(html, pattern, label, route) {
  const match = html.match(pattern);

  if (!match) {
    throw new Error(`${route}: missing ${label}`);
  }

  return match[1];
}

const titles = new Map();
const canonicals = new Set();
const warnings = [];

for (const route of routes) {
  const file = routeFile(route);

  await access(file);

  const html = await readFile(file, "utf8");

  const title = capture(
    html,
    /<title>([^<]+)<\/title>/i,
    "title",
    route,
  );

  const description = capture(
    html,
    /<meta name="description" content="([^"]+)"/i,
    "description",
    route,
  );

  const canonical = capture(
    html,
    /<link rel="canonical" href="([^"]+)"/i,
    "canonical",
    route,
  );

  if (title.length < 20 || title.length > 75) {
    warnings.push({
      route,
      type: "title-length",
      length: title.length,
      value: title,
    });
  }

  if (description.length < 60 || description.length > 180) {
    warnings.push({
      route,
      type: "description-length",
      length: description.length,
      value: description,
    });
  }

  if (titles.has(title)) {
    throw new Error(
      `${route}: duplicate title also used by ${titles.get(title)}`,
    );
  }

  titles.set(title, route);

  if (canonicals.has(canonical)) {
    throw new Error(`${route}: duplicate canonical ${canonical}`);
  }

  canonicals.add(canonical);

  if (!html.includes('name="robots" content="index,follow')) {
    throw new Error(`${route}: missing index/follow robots`);
  }

  if (!html.includes('hreflang="fa"')) {
    throw new Error(`${route}: missing FA hreflang`);
  }

  if (!html.includes('hreflang="en"')) {
    throw new Error(`${route}: missing EN hreflang`);
  }

  if (!html.includes('hreflang="x-default"')) {
    throw new Error(`${route}: missing x-default hreflang`);
  }

  if (!html.includes('property="og:title"')) {
    throw new Error(`${route}: missing og:title`);
  }

  if (!html.includes('property="og:image"')) {
    throw new Error(`${route}: missing og:image`);
  }

  if (!html.includes('name="twitter:card"')) {
    throw new Error(`${route}: missing Twitter card`);
  }

  if (!html.includes('application/ld+json')) {
    throw new Error(`${route}: missing JSON-LD`);
  }

  JSON.parse(
    capture(
      html,
      /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/i,
      "valid JSON-LD",
      route,
    ),
  );
}

console.log(
  JSON.stringify(
    {
      decision: "PASS",
      routes: routes.length,
      uniqueTitles: titles.size,
      uniqueCanonicals: canonicals.size,
      warningCount: warnings.length,
      warnings,
      checks: [
        "title",
        "description",
        "canonical",
        "robots",
        "hreflang-fa",
        "hreflang-en",
        "hreflang-x-default",
        "open-graph",
        "twitter-card",
        "json-ld",
      ],
    },
    null,
    2,
  ),
);