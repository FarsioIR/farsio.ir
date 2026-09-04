import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

const graph = JSON.parse(await readFile(`${ROOT}public/ai-entities.json`, "utf8"));

const requiredEntityIds = [
  "https://farsio.ir/#organization",
  "https://farsio.ir/#website",
  "https://farsio.ir/fa/products/neveshtyar#software",
  "https://farsio.ir/fa/products/avayar#software",
];

const ids = new Set(graph.entities.map((entity) => entity.id));
for (const id of requiredEntityIds) {
  if (!ids.has(id)) throw new Error(`Missing canonical entity: ${id}`);
}

const productExpectations = [
  {
    slug: "neveshtyar",
    version: "4.9.2",
    repo: "https://github.com/FarsioIR/NeveshtYar",
  },
  {
    slug: "avayar",
    version: "0.6.0 preview-3",
    repo: "https://github.com/FarsioIR/AvaYar",
  },
];

for (const product of productExpectations) {
  const entity = graph.entities.find((item) => item.id.includes(`/products/${product.slug}#software`));
  if (!entity) throw new Error(`Missing product entity: ${product.slug}`);
  if (entity.currentVersion !== product.version) throw new Error(`Version mismatch: ${product.slug}`);
  if (entity.repository !== product.repo) throw new Error(`Repository mismatch: ${product.slug}`);
  if (!entity.releaseNotes?.endsWith(`#release-notes`)) throw new Error(`Missing release-notes anchor: ${product.slug}`);

  for (const lang of ["fa", "en"]) {
    const html = await readFile(`${DIST}${lang === "fa" ? "/fa" : "/en"}/products/${product.slug}.html`, "utf8");
    const canonical = `https://farsio.ir/${lang}/products/${product.slug}`;
    const requiredMarkers = [
      canonical,
      `hreflang="fa"`,
      `hreflang="en"`,
      `application/ld+json`,
      `data-farsio-product-history`,
      `#release-notes`,
    ];

    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) throw new Error(`Missing ${marker} in ${lang}/${product.slug}`);
    }
  }
}

console.log(JSON.stringify({
  decision: "PASS",
  gate: "Farsio SEO/GEO authority graph",
  canonicalEntities: requiredEntityIds.length,
  productEntities: productExpectations.length,
  localizedProductRoutes: productExpectations.length * 2,
  checks: [
    "stable-entity-ids",
    "canonical-product-links",
    "official-repository-provenance",
    "release-notes-anchors",
    "localized-hreflang",
    "structured-data-presence",
  ],
}, null, 2));
