import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

const helper = read("src/analytics-interactions.ts");
const site = read("src/site-pages.tsx");
const ava = read("src/avayar-store-pages.tsx");

const failures = [];

function requireText(source, text, label) {
  if (!source.includes(text)) {
    failures.push(`${label}: missing ${JSON.stringify(text)}`);
  }
}

requireText(
  helper,
  'trackProductEvent(event, {',
  "central interaction dispatcher",
);

for (const field of [
  "product,",
  "locale,",
  "cta_type: ctaType",
  "destination_type: destinationType",
]) {
  requireText(helper, field, "central interaction context");
}

for (const event of [
  '"install_intent"',
  '"product_cta_click"',
]) {
  requireText(site, event, "product detail binding");
}

for (const event of [
  '"github_issue_click"',
  '"support_contact"',
]) {
  requireText(ava, event, "AvaYar support binding");
}

requireText(site, 'ctaType: "release_download"', "install CTA semantics");
requireText(site, 'destinationType: "github_release"', "install destination");
requireText(site, 'ctaType: "repository"', "repository CTA semantics");
requireText(site, 'destinationType: "github_repository"', "repository destination");

requireText(ava, 'ctaType: "issue_report"', "issue CTA semantics");
requireText(ava, 'destinationType: "github_issues"', "issue destination");
requireText(ava, 'ctaType: "support_contact"', "support CTA semantics");
requireText(ava, 'destinationType: "farsio_contact"', "support destination");

const combined = `${helper}\n${site}\n${ava}`;

for (const forbidden of [
  "user_id",
  "userId",
  "phone:",
  "email:",
]) {
  if (combined.includes(forbidden)) {
    failures.push(`PII guard: forbidden analytics field ${forbidden}`);
  }
}

if (failures.length > 0) {
  console.error(
    JSON.stringify(
      {
        decision: "FAIL",
        failures,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      decision: "PASS",
      bindings: {
        install_intent: true,
        product_cta_click: true,
        github_issue_click: true,
        support_contact: true,
      },
      context: [
        "product",
        "locale",
        "cta_type",
        "destination_type",
      ],
      piiGuard: true,
    },
    null,
    2,
  ),
);
