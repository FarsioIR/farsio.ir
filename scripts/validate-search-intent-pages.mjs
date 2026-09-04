import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const source = JSON.parse(fs.readFileSync(path.join(root, "public", "search-intents.json"), "utf8"));
const routeMap = {
  "finglish-to-persian-tool-selection": "finglish-to-persian-workflow",
  "persian-ai-writing-use-cases": "persian-ai-writing-assistant",
  "persian-text-to-speech-workflow": "persian-text-to-speech-workflow",
  "web-summarization-reading-assistant": "web-summarization-assistant",
  "english-to-persian-translation-workflow": "english-to-persian-translation",
};
const fail = (message) => { throw new Error(message); };
const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
let count = 0;

for (const intent of source.intents) {
  const slug = routeMap[intent.id];
  if (!slug) fail(`No slug for ${intent.id}`);
  for (const lang of ["fa", "en"]) {
    const other = lang === "fa" ? "en" : "fa";
    const file = path.join(dist, lang, "insights", slug, "index.html");
    if (!fs.existsSync(file)) fail(`Missing page ${lang}/${slug}`);
    const html = fs.readFileSync(file, "utf8");
    const canonical = `https://farsio.ir/${lang}/insights/${slug}`;
    const alternate = `https://farsio.ir/${other}/insights/${slug}`;
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    if (!title || titles.has(title)) fail(`Missing/duplicate title: ${lang}/${slug}`);
    if (!description || descriptions.has(description)) fail(`Missing/duplicate description: ${lang}/${slug}`);
    if (canonicals.has(canonical)) fail(`Duplicate canonical: ${canonical}`);
    titles.add(title); descriptions.add(description); canonicals.add(canonical);
    if (!html.includes(`<link rel="canonical" href="${canonical}"`)) fail(`Canonical mismatch ${canonical}`);
    if (!html.includes(`hreflang="${other}" href="${alternate}"`)) fail(`Missing alternate ${alternate}`);
    if (!html.includes('type="application/ld+json"')) fail(`Missing JSON-LD ${canonical}`);
    if (!html.includes('"@type":"Article"')) fail(`Missing Article schema ${canonical}`);
    if (!html.includes('"@type":"FAQPage"')) fail(`Missing FAQ schema ${canonical}`);
    if (!html.includes(`data-farsio-intent-page="${intent.id}"`)) fail(`Missing intent marker ${canonical}`);
    if (!html.includes(`/${lang}/products/`)) fail(`Missing product link ${canonical}`);
    if (!html.includes(`/${lang}/guides/`)) fail(`Missing guide link ${canonical}`);
    if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`Missing sitemap URL ${canonical}`);
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (visible.length < 1200) fail(`Intent page is too thin: ${canonical}`);
    if (lang === "en" && /[\u0600-\u06ff]{4,}/.test(visible.replace("Farsio · فارسیو", ""))) fail(`Unexpected Persian leakage on EN page ${canonical}`);
    count += 1;
  }
}

if (count !== 10) fail(`Expected 10 pages, got ${count}`);
console.log(`Search intent pages PASS: ${count} pages, unique metadata, schema, links and sitemap coverage.`);
