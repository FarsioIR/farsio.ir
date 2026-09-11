import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ORIGIN = "https://farsio.ir";

const products = {
  neveshtyar: {
    name: "NeveshtYar",
    alternateName: "نوشت‌یار",
    version: "4.9.2",
    releaseDate: "2026-08-26",
    releaseUrl: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
    repositoryUrl: "https://github.com/FarsioIR/NeveshtYar",
    sourceSha: "f47f64dbb504a87fa768e8ec119aa783b7ba7385",
    operatingSystem: "Chrome, Edge, Brave, Opera, Vivaldi, Firefox",
    featureList: {
      fa: [
        "اصلاح دوطرفه چیدمان کیبورد فارسی و انگلیسی",
        "تبدیل فینگلیش به فارسی",
        "تشخیص و حفظ متن صحیح",
        "اصلاح درجا در فیلدهای متنی وب",
        "دیکشنری شخصی",
        "یادگیری از اصلاحات تاییدشده کاربر",
        "رابط فارسی RTL و انگلیسی LTR",
        "هسته اصلاح Local-first",
      ],
      en: [
        "Bidirectional Persian/English keyboard-layout recovery",
        "Finglish to Persian conversion",
        "Correct-text preservation",
        "Inline correction across web text fields",
        "Personal dictionary",
        "Learning from user-approved corrections",
        "Persian RTL and English LTR interface",
        "Local-first correction core",
      ],
    },
  },
  avayar: {
    name: "AvaYar",
    alternateName: "آوایار",
    version: "0.6.0",
    releaseDate: "2026-09-10",
    releaseUrl: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0",
    repositoryUrl: "https://github.com/FarsioIR/AvaYar",
    sourceSha: "20d9da845c32e9873d332fb12192b38521d21232",
    operatingSystem: "Chrome, Edge",
    featureList: {
      fa: [
        "خواندن محتوای صفحه وب",
        "حالت متن کامل",
        "حالت خلاصه",
        "آماده‌سازی محتوای انگلیسی به فارسی",
        "تبدیل متن فارسی به گفتار",
        "دو صدای Sulafat و Iapetus",
        "پخش تدریجی صدا",
        "کنترل‌های Play، Pause، Resume و Stop",
        "رابط Side Panel مرورگر",
      ],
      en: [
        "Webpage reading",
        "Full-text mode",
        "Summary mode",
        "English-to-Persian preparation",
        "Persian neural text-to-speech",
        "Sulafat and Iapetus voices",
        "Progressive audio playback",
        "Play, Pause, Resume and Stop controls",
        "Browser side-panel interface",
      ],
    },
  },
};

const pageSpecs = [
  { path: "fa/products/neveshtyar.html", lang: "fa", product: "neveshtyar" },
  { path: "en/products/neveshtyar.html", lang: "en", product: "neveshtyar" },
  { path: "fa/products/avayar.html", lang: "fa", product: "avayar" },
  { path: "en/products/avayar.html", lang: "en", product: "avayar" },
];

function extractJsonLd(html) {
  const match = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!match) throw new Error("Missing JSON-LD block");
  return { match: match[0], data: JSON.parse(match[1]) };
}

function replaceJsonLd(html, original, data) {
  return html.replace(original, `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`);
}

function graphOf(data) {
  if (!Array.isArray(data?.["@graph"])) throw new Error("Expected @graph JSON-LD");
  return data["@graph"];
}

