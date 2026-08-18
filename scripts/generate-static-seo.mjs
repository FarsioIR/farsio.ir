import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ORIGIN = "https://farsio.ir";
const OG_IMAGE = `${ORIGIN}/brand/farsio-logo.png`;

if (!/[/\\]dist[/\\]?$/.test(DIST)) {
  throw new Error(`Unexpected dist path: ${DIST}`);
}

const pages = [
  {
    path: "/fa",
    lang: "fa",
    dir: "rtl",
    title: "فارسیو | یار فارسی‌زبان",
    description:
      "فارسیو؛ یار فارسی‌زبان برای نوشتن، خواندن، ترجمه و شنیدن بهتر با نوشت‌یار و آوایار.",
    alternate: "/en",
  },
  {
    path: "/en",
    lang: "en",
    dir: "ltr",
    title: "Farsio | Persian-first tools for writing, reading & listening",
    description:
      "Farsio builds Persian-first tools for writing, reading, translation and listening, including NeveshtYar and AvaYar.",
    alternate: "/fa",
  },
  {
    path: "/fa/products/neveshtyar",
    lang: "fa",
    dir: "rtl",
    title: "نوشت‌یار | دستیار نوشتن فارسی و انگلیسی | فارسیو",
    description:
      "نوشت‌یار، دستیار نوشتن فارسی و انگلیسی فارسیو برای اصلاح فینگلیش، بازیابی چیدمان صفحه‌کلید، املاء و تجربه بهتر نوشتن راست‌به‌چپ.",
    alternate: "/en/products/neveshtyar",
  },
  {
    path: "/en/products/neveshtyar",
    lang: "en",
    dir: "ltr",
    title: "NeveshtYar | Persian & English Writing Assistant | Farsio",
    description:
      "NeveshtYar is Farsio's local-first Persian and English writing assistant for Finglish correction, keyboard-layout recovery, spelling and RTL workflows.",
    alternate: "/fa/products/neveshtyar",
  },
  {
    path: "/fa/products/ava",
    lang: "fa",
    dir: "rtl",
    title: "آوایار | دستیار خواندن و شنیدن فارسی | فارسیو",
    description:
      "آوایار، محصول فارسی‌محور فارسیو برای خواندن وب، ترجمه، خلاصه‌سازی و تبدیل متن به گفتار در مسیر ساخت تجربه شنیدن روان فارسی.",
    alternate: "/en/products/ava",
  },
  {
    path: "/en/products/ava",
    lang: "en",
    dir: "ltr",
    title: "AvaYar | Persian Reading & Listening Assistant | Farsio",
    description:
      "AvaYar is Farsio's Persian-first web reading, translation, summarization and text-to-speech assistant.",
    alternate: "/fa/products/ava",
  },
  {
    path: "/fa/docs",
    lang: "fa",
    dir: "rtl",
    title: "مستندات فارسیو | Farsio Docs",
    description:
      "مستندات فارسیو برای نوشت‌یار، آوایار، نصب، حریم خصوصی و راهنمای استفاده.",
    alternate: "/en/docs",
  },
  {
    path: "/en/docs",
    lang: "en",
    dir: "ltr",
    title: "Farsio Docs | NeveshtYar & AvaYar",
    description:
      "Farsio documentation for NeveshtYar, AvaYar, installation, privacy and product usage.",
    alternate: "/fa/docs",
  },
  {
    path: "/fa/about",
    lang: "fa",
    dir: "rtl",
    title: "درباره فارسیو | یار فارسی‌زبان",
    description:
      "درباره فارسیو و محصولات فارسی‌محور آن برای نوشتن، خواندن، ترجمه و شنیدن.",
    alternate: "/en/about",
  },
  {
    path: "/en/about",
    lang: "en",
    dir: "ltr",
    title: "About Farsio | Persian-first product engineering",
    description:
      "Learn about Farsio and its Persian-first products for writing, reading, translation and listening.",
    alternate: "/fa/about",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Missing expected ${label} tag in built index.html`);
  }
  return html.replace(pattern, replacement);
}

function buildHtml(template, page) {
  const canonical = `${ORIGIN}${page.path}`;
  const alternate = `${ORIGIN}${page.alternate}`;
  const faHref = page.lang === "fa" ? canonical : alternate;
  const enHref = page.lang === "en" ? canonical : alternate;
  const locale = page.lang === "fa" ? "fa_IR" : "en_US";
  const alternateLocale = page.lang === "fa" ? "en_US" : "fa_IR";

  let html = template;

  html = replaceTag(
    html,
    /<html\b[^>]*>/i,
    `<html lang="${page.lang}" dir="${page.dir}" data-theme="dark">`,
    "html",
  );

  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
    "title",
  );

  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    "description",
  );

  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonical}" />`,
    "canonical",
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    "og:title",
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    "og:description",
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`,
    "og:url",
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    "og:image",
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${locale}" />`,
    "og:locale",
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale:alternate" content="${alternateLocale}" />`,
    "og:locale:alternate",
  );

  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    "twitter:title",
  );

  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    "twitter:description",
  );

  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    "twitter:image",
  );

  html = html.replace(
    "</head>",
    [
      `    <link rel="alternate" hreflang="fa" href="${faHref}" />`,
      `    <link rel="alternate" hreflang="en" href="${enHref}" />`,
      `    <link rel="alternate" hreflang="x-default" href="${faHref}" />`,
      "  </head>",
    ].join("\n"),
  );

  return html;
}

const templatePath = join(DIST, "index.html");
const template = await readFile(templatePath, "utf8");

for (const page of pages) {
  const relative = page.path.replace(/^\/+/, "");
  const output = join(DIST, `${relative}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, buildHtml(template, page), "utf8");
}

console.log(`Generated route-specific SEO HTML for ${pages.length} routes.`);
