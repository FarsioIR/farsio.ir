import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ORIGIN = "https://farsio.ir";
const MODIFIED = "2026-09-03";

const products = {
  neveshtyar: {
    slug: "neveshtyar",
    name: "NeveshtYar",
    alternateName: "نوشت‌یار",
    version: "4.9.2",
    github: "https://github.com/FarsioIR/NeveshtYar",
    release: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
    features: [
      "Finglish correction",
      "Persian and English keyboard-layout recovery",
      "Persian spelling and writing assistance",
      "RTL writing workflows",
      "Chrome and Firefox packages",
    ],
    releases: [
      {
        date: "2026-08-17",
        version: "4.9.1",
        title: "Public Farsi Smart Assistant milestone",
        summary: "Public Chromium and Firefox packages plus Mozilla reviewer-source provenance before the canonical NeveshtYar identity.",
        url: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.1",
      },
      {
        date: "2026-08-26",
        version: "4.9.2",
        title: "Canonical NeveshtYar release",
        summary: "Canonical NeveshtYar identity with Chrome 15/15, Firefox 15/15, 193/193 deterministic tests and extension-store audit PASS.",
        url: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
      },
    ],
    currentStage: "Store readiness, privacy and permission hardening, and continued Persian writing quality improvements.",
  },
  avayar: {
    slug: "avayar",
    name: "AvaYar",
    alternateName: "آوایار",
    version: "0.6.0 preview-3",
    github: "https://github.com/FarsioIR/AvaYar",
    release: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0-preview-3",
    features: [
      "Web content reading",
      "Live English-to-Persian translation",
      "Persian-first summarization",
      "Persian browser speech fallback",
      "Manifest V3 Chrome and Edge installable RC",
      "Cloudflare Workers online runtime",
    ],
    releases: [
      {
        date: "2026-08-30",
        version: "Brand v1",
        title: "Canonical AvaYar identity",
        summary: "Canonical product name, mark and public product route established for Farsio's Persian reading and listening assistant.",
        url: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-brand-v1-2026-08-30",
      },
      {
        date: "2026-09-03",
        version: "0.6.0 preview-3",
        title: "First installable online-runtime RC",
        summary: "Cloudflare preview runtime, English-to-Persian Workers AI E2E PASS, Persian browser speech fallback contract PASS, and installable Chrome/Edge Manifest V3 RC.",
        url: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0-preview-3",
      },
    ],
    currentStage: "Real-browser RC acceptance, store readiness, privacy and permission hardening, runtime reliability and rate limiting.",
  },
};

function releaseGraph(product, lang) {
  const canonical = `${ORIGIN}/${lang}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${canonical}#software`,
        name: product.name,
        alternateName: product.alternateName,
        url: canonical,
        softwareVersion: product.version,
        dateModified: MODIFIED,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Browser",
        featureList: product.features,
        releaseNotes: `${canonical}#release-notes`,
        sameAs: [product.github, product.release],
        publisher: { "@id": `${ORIGIN}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#release-notes`,
        name: lang === "fa" ? `تاریخچه انتشار ${product.alternateName}` : `${product.name} release history`,
        description: product.currentStage,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: product.releases.length,
        itemListElement: product.releases.map((release, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: `${product.name} ${release.version} — ${release.title}`,
            datePublished: release.date,
            description: release.summary,
            url: release.url,
          },
        })),
      },
    ],
  };
}

function inject(html, graph) {
  const marker = '<script type="application/ld+json" data-farsio-product-history>';
  if (html.includes(marker)) return html;

  const block = `    ${marker}\n${JSON.stringify(graph, null, 2)}\n    </script>\n`;
  if (!html.includes("</head>")) throw new Error("Built product HTML is missing </head>");
  return html.replace("</head>", `${block}  </head>`);
}

for (const [key, product] of Object.entries(products)) {
  for (const lang of ["fa", "en"]) {
    const file = `${DIST}/${lang}/products/${product.slug}.html`;
    const html = await readFile(file, "utf8");
    await writeFile(file, inject(html, releaseGraph(product, lang)), "utf8");
    console.log(`GEO release graph injected: ${lang}/${key}`);
  }
}
