import fs from "node:fs";

const source = fs.readFileSync("src/analytics-events.ts", "utf8");

const required = [
  "product_view",
  "product_cta_click",
  "install_intent",
  "support_contact",
  "github_issue_click",
];

const failures = required.filter(
  (event) => !source.includes(event),
);

if (failures.length) {
  console.error("Analytics event contract FAIL");
  failures.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

if (/email|phone|userid|user_id/i.test(source)) {
  console.error("PII field detected");
  process.exit(1);
}

console.log(JSON.stringify({
  decision: "PASS",
  events: required.length,
  piiGuard: true
}, null, 2));
