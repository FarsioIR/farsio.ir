import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ORIGIN = "https://farsio.ir";
const DEFAULT_OG_IMAGE = `${ORIGIN}/brand/farsio-logo.png`;

function imageFor(page) {
  if (page.kind === "neveshtyar") {
    return `${ORIGIN}/brand/products/neveshtyar-mark.png`;
  }

  if (page.kind === "ava") {
    return `${ORIGIN}/brand/products/avayar-mark.png`;
  }

  return DEFAULT_OG_IMAGE;
}
const routes = [
  ["", "home", "فارسیو | ابزارهای هوش مصنوعی فارسی برای نوشتن، خواندن و شنیدن", "فارسیو مجموعه ابزارهای هوش مصنوعی فارسی شامل نوشت‌یار و آوایار برای نوشتن، اصلاح فینگلیش، خواندن، ترجمه، خلاصه‌سازی و تبدیل متن فارسی به گفتار است.", "Farsio | Persian AI Tools for Writing, Reading & Speech", "Farsio builds Persian AI tools including NeveshtYar and AvaYar for writing, Finglish correction, reading, translation, summarization and Persian text-to-speech."],
  ["/products", "collection", "محصولات فارسیو | نوشت‌یار و آوایار", "محصولات فارسیو را بشناسید؛ نوشت‌یار برای نوشتن دقیق‌تر و آوایار برای خواندن، ترجمه و شنیدن بهتر.", "Farsio Products | NeveshtYar & AvaYar", "Explore NeveshtYar for better writing and AvaYar for Persian-first reading, translation and listening."],
  ["/products/neveshtyar", "neveshtyar", "نوشت‌یار | دستیار نوشتن فارسی، اصلاح فینگلیش و تایپ | فارسیو", "نوشت‌یار دستیار نوشتن فارسی برای اصلاح فینگلیش، بازیابی چیدمان کیبورد، اصلاح تایپ و بهبود تجربه نوشتن فارسی و انگلیسی است.", "NeveshtYar | Persian Writing Assistant & Finglish Correction", "NeveshtYar is a Persian writing assistant for Finglish correction, keyboard-layout recovery, typing correction and Persian-English writing workflows."],
  ["/products/ava", "ava", "آوایار | تبدیل متن فارسی به صدا، خواندن و خلاصه‌سازی | فارسیو", "آوایار دستیار خواندن فارسی برای تبدیل متن به گفتار، خواندن وب، ترجمه و خلاصه‌سازی متن با تجربه فارسی‌محور است.", "AvaYar | Persian Text to Speech, Reading & Summarization", "AvaYar is a Persian reading assistant for text-to-speech, web reading, translation and summarization with a Persian-first experience."],
  ["/features", "features", "ویژگی‌های فارسیو | طراحی فارسی‌محور، سبک و شفاف", "ویژگی‌ها و اصول طراحی فارسیو؛ فارسی در اولویت، سرعت، حریم خصوصی و توسعه شفاف.", "Farsio Features | Persian-first, lightweight and transparent", "Explore Farsio's product principles: Persian-first design, speed, privacy and transparent development."],
  ["/docs", "docs", "راهنمای فارسیو | نصب، استفاده و مسیر توسعه", "راهنمای جامع فارسیو برای شروع، نصب نوشت‌یار، آوایار، حریم خصوصی، گزارش مشکل و نسخه‌ها.", "Farsio Guide | Installation, usage and development", "A practical Farsio guide covering setup, NeveshtYar, AvaYar, privacy, issue reporting and releases."],
  ["/faq", "faq", "سوالات متداول فارسیو | پاسخ‌های رسمی", "پاسخ‌های رسمی درباره فارسیو، نوشت‌یار، آوایار، نسخه‌ها، GitHub و حریم خصوصی.", "Farsio FAQ | Official answers", "Official answers about Farsio, NeveshtYar, AvaYar, releases, GitHub and privacy."],
  ["/releases", "releases", "نسخه‌ها و انتشارهای فارسیو | Release Notes", "نسخه‌های رسمی محصولات فارسیو را دنبال کنید؛ نوشت‌یار v4.9.2، وضعیت توسعه آوایار، تغییرات مهم و مسیر انتشارهای بعدی.", "Farsio Releases | Product release notes", "Follow NeveshtYar v4.9.2 and AvaYar development status through official sources."],
  ["/community", "community", "جامعه و GitHub فارسیو | توسعه شفاف", "مخزن‌های رسمی GitHub، گزارش مسائل و مسیر مشارکت در توسعه فارسیو.", "Farsio Community & GitHub | Open development", "Explore Farsio repositories, issue tracking and contribution paths."],
  ["/report-issue", "report", "گزارش مشکل فارسیو | راهنمای ثبت Issue حرفه‌ای", "راهنمای گزارش خطا با اطلاعات بازتولید، نسخه، مرورگر و رفتار مورد انتظار.", "Report a Farsio Issue | High-quality bug reports", "Learn how to report a Farsio issue with reproducible steps, version, browser and expected behavior."],
  ["/contribute", "contribute", "مشارکت در فارسیو | راهنمای Contribution", "راهنمای مشارکت در توسعه فارسیو، Issue، Pull Request، تست و حریم خصوصی.", "Contribute to Farsio | Contribution guide", "A practical guide to issues, focused pull requests, validation and safe contribution."],
  ["/about", "about", "درباره فارسیو | ماموریت، اصول و محصولات", "با فارسیو، ماموریت ساخت ابزارهای هوش مصنوعی فارسی، محصولات نوشت‌یار و آوایار، اصول محصول و مسیر توسعه این اکوسیستم آشنا شوید.", "About Farsio | Mission, principles and products", "Learn about Farsio's mission, Persian-first principles, products and founder."],
  ["/contact", "contact", "تماس با فارسیو | مسیرهای رسمی ارتباط", "مسیرهای رسمی ارتباط برای موضوعات فنی، همکاری و بازخورد محصول.", "Contact Farsio | Official communication channels", "Official ways to contact Farsio for technical topics, collaboration and product feedback."],
  ["/privacy", "privacy", "حریم خصوصی فارسیو | اصول داده و شفافیت", "سیاست حریم خصوصی فارسیو بر کمینه‌سازی داده، شفافیت در پردازش، کنترل کاربر و طراحی محصولات فارسی‌محور با حفظ حریم خصوصی تمرکز دارد.", "Farsio Privacy | Data and transparency principles", "Farsio's privacy principles: minimization, transparency and user control."],
];

