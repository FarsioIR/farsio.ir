import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const graph = JSON.parse(await readFile(`${ROOT}public/topic-clusters.json`, "utf8"));
const entities = JSON.parse(await readFile(`${ROOT}public/ai-entities.json`, "utf8"));
const sitemap = await readFile(`${ROOT}public/sitemap.xml`, "utf8");

const failures = [];
const entityIds = new Set(entities.entities.map((entity) => entity.id));
const seenRoutes = new Set();

for (const cluster of graph.clusters ?? []) {
  if (!cluster.id || !cluster.pillar || !cluster.alternatePillar || !cluster.entity) {
    failures.push(`cluster-contract:${cluster.id ?? "unknown"}`);
    continue;
  }

  if (!entityIds.has(cluster.entity)) failures.push(`missing-entity:${cluster.id}`);
  if (!sitemap.includes(`<loc>${cluster.pillar}</loc>`)) failures.push(`pillar-not-in-sitemap:${cluster.pillar}`);
  if (!sitemap.includes(`<loc>${cluster.alternatePillar}</loc>`)) failures.push(`alternate-pillar-not-in-sitemap:${cluster.alternatePillar}`);
  if (!Array.isArray(cluster.intents) || cluster.intents.length < 4) failures.push(`insufficient-intents:${cluster.id}`);
  if (!Array.isArray(cluster.supportingRoutes) || cluster.supportingRoutes.length < 4) failures.push(`insufficient-support:${cluster.id}`);

  for (const route of cluster.supportingRoutes ?? []) {
    if (!sitemap.includes(`<loc>${route}</loc>`)) failures.push(`support-route-not-in-sitemap:${route}`);
    if (seenRoutes.has(route)) failures.push(`duplicate-support-route:${route}`);
    seenRoutes.add(route);
  }
}

if ((graph.clusters ?? []).length < 2) failures.push("minimum-two-product-clusters");

if (failures.length) {
  console.error(JSON.stringify({ decision: "FAIL", gate: "Farsio topic-cluster authority", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  decision: "PASS",
  gate: "Farsio topic-cluster authority",
  clusters: graph.clusters.length,
  supportingRoutes: seenRoutes.size,
  checks: [
    "stable-product-entity-binding",
    "bilingual-pillar-routes",
    "intent-depth",
    "supporting-route-coverage",
    "sitemap-presence",
    "no-support-route-duplication"
  ]
}, null, 2));
