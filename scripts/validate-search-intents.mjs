import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const INTENTS_PATH = `${ROOT}public/search-intents.json`;

const data = JSON.parse(await readFile(INTENTS_PATH, "utf8"));
const errors = [];
const ids = new Set();

if (data.schemaVersion !== "1.0") errors.push("schemaVersion must be 1.0");
if (data.issue !== 22) errors.push("issue must be 22");
if (!Array.isArray(data.intents) || data.intents.length < 5) errors.push("at least five intents are required");

for (const intent of data.intents ?? []) {
  if (!intent.id || ids.has(intent.id)) errors.push(`invalid or duplicate intent id: ${intent.id ?? "<missing>"}`);
  ids.add(intent.id);

  if (!['persian-writing', 'persian-reading-speech'].includes(intent.cluster)) {
    errors.push(`invalid cluster for ${intent.id}`);
  }
  if (!['neveshtyar', 'avayar'].includes(intent.product)) {
    errors.push(`invalid product for ${intent.id}`);
  }

  for (const lang of ['fa', 'en']) {
    const localized = intent[lang];
    if (!localized?.title || !localized?.summary) errors.push(`${intent.id} missing ${lang} title/summary`);
    if (!Array.isArray(localized?.questions) || localized.questions.length < 4) {
      errors.push(`${intent.id} requires at least four ${lang} answer-first questions`);
    }
  }

  if (!intent.pillar?.startsWith('https://farsio.ir/fa/products/')) errors.push(`${intent.id} has invalid pillar`);
  if (!intent.supportingGuide?.startsWith('https://farsio.ir/fa/guides/')) errors.push(`${intent.id} has invalid supporting guide`);
}

if (errors.length) {
  console.error(JSON.stringify({ status: 'FAIL', errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  issue: data.issue,
  intents: data.intents.length,
  clusters: [...new Set(data.intents.map((intent) => intent.cluster))].length,
  products: [...new Set(data.intents.map((intent) => intent.product))].length,
  checks: [
    'unique-intent-ids',
    'bilingual-answer-first-contract',
    'minimum-question-depth',
    'product-cluster-binding',
    'pillar-link-contract',
    'supporting-guide-contract'
  ]
}, null, 2));