function brandEntity() {
  return {
    "@type": "Brand",
    "@id": `${ORIGIN}/#brand`,
    name: "Farsio",
    alternateName: "فارسیو",
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/brand/farsio-logo.png`,
    description: "Farsio is the parent brand and canonical online authority for NeveshtYar and AvaYar.",
  };
}

for (const spec of pageSpecs) {
  const fullPath = join(DIST, spec.path);
  let html = await readFile(fullPath, "utf8");
  const parsed = extractJsonLd(html);
  const graph = graphOf(parsed.data);
  const product = products[spec.product];

  const organization = graph.find((item) => item?.["@id"] === `${ORIGIN}/#organization`);
  if (organization) {
    organization.description = spec.lang === "fa"
      ? "فارسیو برند مادر و مرجع رسمی آنلاین نوشت‌یار و آوایار است."
      : "Farsio is the parent brand and canonical online authority for NeveshtYar and AvaYar.";
    organization.brand = { "@id": `${ORIGIN}/#brand` };
  }

  if (!graph.some((item) => item?.["@id"] === `${ORIGIN}/#brand`)) graph.push(brandEntity());

  const app = graph.find((item) => item?.["@type"] === "SoftwareApplication");
  if (!app) throw new Error(`Missing SoftwareApplication in ${spec.path}`);

  app.softwareVersion = product.version;
  app.dateModified = product.releaseDate;
  app.releaseNotes = product.releaseUrl;
  app.downloadUrl = product.releaseUrl;
  app.sameAs = [product.repositoryUrl, product.releaseUrl];
  app.operatingSystem = product.operatingSystem;
  app.featureList = product.featureList[spec.lang];
  app.brand = { "@id": `${ORIGIN}/#brand` };
  app.publisher = { "@id": `${ORIGIN}/#organization` };
  app.mainEntityOfPage = { "@id": `${ORIGIN}/${spec.path.replace(/\.html$/, "")}#webpage` };
  app.identifier = [
    { "@type": "PropertyValue", name: "release", value: product.version },
    { "@type": "PropertyValue", name: "sourceCommit", value: product.sourceSha },
  ];

  const webpage = graph.find((item) => item?.["@id"]?.endsWith("#webpage"));
  if (webpage) {
    webpage.mainEntity = { "@id": app["@id"] };
    webpage.about = [
      { "@id": app["@id"] },
      { "@id": `${ORIGIN}/#brand` },
    ];
    webpage.dateModified = product.releaseDate;
  }

  html = replaceJsonLd(html, parsed.match, parsed.data);
  await writeFile(fullPath, html, "utf8");
}

for (const lang of ["fa", "en"]) {
  const fullPath = join(DIST, `${lang}.html`);
  let html = await readFile(fullPath, "utf8");
  const parsed = extractJsonLd(html);
  const graph = graphOf(parsed.data);

  const organization = graph.find((item) => item?.["@id"] === `${ORIGIN}/#organization`);
  if (organization) {
    organization.description = lang === "fa"
      ? "فارسیو برند مادر و مرجع رسمی آنلاین نوشت‌یار و آوایار است؛ محصولات فارسی‌محور برای بهتر نوشتن، خواندن و شنیدن."
      : "Farsio is the parent brand and canonical online authority for NeveshtYar and AvaYar, building Persian-first products for writing, reading and listening.";
    organization.brand = { "@id": `${ORIGIN}/#brand` };
  }

  if (!graph.some((item) => item?.["@id"] === `${ORIGIN}/#brand`)) graph.push(brandEntity());

  graph.push({
    "@type": "ItemList",
    "@id": `${ORIGIN}/${lang}#product-family`,
    name: lang === "fa" ? "خانواده محصولات فارسیو" : "Farsio product family",
    numberOfItems: 2,
    itemListElement: [
      { "@type": "ListItem", position: 1, url: `${ORIGIN}/${lang}/products/neveshtyar`, name: lang === "fa" ? "نوشت‌یار" : "NeveshtYar" },
      { "@type": "ListItem", position: 2, url: `${ORIGIN}/${lang}/products/avayar`, name: lang === "fa" ? "آوایار" : "AvaYar" },
    ],
  });

  html = replaceJsonLd(html, parsed.match, parsed.data);
  await writeFile(fullPath, html, "utf8");
}

console.log("P35 brand authority enrichment completed for Farsio home and product routes.");
