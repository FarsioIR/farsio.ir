import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const main = await readFile(`${ROOT}src/main.tsx`, "utf8");
const mount = await readFile(`${ROOT}src/authority-links-mount.tsx`, "utf8");
const css = await readFile(`${ROOT}src/authority-links.css`, "utf8");
const clusters = JSON.parse(await readFile(`${ROOT}public/topic-clusters.json`, "utf8"));

const failures = [];

for (const marker of [
  'installAuthorityLinksMount',
  './authority-links-mount',
  './authority-links.css',
]) {
  if (!main.includes(marker)) failures.push(`main-missing:${marker}`);
}

if (!mount.includes('data-farsio-authority-links')) failures.push('missing-ui-marker');
if (!mount.includes('/products/avayar')) failures.push('missing-canonical-avayar-link');
if (mount.includes('`/${lang}/products/ava`')) failures.push('legacy-ava-product-link');
if (!css.includes('.authority-links__grid')) failures.push('missing-responsive-link-grid');

for (const cluster of clusters.clusters ?? []) {
  for (const url of cluster.supportingRoutes ?? []) {
    const slug = new URL(url).pathname.split('/').pop();
    if (!slug || !mount.includes(slug)) failures.push(`missing-guide-link:${url}`);
  }

  const pillarPath = new URL(cluster.pillar).pathname.replace(/^\/fa\//, '/${lang}/');
  const expected = pillarPath.replace('/${lang}/', '`/${lang}/');
  if (!mount.includes(expected.slice(0, -1))) {
    const productSlug = new URL(cluster.pillar).pathname.split('/').pop();
    if (!productSlug || !mount.includes(`/products/${productSlug}`)) failures.push(`missing-product-link:${cluster.pillar}`);
  }
}

if (failures.length) {
  console.error(JSON.stringify({ decision: "FAIL", gate: "Farsio visible authority links", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  decision: "PASS",
  gate: "Farsio visible authority links",
  clusters: clusters.clusters.length,
  checks: [
    "runtime-mount-installed",
    "canonical-product-links",
    "topic-cluster-guide-links",
    "visible-authority-marker",
    "responsive-link-grid"
  ]
}, null, 2));
