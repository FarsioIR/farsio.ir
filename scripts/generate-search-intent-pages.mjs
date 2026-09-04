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

const body = {
  "finglish-to-persian-tool-selection": {
    fa: [
      ["پاسخ کوتاه", "تبدیل فینگلیش به فارسی فقط جایگزینی حرف‌به‌حرف نیست. یک نوشتار لاتین می‌تواند چند خوانش فارسی داشته باشد؛ بنابراین ابزار خوب باید متن، واژه‌های اطراف و احتمال خطا را در نظر بگیرد و در متن حساس امکان بازبینی انسانی بدهد."],
      ["چرا تبدیل یک‌به‌یک جواب نمی‌دهد؟", "فینگلیش استاندارد واحدی ندارد. یک صدا ممکن است با چند حرف لاتین نوشته شود و یک ترکیب لاتین نیز در واژه‌های مختلف معنی متفاوتی بدهد. متن‌های ترکیبی فارسی و انگلیسی، نام برندها و اصطلاحات فنی این ابهام را بیشتر می‌کنند."],
      ["جریان کار پیشنهادی", "ابتدا جمله یا پاراگراف کامل را تبدیل کنید، نه واژه‌های جدا. سپس نام‌ها، اعداد، اصطلاحات تخصصی و بخش‌های انگلیسی را بازبینی کنید. در پایان متن را یک‌بار با صدای ذهنی بخوانید تا تغییر ناخواسته معنی یا لحن مشخص شود."],
      ["چه زمانی نوشت‌یار مناسب است؟", "وقتی هدف شما نوشتن و اصلاح سریع متن فارسی در همان محیط کاری است، نوشت‌یار می‌تواند بخشی از جریان تبدیل و بازبینی باشد. برای متن حقوقی، پزشکی، مالی یا هر محتوای پرریسک، خروجی خودکار باید فقط پیش‌نویس تلقی شود و تأیید انسانی ضروری است."],
    ],
    en: [
      ["Short answer", "Finglish-to-Persian conversion is not a character-for-character replacement task. The same Latin spelling can map to multiple Persian readings, so a useful workflow needs context and a human review step for ambiguous or high-stakes text."],
      ["Why one-to-one conversion fails", "Finglish has no single spelling standard. Sounds can be represented by several Latin patterns, while mixed Persian-English text, names, brands and technical terms add ambiguity."],
      ["Recommended workflow", "Convert complete sentences or paragraphs instead of isolated words. Review names, numbers, specialist terms and English fragments, then read the result once for meaning and tone before publishing."],
      ["Where NeveshtYar fits", "NeveshtYar is useful when conversion and Persian writing assistance need to remain close to the writing workflow. Legal, medical, financial or other high-stakes text should still be treated as a draft until a qualified person reviews it."],
    ],
  },
  "persian-ai-writing-use-cases": {
    fa: [
      ["پاسخ کوتاه", "دستیار نوشتن فارسی بیشترین ارزش را در بازنویسی، ساده‌سازی، اصلاح خطاهای رایج و یکنواخت‌کردن متن دارد؛ اما نباید جای تصمیم نویسنده درباره معنی، ادعا و لحن را بگیرد."],
      ["کاربردهای مناسب", "بازنویسی یک جمله سنگین، اصلاح فاصله و نیم‌فاصله، تبدیل متن محاوره‌ای به رسمی‌تر، کوتاه‌کردن جمله‌های تکراری و پیشنهاد عبارت روان‌تر از کاربردهای کم‌ریسک و روزمره‌اند."],
      ["محدودیت‌های مهم", "هوش مصنوعی ممکن است هنگام روان‌سازی، شدت یک ادعا یا منظور نویسنده را تغییر دهد. در متن دو‌زبانه نیز نام محصول، کد، URL و اصطلاح انگلیسی باید از بازنویسی ناخواسته محافظت شوند."],
      ["روش استفاده بهتر", "درخواست را محدود و مشخص نگه دارید: مثلاً «فقط روان‌تر کن و معنی را تغییر نده». تغییرات مهم را با متن اصلی مقایسه کنید و برای محتواهای حساس، بازبینی انسانی را بخشی از فرآیند ثابت قرار دهید."],
    ],
    en: [
      ["Short answer", "A Persian writing assistant is most useful for rewriting, simplification, common-error correction and consistency. It should not replace the writer's judgment about meaning, claims or tone."],
      ["Good use cases", "Improving a dense sentence, correcting Persian spacing, making informal text more formal, removing repetition and suggesting clearer wording are practical low-risk uses."],
      ["Important limitations", "AI can accidentally change the strength of a claim or the intended tone. In bilingual text, product names, code, URLs and English terminology should be protected from unintended rewriting."],
      ["A better workflow", "Keep the instruction narrow, such as ‘make this clearer without changing meaning.’ Compare important edits with the source and keep human review mandatory for sensitive content."],
    ],
  },
  "persian-text-to-speech-workflow": {
    fa: [
      ["پاسخ کوتاه", "کیفیت خوانش فارسی فقط به موتور صوتی وابسته نیست. نشانه‌گذاری، شکل نوشتن اعداد، نام‌های خاص، مخفف‌ها و طول جمله روی طبیعی‌بودن خروجی اثر مستقیم دارند."],
      ["آماده‌سازی متن", "جمله‌های بسیار بلند را کوتاه کنید، ویرگول و نقطه را در جای درست بگذارید و برای نام‌هایی که احتمال تلفظ اشتباه دارند شکل خواناتر بنویسید. اعداد و واحدها نیز در متن صوتی بهتر است به شکلی باشند که ابهام نداشته باشند."],
      ["موتور اصلی و جایگزین مرورگر", "در آوایار ممکن است موتور اصلی صوتی در دسترس نباشد و مسیر جایگزین مرورگر فعال شود. کیفیت fallback به سیستم‌عامل، مرورگر و صدای فارسی نصب‌شده وابسته است؛ بنابراین تجربه روی دستگاه‌های مختلف یکسان نیست."],
      ["برای متن طولانی", "متن را به بخش‌های منطقی تقسیم کنید، تیترها را حفظ کنید و قبل از شنیدن طولانی یک نمونه کوتاه را تست کنید. این کار هم خطاهای تلفظ را زودتر آشکار می‌کند و هم کنترل شنیدن را ساده‌تر می‌سازد."],
    ],
    en: [
      ["Short answer", "Persian speech quality depends on more than the voice engine. Punctuation, numbers, proper names, abbreviations and sentence length directly affect intelligibility."],
      ["Prepare the text", "Split very long sentences, use punctuation deliberately and rewrite ambiguous names or numbers in a speech-friendly form when necessary."],
      ["Primary engine and browser fallback", "AvaYar can fall back to browser speech when the primary speech path is unavailable. Fallback quality depends on the operating system, browser and installed Persian voices, so results vary by device."],
      ["For long-form listening", "Break content into logical sections, preserve headings and test a short sample before committing to a long listening session. This surfaces pronunciation problems early and makes playback easier to control."],
    ],
  },
  "web-summarization-reading-assistant": {
    fa: [
      ["پاسخ کوتاه", "خلاصه برای فهم سریع ساختار و نکات اصلی مفید است، اما برای تصمیم‌های مهم جای منبع اصلی را نمی‌گیرد. یک خلاصه خوب باید ادعاهای اصلی، محدودیت‌ها و زمینه لازم را حفظ کند."],
      ["چه چیزی باید باقی بماند؟", "نتیجه اصلی، شرط‌ها، استثناها، اعداد مهم و نسبت دادن ادعا به منبع نباید در خلاصه گم شوند. حذف این عناصر ممکن است متن کوتاه‌تر ولی گمراه‌کننده بسازد."],
      ["چه زمانی متن اصلی را بخوانیم؟", "هنگام تصمیم مالی، پزشکی، حقوقی، فنی یا هر موضوعی که یک جزئیات کوچک نتیجه را تغییر می‌دهد، خلاصه فقط ابزار مرور اولیه است. همچنین برای نقل‌قول یا استناد باید به متن اصلی برگردید."],
      ["نقش آوایار", "آوایار خلاصه‌سازی را کنار خواندن و شنیدن قرار می‌دهد تا کاربر بتواند ابتدا تصویر کلی را بگیرد و سپس بخش‌های مهم را دقیق‌تر بررسی کند. کیفیت نتیجه همچنان به کیفیت و ساختار صفحه منبع وابسته است."],
    ],
    en: [
      ["Short answer", "Summaries are useful for quickly understanding structure and key points, but they do not replace the source for consequential decisions. A good summary preserves the main claims, constraints and necessary context."],
      ["What should be preserved", "Core conclusions, conditions, exceptions, important numbers and attribution should survive summarization. Removing them can make the text shorter while making it misleading."],
      ["When to read the source", "For financial, medical, legal, technical or other high-impact decisions, a summary is only an initial review layer. Return to the original page for citations, precise wording and edge cases."],
      ["Where AvaYar fits", "AvaYar combines summarization with reading and listening so users can get an overview first and inspect important sections next. Output quality still depends on the quality and structure of the source page."],
    ],
  },
  "english-to-persian-translation-workflow": {
    fa: [
      ["پاسخ کوتاه", "ترجمه انگلیسی به فارسی در مطالعه وب برای فهم سریع متن و کاهش رفت‌وبرگشت ذهنی مفید است، اما اصطلاحات تخصصی، اسم‌ها و جمله‌های چندمعنا باید با متن اصلی مقایسه شوند."],
      ["کجا بیشترین صرفه‌جویی ایجاد می‌شود؟", "مقاله‌های طولانی، مستندات عمومی و صفحات توضیحی که هدف از آن‌ها فهم مفهوم است معمولاً بهترین نقطه شروع‌اند. برای قرارداد، دستور پزشکی یا specification دقیق، ترجمه نباید تنها مرجع تصمیم باشد."],
      ["اصطلاحات تخصصی", "گاهی بهترین ترجمه، نگه‌داشتن اصطلاح انگلیسی کنار معادل فارسی است. این کار امکان جست‌وجوی اصطلاح اصلی و مقایسه با منبع را حفظ می‌کند و جلوی از دست‌رفتن دقت را می‌گیرد."],
      ["جریان کار در آوایار", "ابتدا بخش موردنیاز را ترجمه کنید، سپس اگر تصمیم یا استناد به آن وابسته است جمله اصلی انگلیسی را بررسی کنید. خلاصه‌سازی و خوانش صوتی می‌توانند مرحله بعدی باشند، نه جایگزین بررسی منبع."],
    ],
    en: [
      ["Short answer", "English-to-Persian translation is useful for faster web reading, but specialist terms, names and ambiguous sentences should be checked against the English source."],
      ["Where it saves the most time", "Long articles, general documentation and explanatory pages are good candidates when the goal is conceptual understanding. Contracts, medical instructions and exact technical specifications require source verification."],
      ["Specialist terminology", "Sometimes the safest translation keeps the English term next to its Persian equivalent. This preserves searchability and makes comparison with the source easier."],
      ["AvaYar workflow", "Translate the needed section first, then verify the original English sentence when a decision or citation depends on it. Summarization and speech can be useful next steps, but they should not replace source review."],
    ],
  },
};

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
}

