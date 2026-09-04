import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

const clusters = JSON.parse(await readFile(`${ROOT}public/topic-clusters.json`, "utf8"));
const failures = [];
let checked = 0;

function fileFor(url) {
  const { pathname } = new URL(url);
  return `${DIST}${pathname}.html`;
}

for (const cluster of clusters.clusters ?? []) {
  const routes = [cluster.pillar, cluster.alternatePillar, ...(cluster.supportingRoutes ?? [])];

  for (const route of routes) {
    const html = await readFile(fileFor(route), "utf8");
    const markers = [
      "data-farsio-authority-graph",
      `${route}#webpage`,
      cluster.entity,
      "https://farsio.ir/#organization",
      "https://farsio.ir/#website"
    ];

    for (const marker of markers) {
      if (!html.includes(marker)) failures.push(`${route}:missing:${marker}`);
    }

    if (route === cluster.pillar || route === cluster.alternatePillar) {
      for (const support of cluster.supportingRoutes ?? []) {
        if (!html.includes(support)) failures.push(`${route}:missing-support-link:${support}`);
      }
    } else {
      if (!html.includes(cluster.pillar)) failures.push(`${route}:missing-pillar:${cluster.pillar}`);
      if (!html.includes(cluster.alternatePillar)) failures.push(`${route}:missing-alt-pillar:${cluster.alternatePillar}`);
    }

    checked += 1;
  }
}

if (failures.length) {
  console.error(JSON.stringify({ decision: "FAIL", gate: "Farsio route authority", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  decision: "PASS",
  gate: "Farsio route authority",
  routesChecked: checked,
  checks: [
    "inline-authority-jsonld",
    "webpage-to-product-entity-binding",
    "organization-and-website-binding",
    "pillar-to-supporting-route-links",
    "supporting-route-to-pillar-links"
  ]
}, null, 2));
