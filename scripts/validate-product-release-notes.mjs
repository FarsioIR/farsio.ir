import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function text(relative) {
  return readFile(`${ROOT}${relative}`, "utf8");
}

const releaseSource = await text("src/product-release-notes.tsx");
const avayarStableSource = await text("src/avayar-stable-release-notes.tsx");
const redirects = await text("public/_redirects");
const sitemap = await text("public/sitemap.xml");
const llms = await text("public/llms.txt");
const llmsFull = await text("public/llms-full.txt");
const aiEntities = await text("public/ai-entities.json");
const aiDiscovery = await text("public/ai-discovery.json");

for (const required of [
  "v4.9.2",
  "0.6.0",
  "released",
  "preview",
  "active",
  "planned",
  "#release-notes",
]) {
  assert(
    releaseSource.includes(required) || avayarStableSource.includes(required) || llms.includes(required) || llmsFull.includes(required),
    `Missing product-history contract token: ${required}`,
  );
}

for (const stableToken of [
  "19 Shahrivar 1405",
  "10 Sep 2026",
  "Sulafat",
  "Iapetus",
  "progressive",
  "avayar-v0.6.0",
]) {
  assert(
    avayarStableSource.includes(stableToken) || llms.includes(stableToken) || llmsFull.includes(stableToken),
    `Missing AvaYar Stable authority token: ${stableToken}`,
  );
}

for (const surface of [llms, llmsFull, aiEntities, aiDiscovery]) {
  assert(surface.includes("0.6.0"), "Machine-readable authority surface missing AvaYar 0.6.0");
  assert(surface.includes("https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0"), "Machine-readable authority surface missing canonical AvaYar Stable release URL");
}

assert(!aiEntities.includes('"currentVersion": "0.6.0 preview-3"'), "AI entity graph still marks AvaYar Preview 3 as current");
assert(!aiDiscovery.includes('"currentVersion": "0.6.0 preview-3"'), "AI discovery graph still marks AvaYar Preview 3 as current");
assert(!llms.includes("Current preview RC: 0.6.0 preview-3"), "llms.txt still marks AvaYar Preview 3 as current");
assert(!llmsFull.includes("Current preview RC:\n0.6.0 preview-3"), "llms-full.txt still marks AvaYar Preview 3 as current");

assert(
  redirects.includes("/fa/products/ava /fa/products/avayar 301") &&
    redirects.includes("/en/products/ava /en/products/avayar 301"),
  "Legacy AvaYar aliases must redirect to canonical /products/avayar",
);
assert(!redirects.includes("/fa/products/ava/ /fa/products/ava 301"), "Self-canonical AvaYar legacy redirect detected");
assert(!redirects.includes("/en/products/ava/ /en/products/ava 301"), "Self-canonical AvaYar legacy redirect detected");

for (const canonical of [
  "https://farsio.ir/fa/products/neveshtyar",
  "https://farsio.ir/en/products/neveshtyar",
  "https://farsio.ir/fa/products/avayar",
  "https://farsio.ir/en/products/avayar",
]) {
  assert(sitemap.includes(canonical), `Sitemap missing canonical product URL: ${canonical}`);
  assert(llms.includes(canonical), `llms.txt missing canonical product URL: ${canonical}`);
  assert(llmsFull.includes(canonical), `llms-full.txt missing canonical product URL: ${canonical}`);
}

assert(!llms.includes("https://farsio.ir/fa/products/ava\n"), "llms.txt contains stale AvaYar Persian URL");
assert(!llms.includes("https://farsio.ir/en/products/ava\n"), "llms.txt contains stale AvaYar English URL");
assert(!llmsFull.includes("https://farsio.ir/fa/products/ava\n"), "llms-full.txt contains stale AvaYar Persian URL");
assert(!llmsFull.includes("https://farsio.ir/en/products/ava\n"), "llms-full.txt contains stale AvaYar English URL");

const routes = [
  ["fa", "neveshtyar", "4.9.2"],
  ["en", "neveshtyar", "4.9.2"],
  ["fa", "avayar", "0.6.0"],
  ["en", "avayar", "0.6.0"],
];

for (const [lang, slug, version] of routes) {
  const file = `${DIST}/${lang}/products/${slug}.html`;
  const html = await readFile(file, "utf8");
  const match = html.match(
    /<script type="application\/ld\+json" data-farsio-product-history>\s*([\s\S]*?)\s*<\/script>/i,
  );

  assert(match, `${lang}/${slug}: missing GEO product-history JSON-LD`);
  const parsed = JSON.parse(match[1]);
  assert(Array.isArray(parsed["@graph"]), `${lang}/${slug}: invalid product-history graph`);

  const software = parsed["@graph"].find((node) => node["@type"] === "SoftwareApplication");
  const history = parsed["@graph"].find((node) => node["@type"] === "ItemList");

  assert(software, `${lang}/${slug}: missing SoftwareApplication history entity`);
  assert(history, `${lang}/${slug}: missing ItemList release history entity`);
  assert(software.softwareVersion === version, `${lang}/${slug}: softwareVersion mismatch`);
  assert(software.releaseNotes?.endsWith("#release-notes"), `${lang}/${slug}: releaseNotes URL missing`);
  assert(history.numberOfItems >= 2, `${lang}/${slug}: release history is incomplete`);

  if (slug === "avayar") {
    assert(history.numberOfItems >= 3, `${lang}/${slug}: Stable release missing from history`);
    assert(software.sameAs?.includes("https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0"), `${lang}/${slug}: Stable release provenance missing from SoftwareApplication`);
  }
}

console.log(
  JSON.stringify(
    {
      decision: "PASS",
      gate: "Farsio product history + SEO + GEO",
      canonicalProducts: 4,
      releaseHistoryStructuredData: 4,
      checks: [
        "dated-release-notes",
        "released-preview-active-planned-statuses",
        "avayar-0.6.0-stable-authority",
        "avayar-stable-release-provenance",
        "machine-readable-current-version-consistency",
        "canonical-avayar-redirects",
        "canonical-sitemap-product-urls",
        "llms-product-entities",
        "llms-full-product-history",
        "software-application-version",
        "release-notes-json-ld",
        "release-history-item-list",
      ],
    },
    null,
    2,
  ),
);
