import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const graph = JSON.parse(fs.readFileSync(path.join(root, 'public/internal-conversion-graph.json'), 'utf8'));
const ai = JSON.parse(fs.readFileSync(path.join(root, 'public/ai-discovery.json'), 'utf8'));
const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');

const fail = (message) => {
  console.error(`Internal conversion graph validation failed: ${message}`);
  process.exit(1);
};

if (graph.schemaVersion !== '1.0' || graph.issue !== 25) fail('invalid graph contract');
if (!Array.isArray(graph.flows) || graph.flows.length !== 2) fail('expected exactly two product flows');

const expectedProducts = new Set(['neveshtyar', 'avayar']);
const seenProducts = new Set();
const allUrls = new Set();

for (const flow of graph.flows) {
  if (!expectedProducts.has(flow.product)) fail(`unexpected product: ${flow.product}`);
  if (seenProducts.has(flow.product)) fail(`duplicate product: ${flow.product}`);
  seenProducts.add(flow.product);

  const aiProduct = ai.products.find((product) => product.id === flow.product);
  if (!aiProduct) fail(`missing AI discovery product: ${flow.product}`);
  if (flow.entity !== aiProduct.entity) fail(`entity mismatch: ${flow.product}`);
  if (flow.productFa !== aiProduct.canonicalFa || flow.productEn !== aiProduct.canonicalEn) fail(`canonical mismatch: ${flow.product}`);
  if (flow.releaseNotesFa !== aiProduct.releaseNotesFa || flow.releaseNotesEn !== aiProduct.releaseNotesEn) fail(`release notes mismatch: ${flow.product}`);

  for (const [kind, urls] of [['guides', flow.guides], ['intents', flow.intents], ['comparisons', flow.comparisons]]) {
    if (!Array.isArray(urls) || urls.length < 2) fail(`${flow.product} has insufficient ${kind}`);
    const fa = urls.filter((url) => url.includes('/fa/'));
    const en = urls.filter((url) => url.includes('/en/'));
    if (fa.length !== en.length) fail(`${flow.product} ${kind} is not bilingual`);
    for (const url of urls) {
      if (!url.startsWith('https://farsio.ir/')) fail(`off-domain URL: ${url}`);
      if (allUrls.has(url)) fail(`duplicate conversion URL: ${url}`);
      allUrls.add(url);
      if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`URL missing from sitemap: ${url}`);
    }
  }

  for (const url of [flow.productFa, flow.productEn]) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`product URL missing from sitemap: ${url}`);
  }
}

if (seenProducts.size !== expectedProducts.size) fail('missing product flow');

console.log(JSON.stringify({
  decision: 'PASS',
  gate: 'Farsio internal conversion graph',
  products: graph.flows.length,
  linkedRoutes: allUrls.size,
  checks: [
    'product-entity-binding',
    'canonical-product-binding',
    'release-notes-provenance',
    'bilingual-guide-intent-comparison-flows',
    'sitemap-coverage',
    'no-cross-product-route-duplication'
  ]
}, null, 2));
