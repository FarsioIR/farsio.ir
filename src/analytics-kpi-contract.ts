export const ANALYTICS_KPI_CONTRACT_VERSION = "1.0.0" as const;

export const ANALYTICS_KPI_DIMENSIONS = {
  required: ["product", "locale"],
  optional: ["cta_type", "destination_type"],
  productValues: ["neveshtyar", "avayar"],
  localeValues: ["fa", "en"],
} as const;

export const ANALYTICS_KPIS = {
  product_reach: {
    label: "Product Reach",
    type: "event_count",
    event: "product_view",
    dimensions: ["product", "locale"],
    interpretation:
      "Aggregate product_view event volume segmented by product and locale.",
  },

  product_cta_engagement_rate: {
    label: "Product CTA Engagement Rate",
    type: "aggregate_event_ratio",
    numerator: "product_cta_click",
    denominator: "product_view",
    dimensions: [
      "product",
      "locale",
      "cta_type",
      "destination_type",
    ],
    interpretation:
      "Aggregate product_cta_click events divided by product_view events.",
  },

  install_intent_rate: {
    label: "Install Intent Rate",
    type: "aggregate_event_ratio",
    numerator: "install_intent",
    denominator: "product_view",
    dimensions: [
      "product",
      "locale",
      "cta_type",
      "destination_type",
    ],
    interpretation:
      "Aggregate install_intent events divided by product_view events. This measures intent to obtain a product, not confirmed installation.",
  },

  support_demand_rate: {
    label: "Support Demand Rate",
    type: "aggregate_event_ratio",
    numerator: "support_contact",
    denominator: "product_view",
    dimensions: [
      "product",
      "locale",
      "cta_type",
      "destination_type",
    ],
    interpretation:
      "Aggregate support_contact events divided by product_view events.",
  },

  issue_report_demand_rate: {
    label: "Issue-report Demand Rate",
    type: "aggregate_event_ratio",
    numerator: "github_issue_click",
    denominator: "product_view",
    dimensions: [
      "product",
      "locale",
      "cta_type",
      "destination_type",
    ],
    interpretation:
      "Aggregate github_issue_click events divided by product_view events.",
  },
} as const;

export const ANALYTICS_MEASUREMENT_RULES = {
  aggregation: "event_count",
  ratioSemantics: "aggregate_event_ratio",
  userLevelAttribution: false,
  crossSessionFunnel: false,
  uniqueUserConversionRate: false,
  piiAllowed: false,

  prohibitedClaims: [
    "confirmed_install",
    "purchase",
    "revenue",
    "activation",
    "retention",
    "cross_session_conversion",
    "unique_user_conversion",
  ],
} as const;
