import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const source = JSON.parse(fs.readFileSync(path.join(root, "public", "comparison-decisions.json"), "utf8"));

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
}

function localized(pathname, lang) {
  return `/${lang}${pathname}`;
}

function pageHtml(item, lang) {
  const other = lang === "fa" ? "en" : "fa";
  const dir = lang === "fa" ? "rtl" : "ltr";
  const data = item[lang];
  const canonical = `https://farsio.ir/${lang}/compare/${item.slug}`;
  const alternate = `https://farsio.ir/${other}/compare/${item.slug}`;
  const productName = lang === "fa" ? (item.product === "neveshtyar" ? "نوشت‌یار" : "آوایار") : (item.product === "neveshtyar" ? "NeveshtYar" : "AvaYar");
  const labels = lang === "fa" ? {
    eyebrow: "راهنمای تصمیم فارسیو",
    answer: "پاسخ کوتاه",
    first: "گزینه اول",
    second: "گزینه دوم",
    decision: "چطور تصمیم بگیریم؟",
    review: "نکته بازبینی",
    product: `مشاهده ${productName}`,
    guide: "راهنمای مرتبط",
    intent: "راهنمای کاربردی مرتبط",
    home: "صفحه اصلی فارسیو",
    disclosure: "این صفحه برای کمک به انتخاب روش مناسب نوشته شده و جای بررسی منبع، قضاوت حرفه‌ای یا بازبینی انسانی در موضوعات حساس را نمی‌گیرد."
  } : {
    eyebrow: "Farsio decision guide",
    answer: "Short answer",
    first: "Option one",
    second: "Option two",
    decision: "How to decide",
    review: "Review checkpoint",
    product: `Explore ${productName}`,
    guide: "Related guide",
    intent: "Related practical insight",
    home: "Farsio home",
    disclosure: "This page helps users choose a workflow. It does not replace source verification, professional judgment or human review for consequential decisions."
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: data.title,
        description: data.description,
        inLanguage: lang,
        mainEntityOfPage: canonical,
        publisher: { "@id": "https://farsio.ir/#organization" },
        isPartOf: { "@id": "https://farsio.ir/#website" },
        about: { "@id": item.entity },
        mentions: [
          { "@id": item.entity },
          { "@id": `https://farsio.ir/${lang}${item.intentPath}#article` }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "fa" ? "فارسیو" : "Farsio", item: `https://farsio.ir/${lang}` },
          { "@type": "ListItem", position: 2, name: lang === "fa" ? "راهنماهای تصمیم" : "Decision guides", item: canonical }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: [
          { "@type": "Question", name: labels.answer, acceptedAnswer: { "@type": "Answer", text: data.answer } },
          { "@type": "Question", name: labels.decision, acceptedAnswer: { "@type": "Answer", text: data.decision } }
        ]
      }
    ]
  };

  const cards = [
    [labels.answer, data.answer],
    [labels.first, data.optionA],
    [labels.second, data.optionB],
    [labels.decision, data.decision],
    [labels.review, data.review]
  ];

  return `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(data.title)} | Farsio</title><meta name="description" content="${escapeHtml(data.description)}"/><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"/><link rel="canonical" href="${canonical}"/><link rel="alternate" hreflang="fa" href="https://farsio.ir/fa/compare/${item.slug}"/><link rel="alternate" hreflang="en" href="https://farsio.ir/en/compare/${item.slug}"/><link rel="alternate" hreflang="x-default" href="https://farsio.ir/fa/compare/${item.slug}"/><meta property="og:title" content="${escapeHtml(data.title)}"/><meta property="og:description" content="${escapeHtml(data.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="article"/><meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script><style>html{font-family:${lang === "fa" ? "Vazirmatn,system-ui,sans-serif" : "Inter,system-ui,sans-serif"};background:#0b1020;color:#f7f8fc}body{margin:0}.wrap{max-width:960px;margin:auto;padding:28px 22px 80px}nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:60px}a{color:#dce5ff;text-decoration:none}.brand{font-weight:800;font-size:22px}.eyebrow{display:inline-block;padding:7px 12px;border:1px solid #364265;border-radius:999px;color:#b9c8f5}h1{font-size:clamp(34px,6vw,62px);line-height:1.15;margin:20px 0}.lead{font-size:21px;line-height:1.95;color:#d7def0}.actions{display:flex;flex-wrap:wrap;gap:12px;margin:34px 0}.actions a{padding:12px 16px;border-radius:12px;background:#17233e;border:1px solid #34476f}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:42px}.card{background:#111a30;border:1px solid #263454;border-radius:22px;padding:24px}.card:first-child,.card:nth-child(4),.card:nth-child(5){grid-column:1/-1}.card h2{margin:0 0 12px;font-size:23px}.card p,.disclosure{font-size:17px;line-height:1.9;color:#d7def0}.disclosure{margin-top:42px;padding:18px 20px;border-inline-start:4px solid #7692ff;background:#101a31;border-radius:12px}@media(max-width:700px){nav{margin-bottom:38px}.grid{grid-template-columns:1fr}.card,.card:first-child,.card:nth-child(4),.card:nth-child(5){grid-column:auto}h1{font-size:38px}.lead,.card p{font-size:16px}}</style></head><body><main class="wrap" data-farsio-comparison-page="${item.id}"><nav><a class="brand" href="/${lang}">Farsio · فارسیو</a><a href="${alternate}">${other.toUpperCase()}</a></nav><span class="eyebrow">${labels.eyebrow}</span><h1>${escapeHtml(data.title)}</h1><p class="lead">${escapeHtml(data.description)}</p><div class="actions"><a href="${localized(item.productPath, lang)}">${labels.product}</a><a href="${localized(item.guidePath, lang)}">${labels.guide}</a><a href="${localized(item.intentPath, lang)}">${labels.intent}</a></div><section class="grid">${cards.map(([title,text]) => `<article class="card"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></article>`).join("")}</section><aside class="disclosure">${escapeHtml(labels.disclosure)}</aside><div class="actions"><a href="/${lang}">${labels.home}</a><a href="${localized(item.productPath, lang)}">${labels.product}</a></div></main></body></html>`;
}

const urls = [];
for (const item of source.comparisons) {
  for (const lang of ["fa", "en"]) {
    const out = path.join(dist, lang, "compare", item.slug);
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, "index.html"), pageHtml(item, lang));
    urls.push(`https://farsio.ir/${lang}/compare/${item.slug}`);
  }
}

const sitemapPath = path.join(dist, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  const insert = urls.filter((url) => !sitemap.includes(`<loc>${url}</loc>`)).map((url) => `  <url><loc>${url}</loc><lastmod>2026-09-04</lastmod></url>`).join("\n");
  sitemap = sitemap.replace("</urlset>", `${insert ? `\n${insert}\n` : ""}</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Generated ${urls.length} bilingual comparison decision pages.`);
