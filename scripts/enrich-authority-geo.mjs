import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ORIGIN = "https://farsio.ir";

const entities = JSON.parse(await readFile(`${ROOT}public/ai-entities.json`, "utf8"));
const clusters = JSON.parse(await readFile(`${ROOT}public/topic-clusters.json`, "utf8"));

const entityMap = new Map(entities.entities.map((entity) => [entity.id, entity]));
const touched = [];

function fileFor(url) {
  const { pathname } = new URL(url);
  return `${DIST}${pathname}.html`;
}

function graphFor(route, cluster) {
  const product = entityMap.get(cluster.entity);
  if (!product) throw new Error(`Unknown entity ${cluster.entity}`);

  const productLinks = [cluster.pillar, cluster.alternatePillar];
  const isPillar = productLinks.includes(route);
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${route}#webpage`,
      url: route,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: { "@id": product.id },
      mentions: [
        { "@id": `${ORIGIN}/#organization` },
        { "@id": product.id }
      ],
      relatedLink: isPillar ? cluster.supportingRoutes : productLinks
    }
  ];

  if (isPillar) {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": product.id,
      name: product.name,
      alternateName: product.alternateName,
      url: product.canonical,
      softwareVersion: product.currentVersion,
      publisher: { "@id": product.publisher },
      releaseNotes: product.releaseNotes,
      sameAs: [product.repository, product.officialRelease],
      subjectOf: cluster.supportingRoutes.map((url) => ({ "@id": `${url}#webpage` }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

for (const cluster of clusters.clusters ?? []) {
  const routes = [cluster.pillar, cluster.alternatePillar, ...(cluster.supportingRoutes ?? [])];
  for (const route of routes) {
    const file = fileFor(route);
    let html = await readFile(file, "utf8");
    const marker = "data-farsio-authority-graph";
    if (html.includes(marker)) throw new Error(`Authority graph already present: ${route}`);

    const payload = JSON.stringify(graphFor(route, cluster), null, 2).replaceAll("</script", "<\\/script");
    const script = `    <script type="application/ld+json" ${marker}>\n${payload}\n    </script>\n`;
    if (!html.includes("</head>")) throw new Error(`Missing </head>: ${route}`);
    html = html.replace("</head>", `${script}</head>`);
    await writeFile(file, html, "utf8");
    touched.push(route);
  }
}

console.log(JSON.stringify({
  decision: "PASS",
  task: "Farsio route-level authority enrichment",
  routesEnriched: touched.length,
  clusters: clusters.clusters?.length ?? 0
}, null, 2));
