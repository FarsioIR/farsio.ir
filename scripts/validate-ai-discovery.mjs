import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const discovery = JSON.parse(fs.readFileSync(path.join(root, "public", "ai-discovery.json"), "utf8"));
const entities = JSON.parse(fs.readFileSync(path.join(root, "public", "ai-entities.json"), "utf8"));
const sitemap = fs.readFileSync(path.join(root, "dist", "sitemap.xml"), "utf8");
const llms = fs.readFileSync(path.join(root, "public", "llms.txt"), "utf8");

function fail(message) {
  console.error(`AI discovery validation failed: ${message}`);
  process.exit(1);
}

if (discovery.schemaVersion !== "1.0") fail("unexpected schemaVersion");
if (discovery.generatedFor !== "https://farsio.ir/") fail("unexpected generatedFor");
if (discovery.organization !== "https://farsio.ir/#organization") fail("organization id mismatch");
if (discovery.website !== "https://farsio.ir/#website") fail("website id mismatch");
if (!Array.isArray(discovery.products) || discovery.products.length !== 2) fail("expected exactly two products");

const entityIds = new Set(entities.entities.map((entity) => entity.id));
const seen = new Set();
for (const product of discovery.products) {
  if (!product.id || seen.has(product.id)) fail(`duplicate or missing product id: ${product.id}`);
  seen.add(product.id);
  if (!entityIds.has(product.entity)) fail(`missing entity contract for ${product.id}`);
  for (const key of ["canonicalFa", "canonicalEn", "releaseNotesFa", "releaseNotesEn", "repository", "officialRelease", "currentVersion", "stage"]) {
    if (!product[key]) fail(`missing ${key} for ${product.id}`);
  }
  for (const url of [...product.intentPages, ...product.decisionPages]) {
    if (!url.startsWith("https://farsio.ir/")) fail(`non-canonical discovery URL: ${url}`);
    const sitemapUrl = url.split("#")[0];
    if (!sitemap.includes(`<loc>${sitemapUrl}</loc>`)) fail(`URL missing from sitemap: ${sitemapUrl}`);
  }
  if (!llms.includes(product.canonicalFa) || !llms.includes(product.canonicalEn)) fail(`llms product canonicals missing for ${product.id}`);
}

console.log(`AI discovery validation PASS: ${discovery.products.length} products, ${discovery.products.reduce((n, p) => n + p.intentPages.length + p.decisionPages.length, 0)} discovery routes.`);
