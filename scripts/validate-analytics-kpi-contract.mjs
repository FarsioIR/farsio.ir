import fs from "node:fs";

const contract = fs.readFileSync(
  "src/analytics-kpi-contract.ts",
  "utf8",
);

const events = fs.readFileSync(
  "src/analytics-events.ts",
  "utf8",
);

const failures = [];

function requireContract(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const requiredEvents = [
  "product_view",
  "product_cta_click",
  "install_intent",
  "support_contact",
  "github_issue_click",
];

const requiredKpis = [
  "product_reach",
  "product_cta_engagement_rate",
  "install_intent_rate",
  "support_demand_rate",
  "issue_report_demand_rate",
];

for (const event of requiredEvents) {
  requireContract(
    events.includes(event),
    `canonical analytics event missing: ${event}`,
  );

  requireContract(
    contract.includes(event),
    `KPI contract does not reference event: ${event}`,
  );
}

for (const kpi of requiredKpis) {
  requireContract(
    contract.includes(kpi),
    `KPI definition missing: ${kpi}`,
  );
}

requireContract(
  contract.includes(
    'ANALYTICS_KPI_CONTRACT_VERSION = "1.0.0"',
  ),
  "versioned KPI contract missing",
);

requireContract(
  contract.includes('"product", "locale"'),
  "required product/locale segmentation missing",
);

requireContract(
  contract.includes('"cta_type"') &&
    contract.includes('"destination_type"'),
  "CTA dimensions missing",
);

requireContract(
  contract.includes(
    'ratioSemantics: "aggregate_event_ratio"',
  ),
  "aggregate event ratio semantics missing",
);

requireContract(
  contract.includes("userLevelAttribution: false"),
  "user-level attribution must remain disabled",
);

requireContract(
  contract.includes("crossSessionFunnel: false"),
  "cross-session funnel inference must remain disabled",
);

requireContract(
  contract.includes("uniqueUserConversionRate: false"),
  "unique-user conversion claim must remain disabled",
);

requireContract(
  contract.includes("piiAllowed: false"),
  "PII must remain prohibited",
);

for (const prohibited of [
  "confirmed_install",
  "purchase",
  "revenue",
  "activation",
  "retention",
  "cross_session_conversion",
  "unique_user_conversion",
]) {
  requireContract(
    contract.includes(`"${prohibited}"`),
    `prohibited claim guard missing: ${prohibited}`,
  );
}

requireContract(
  contract.includes(
    "This measures intent to obtain a product, not confirmed installation.",
  ),
  "install intent interpretation must explicitly reject confirmed-install semantics",
);

if (
  /user_id|userId|email|phone|full.?name/i.test(contract)
) {
  failures.push(
    "PII-like identity field detected in KPI contract",
  );
}

if (failures.length) {
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
      version: "1.0.0",
      kpis: requiredKpis.length,
      requiredEvents,
      dimensions: {
        required: ["product", "locale"],
        optional: ["cta_type", "destination_type"],
      },
      semantics: "aggregate_event_ratio",
      userLevelAttribution: false,
      crossSessionFunnel: false,
      piiAllowed: false,
    },
    null,
    2,
  ),
);
