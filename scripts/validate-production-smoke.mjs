const base = 'https://farsio.ir';

const routes = [
  '/fa',
  '/en',
  '/fa/products/neveshtyar',
  '/en/products/neveshtyar',
  '/fa/products/avayar',
  '/en/products/avayar',
  '/fa/insights/finglish-to-persian-workflow',
  '/en/insights/finglish-to-persian-workflow',
  '/fa/insights/persian-ai-writing-assistant',
  '/en/insights/persian-ai-writing-assistant',
  '/fa/insights/persian-text-to-speech-workflow',
  '/en/insights/persian-text-to-speech-workflow',
  '/fa/insights/web-summarization-assistant',
  '/en/insights/web-summarization-assistant',
  '/fa/insights/english-to-persian-translation',
  '/en/insights/english-to-persian-translation',
  '/fa/compare/finglish-vs-keyboard-layout',
  '/en/compare/finglish-vs-keyboard-layout',
  '/fa/compare/manual-vs-ai-persian-editing',
  '/en/compare/manual-vs-ai-persian-editing',
  '/fa/compare/ai-writing-vs-human-review',
  '/en/compare/ai-writing-vs-human-review',
  '/fa/compare/tts-engine-vs-browser-fallback',
  '/en/compare/tts-engine-vs-browser-fallback',
  '/fa/compare/summary-vs-full-source',
  '/en/compare/summary-vs-full-source',
  '/fa/compare/translate-vs-summary-vs-read-aloud',
  '/en/compare/translate-vs-summary-vs-read-aloud',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
  '/ai-entities.json',
  '/ai-discovery.json',
  '/internal-conversion-graph.json'
];

const failures = [];
const responses = new Map();

for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, {
      redirect: 'follow',
      headers: { 'user-agent': 'Farsio-Production-Smoke/1.0' }
    });
    const text = await response.text();
    responses.set(route, { response, text });
    if (!response.ok) failures.push(`${route}:http-${response.status}`);
  } catch (error) {
    failures.push(`${route}:network:${error instanceof Error ? error.message : String(error)}`);
  }
}

const requireText = (route, marker, label = marker) => {
  const entry = responses.get(route);
  if (!entry?.text.includes(marker)) failures.push(`${route}:missing-${label}`);
};

for (const [lang, product] of [['fa', 'neveshtyar'], ['en', 'neveshtyar'], ['fa', 'avayar'], ['en', 'avayar']]) {
  const route = `/${lang}/products/${product}`;
  requireText(route, `https://farsio.ir/${lang}/products/${product}`, 'canonical');
  requireText(route, 'hreflang', 'hreflang');
  requireText(route, 'application/ld+json', 'jsonld');
  requireText(route, 'data-farsio-product-history', 'release-history');
}

for (const route of routes.filter((route) => route.includes('/insights/'))) {
  requireText(route, 'application/ld+json', 'jsonld');
  requireText(route, 'FAQPage', 'faq-schema');
  requireText(route, 'data-farsio-intent-page', 'intent-marker');
}

for (const route of routes.filter((route) => route.includes('/compare/'))) {
  requireText(route, 'application/ld+json', 'jsonld');
  requireText(route, 'FAQPage', 'faq-schema');
}

requireText('/llms.txt', 'https://farsio.ir/ai-discovery.json', 'ai-discovery-reference');
requireText('/llms-full.txt', 'https://farsio.ir/internal-conversion-graph.json', 'conversion-graph-reference');
requireText('/ai-discovery.json', '"products"', 'products');
requireText('/internal-conversion-graph.json', '"flows"', 'flows');
requireText('/sitemap.xml', 'https://farsio.ir/fa/compare/finglish-vs-keyboard-layout', 'comparison-sitemap');
requireText('/sitemap.xml', 'https://farsio.ir/fa/insights/finglish-to-persian-workflow', 'intent-sitemap');

if (failures.length) {
  console.error(JSON.stringify({
    decision: 'FAIL',
    gate: 'Farsio production custom-domain smoke',
    checkedRoutes: routes.length,
    failures
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  decision: 'PASS',
  gate: 'Farsio production custom-domain smoke',
  checkedRoutes: routes.length,
  checks: [
    'http-200',
    'product-canonical-hreflang-jsonld-release-history',
    'intent-jsonld-faq-marker',
    'comparison-jsonld-faq',
    'llms-discovery-references',
    'machine-readable-discovery-endpoints',
    'sitemap-intent-comparison-coverage'
  ]
}, null, 2));