function pageHtml(intent, lang) {
  const other = lang === "fa" ? "en" : "fa";
  const dir = lang === "fa" ? "rtl" : "ltr";
  const slug = routeMap[intent.id];
  const canonical = `https://farsio.ir/${lang}/insights/${slug}`;
  const alternate = `https://farsio.ir/${other}/insights/${slug}`;
  const productPath = intent.product === "neveshtyar" ? "neveshtyar" : "avayar";
  const productName = lang === "fa" ? (intent.product === "neveshtyar" ? "نوشت‌یار" : "آوایار") : (intent.product === "neveshtyar" ? "NeveshtYar" : "AvaYar");
  const guidePath = new URL(intent.supportingGuide).pathname.replace(/^\/fa\//, `/${lang}/`);
  const data = intent[lang];
  const sections = body[intent.id][lang];
  const faq = data.questions.map((q, i) => ({ q, a: sections[Math.min(i, sections.length - 1)][1] }));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${canonical}#article`, headline: data.title, description: data.summary, inLanguage: lang, mainEntityOfPage: canonical, publisher: { "@id": "https://farsio.ir/#organization" }, about: { "@id": `https://farsio.ir/fa/products/${productPath}#software` } },
      { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "fa" ? "فارسیو" : "Farsio", item: `https://farsio.ir/${lang}` },
        { "@type": "ListItem", position: 2, name: lang === "fa" ? "راهنماهای کاربردی" : "Practical insights", item: canonical },
      ]},
      { "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    ],
  };
  const labels = lang === "fa" ? {
    eyebrow: "راهنمای کاربردی فارسیو", product: `مشاهده ${productName}`, guide: "راهنمای مرتبط", questions: "پرسش‌های کلیدی", note: "نکته", noteText: "این صفحه برای توضیح روش استفاده و محدودیت‌ها نوشته شده است؛ ادعای عملکردی فراتر از وضعیت فعلی محصول ندارد.", home: "صفحه اصلی فارسیو",
  } : {
    eyebrow: "Farsio practical insight", product: `Explore ${productName}`, guide: "Related guide", questions: "Key questions", note: "Note", noteText: "This page explains workflow and limitations; it does not make product claims beyond the current documented product state.", home: "Farsio home",
  };
  return `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(data.title)} | Farsio</title><meta name="description" content="${escapeHtml(data.summary)}"/><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"/><link rel="canonical" href="${canonical}"/><link rel="alternate" hreflang="fa" href="https://farsio.ir/fa/insights/${slug}"/><link rel="alternate" hreflang="en" href="https://farsio.ir/en/insights/${slug}"/><link rel="alternate" hreflang="x-default" href="https://farsio.ir/fa/insights/${slug}"/><meta property="og:title" content="${escapeHtml(data.title)}"/><meta property="og:description" content="${escapeHtml(data.summary)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="article"/><meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script><style>html{font-family:${lang === "fa" ? "Vazirmatn,system-ui,sans-serif" : "Inter,system-ui,sans-serif"};background:#0b1020;color:#f7f8fc}body{margin:0}.wrap{max-width:920px;margin:auto;padding:28px 22px 80px}nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:64px}nav a,.actions a{color:#dce5ff;text-decoration:none}.brand{font-weight:800;font-size:22px}.eyebrow{display:inline-block;padding:7px 12px;border:1px solid #364265;border-radius:999px;color:#b9c8f5}h1{font-size:clamp(34px,6vw,64px);line-height:1.12;margin:20px 0}p{font-size:18px;line-height:1.95;color:#d7def0}.lead{font-size:21px}.grid{display:grid;gap:18px;margin-top:42px}.card{background:#111a30;border:1px solid #263454;border-radius:22px;padding:24px}.card h2{margin:0 0 12px;font-size:24px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin:34px 0}.actions a{padding:12px 16px;border-radius:12px;background:#17233e;border:1px solid #34476f}.faq{margin-top:56px}.faq details{border-top:1px solid #293653;padding:17px 0}.faq summary{font-weight:700;cursor:pointer}.note{margin-top:44px;padding:18px 20px;border-inline-start:4px solid #7692ff;background:#101a31;border-radius:12px}@media(max-width:640px){nav{margin-bottom:38px}h1{font-size:38px}.lead,p{font-size:16px}.card{padding:19px}}</style></head><body><main class="wrap" data-farsio-intent-page="${intent.id}"><nav><a class="brand" href="/${lang}">Farsio · فارسیو</a><a href="${alternate}">${other.toUpperCase()}</a></nav><span class="eyebrow">${labels.eyebrow}</span><h1>${escapeHtml(data.title)}</h1><p class="lead">${escapeHtml(data.summary)}</p><div class="actions"><a href="/${lang}/products/${productPath}">${labels.product}</a><a href="${guidePath}">${labels.guide}</a></div><section class="grid">${sections.map(([title, text]) => `<article class="card"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></article>`).join("")}</section><section class="faq"><h2>${labels.questions}</h2>${faq.map((item) => `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`).join("")}</section><aside class="note"><strong>${labels.note}</strong><p>${labels.noteText}</p></aside><div class="actions"><a href="/${lang}">${labels.home}</a><a href="/${lang}/products/${productPath}">${labels.product}</a></div></main></body></html>`;
}

const urls = [];
for (const intent of source.intents) {
  const slug = routeMap[intent.id];
  if (!slug) throw new Error(`Missing route for ${intent.id}`);
  for (const lang of ["fa", "en"]) {
    const out = path.join(dist, lang, "insights", slug);
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, "index.html"), pageHtml(intent, lang));
    urls.push(`https://farsio.ir/${lang}/insights/${slug}`);
  }
}

const sitemapPath = path.join(dist, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  const insert = urls.filter((url) => !sitemap.includes(`<loc>${url}</loc>`)).map((url) => `  <url><loc>${url}</loc><lastmod>2026-09-04</lastmod></url>`).join("\n");
  sitemap = sitemap.replace("</urlset>", `${insert ? `\n${insert}\n` : ""}</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Generated ${urls.length} bilingual intent pages.`);