const pages = routes.flatMap(([suffix, kind, faTitle, faDescription, enTitle, enDescription]) => [
  { path: `/fa${suffix}`, alternate: `/en${suffix}`, lang: "fa", dir: "rtl", locale: "fa_IR", alternateLocale: "en_US", kind, title: faTitle, description: faDescription },
  { path: `/en${suffix}`, alternate: `/fa${suffix}`, lang: "en", dir: "ltr", locale: "en_US", alternateLocale: "fa_IR", kind, title: enTitle, description: enDescription },
]);

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in built index.html`);
  return html.replace(pattern, replacement);
}

function upsert(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function schema(page) {
  const canonical = `${ORIGIN}${page.path}`;
  const graph = [
    { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "Farsio", alternateName: ["فارسیو", "Farsio AI"], url: `${ORIGIN}/`, logo: `${ORIGIN}/brand/farsio-logo.png`, founder: { "@type": "Person", name: "Amir Motefaker", alternateName: "امیر متفکر", url: "https://amirmotefaker.ir/" }, sameAs: ["https://github.com/FarsioIR", "https://amirmotefaker.ir/"] },
    { "@type": "WebSite", "@id": `${ORIGIN}/#website`, url: `${ORIGIN}/`, name: "Farsio", alternateName: "فارسیو", publisher: { "@id": `${ORIGIN}/#organization` }, inLanguage: ["fa", "en"] },
    { "@type": page.kind === "about" ? "AboutPage" : page.kind === "contact" ? "ContactPage" : page.kind === "collection" ? "CollectionPage" : "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, inLanguage: page.lang, isPartOf: { "@id": `${ORIGIN}/#website` } },
  ];
  if (page.kind === "neveshtyar" || page.kind === "ava") graph.push({ "@type": "SoftwareApplication", "@id": `${canonical}#software`, name: page.kind === "neveshtyar" ? "NeveshtYar" : "AvaYar", alternateName: page.kind === "neveshtyar" ? "نوشت‌یار" : "آوایار", url: canonical, description: page.description, applicationCategory: "UtilitiesApplication", publisher: { "@id": `${ORIGIN}/#organization` } });
  if (page.path !== `/${page.lang}`) {
    const items = [{ "@type": "ListItem", position: 1, name: page.lang === "fa" ? "خانه" : "Home", item: `${ORIGIN}/${page.lang}` }];
    if (page.path.includes("/products/")) items.push({ "@type": "ListItem", position: 2, name: page.lang === "fa" ? "محصولات" : "Products", item: `${ORIGIN}/${page.lang}/products` });
    items.push({ "@type": "ListItem", position: items.length + 1, name: page.title, item: canonical });
    graph.push({ "@type": "BreadcrumbList", itemListElement: items });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function buildHtml(template, page) {
  const canonical = `${ORIGIN}${page.path}`;
  const alternate = `${ORIGIN}${page.alternate}`;
  const socialImage = imageFor(page);
  const faHref = page.lang === "fa" ? canonical : alternate;
  const enHref = page.lang === "en" ? canonical : alternate;
  let html = template;
  html = replaceRequired(html, /<html\b[^>]*>/i, `<html lang="${page.lang}" dir="${page.dir}" data-theme="dark">`, "html tag");
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)}</title>`, "title");
  const entries = [
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${esc(page.description)}" />`],
    [/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />`],
    [/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`],
    [/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${esc(page.title)}" />`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${esc(page.description)}" />`],
    [/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`],
    [/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${socialImage}" />`],
    [/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:alt" content="${page.kind === "neveshtyar" ? "NeveshtYar · نوشت‌یار" : page.kind === "ava" ? "AvaYar · آوایار" : "Farsio · فارسیو"}" />`],
    [/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:locale" content="${page.locale}" />`],
    [/<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:locale:alternate" content="${page.alternateLocale}" />`],
    [/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${esc(page.title)}" />`],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${esc(page.description)}" />`],
    [/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${socialImage}" />`],
    [/<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image:alt" content="${page.kind === "neveshtyar" ? "NeveshtYar · نوشت‌یار" : page.kind === "ava" ? "AvaYar · آوایار" : "Farsio · فارسیو"}" />`],
  ];
  for (const [pattern, replacement] of entries) html = upsert(html, pattern, replacement);
  html = html.replace(/(?:\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*\/?>)+/gi, "");
  html = html.replace("</head>", [`    <link rel="alternate" hreflang="fa" href="${faHref}" />`, `    <link rel="alternate" hreflang="en" href="${enHref}" />`, `    <link rel="alternate" hreflang="x-default" href="${faHref}" />`, "  </head>"].join("\n"));
  html = replaceRequired(html, /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${JSON.stringify(schema(page), null, 2)}\n    </script>`, "JSON-LD");
  return html;
}

const template = await readFile(join(DIST, "index.html"), "utf8");
for (const page of pages) {
  const relative = page.path.replace(/^\/+/, "");
  const output = join(DIST, `${relative}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, buildHtml(template, page), "utf8");
}
console.log(`Generated route-specific SEO HTML for ${pages.length} localized routes.`);
