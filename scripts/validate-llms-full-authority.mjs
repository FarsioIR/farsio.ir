import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const llmsFull = fs.readFileSync(path.join(root, 'public/llms-full.txt'), 'utf8');
const discovery = JSON.parse(fs.readFileSync(path.join(root, 'public/ai-discovery.json'), 'utf8'));
const conversion = JSON.parse(fs.readFileSync(path.join(root, 'public/internal-conversion-graph.json'), 'utf8'));

const fail = (message) => {
  console.error(`Full LLM authority validation failed: ${message}`);
  process.exit(1);
};

const requiredMachineEndpoints = [
  'https://farsio.ir/ai-entities.json',
  'https://farsio.ir/ai-discovery.json',
  'https://farsio.ir/internal-conversion-graph.json',
  'https://farsio.ir/llms.txt',
  'https://farsio.ir/llms-full.txt',
  'https://farsio.ir/sitemap.xml',
  'https://farsio.ir/robots.txt'
];

for (const endpoint of requiredMachineEndpoints) {
  if (!llmsFull.includes(endpoint)) fail(`missing machine endpoint: ${endpoint}`);
}

for (const product of discovery.products) {
  const required = [
    product.canonicalFa,
    product.canonicalEn,
    product.releaseNotesFa,
    product.releaseNotesEn,
    product.repository,
    product.officialRelease,
    ...product.intentPages,
    ...product.decisionPages
  ];

  for (const url of required) {
    if (!llmsFull.includes(url)) fail(`${product.id} authority URL missing: ${url}`);
  }
}

for (const flow of conversion.flows) {
  const urls = [
    flow.productFa,
    flow.productEn,
    flow.releaseNotesFa,
    flow.releaseNotesEn,
    ...flow.guides,
    ...flow.intents,
    ...flow.comparisons
  ];

  for (const url of urls) {
    if (!llmsFull.includes(url)) fail(`${flow.product} conversion URL missing: ${url}`);
  }
}

const forbiddenLegacyRoutes = [
  'https://farsio.ir/fa/products/ava\n',
  'https://farsio.ir/en/products/ava\n'
];

for (const legacy of forbiddenLegacyRoutes) {
  if (llmsFull.includes(legacy)) fail(`legacy AvaYar canonical leaked into llms-full: ${legacy.trim()}`);
}

console.log(JSON.stringify({
  decision: 'PASS',
  gate: 'Farsio full LLM authority map',
  products: discovery.products.length,
  conversionFlows: conversion.flows.length,
  checks: [
    'machine-endpoints',
    'product-canonicals',
    'release-provenance',
    'intent-pages',
    'comparison-pages',
    'guide-conversion-graph',
    'no-legacy-avayar-canonical'
  ]
}, null, 2));
