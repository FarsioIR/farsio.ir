import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const source = JSON.parse(fs.readFileSync(path.join(root, "public", "comparison-decisions.json"), "utf8"));
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
const seenIds = new Set();
let count = 0;

const fail = (message) => { throw new Error(message); };

if (source.issue !== 25) fail("comparison-decisions.json must belong to Issue #25");
if (!Array.isArray(source.comparisons) || source.comparisons.length !== 6) fail("Expected exactly 6 decision topics");

for (const item of source.comparisons) {
  if (!item.id || seenIds.has(item.id)) fail(`Missing/duplicate comparison id: ${item.id}`);
  seenIds.add(item.id);
  if (!item.slug || !/^[a-z0-9-]+$/.test(item.slug)) fail(`Invalid slug for ${item.id}`);
  if (!item.entity?.startsWith("https://farsio.ir/fa/products/")) fail(`Invalid product entity for ${item.id}`);
  if (!item.productPath || !item.guidePath || !item.intentPath) fail(`Missing link graph for ${item.id}`);

  for (const lang of ["fa", "en"]) {
    const other = lang === "fa" ? "en" : "fa";
    const data = item[lang];
    if (!data?.title || !data?.description || !data?.answer || !data?.optionA || !data?.optionB || !data?.decision || !data?.review) fail(`Incomplete ${lang} content for ${item.id}`);
    const file = path.join(dist, lang, "compare", item.slug, "index.html");
    if (!fs.existsSync(file)) fail(`Missing generated page: ${lang}/compare/${item.slug}`);
    const html = fs.readFileSync(file, "utf8");
    const canonical = `https://farsio.ir/${lang}/compare/${item.slug}`;
    const alternate = `https://farsio.ir/${other}/compare/${item.slug}`;
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];

    if (!title || titles.has(title)) fail(`Missing/duplicate title: ${canonical}`);
    if (!description || descriptions.has(description)) fail(`Missing/duplicate description: ${canonical}`);
    if (canonicals.has(canonical)) fail(`Duplicate canonical: ${canonical}`);
    titles.add(title); descriptions.add(description); canonicals.add(canonical);

    if (!html.includes(`<link rel="canonical" href="${canonical}"`)) fail(`Canonical mismatch: ${canonical}`);
    if (!html.includes(`hreflang="${other}" href="${alternate}"`)) fail(`Missing hreflang alternate: ${canonical}`);
    if (!html.includes('"@type":"Article"')) fail(`Missing Article schema: ${canonical}`);
    if (!html.includes('"@type":"FAQPage"')) fail(`Missing FAQ schema: ${canonical}`);
    if (!html.includes('"@type":"BreadcrumbList"')) fail(`Missing Breadcrumb schema: ${canonical}`);
    if (!html.includes(item.entity)) fail(`Missing product entity relationship: ${canonical}`);
    if (!html.includes(`data-farsio-comparison-page="${item.id}"`)) fail(`Missing comparison marker: ${canonical}`);
    if (!html.includes(`/${lang}${item.productPath}`)) fail(`Missing product conversion path: ${canonical}`);
    if (!html.includes(`/${lang}${item.guidePath}`)) fail(`Missing guide link: ${canonical}`);
    if (!html.includes(`/${lang}${item.intentPath}`)) fail(`Missing intent link: ${canonical}`);
    if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`Missing sitemap route: ${canonical}`);

    const visible = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (visible.length < 1150) fail(`Comparison page is too thin: ${canonical} (${visible.length})`);
    if (lang === "en") {
      const cleaned = visible.replace("Farsio · فارسیو", "");
      if (/[\u0600-\u06ff]{4,}/.test(cleaned)) fail(`Unexpected Persian leakage on EN page: ${canonical}`);
    }
    count += 1;
  }
}

if (count !== 12) fail(`Expected 12 comparison pages, got ${count}`);
console.log(`Comparison pages PASS: ${count} pages, unique metadata, entity graph, links, depth and sitemap coverage.`);
