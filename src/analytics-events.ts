export const ANALYTICS_EVENTS = {
  PRODUCT_VIEW: "product_view",
  PRODUCT_CTA_CLICK: "product_cta_click",
  INSTALL_INTENT: "install_intent",
  SUPPORT_CONTACT: "support_contact",
  GITHUB_ISSUE_CLICK: "github_issue_click",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type ProductAnalyticsContext = {
  product: "farsio" | "neveshtyar" | "avayar";
  locale: "fa" | "en";
};

export type ProductAnalyticsEventParameters = ProductAnalyticsContext & {
  cta_type?: string;
  destination_type?: string;
};
