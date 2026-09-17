export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function hasMeasurementId() {
  return Boolean(GA4_MEASUREMENT_ID);
}

export function initializeAnalytics() {
  if (!isBrowser() || initialized || !hasMeasurementId()) return;

  initialized = true;
  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());

  // React Router owns page_view dispatch so GA4 must not emit an
  // automatic initial page_view that could duplicate SPA measurement.
  window.gtag("config", GA4_MEASUREMENT_ID, {
    send_page_view: false,
  });

  if (!document.querySelector(`script[data-farsio-ga4="${GA4_MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    script.dataset.farsioGa4 = GA4_MEASUREMENT_ID;
    document.head.appendChild(script);
  }
}

export function trackPageView(path: string, title: string) {
  if (!isBrowser() || !hasMeasurementId()) return;

  initializeAnalytics();

  window.gtag?.("event", "page_view", {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: title,
  });
}

export function getAnalyticsContext(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "fa";

  let product: "neveshtyar" | "avayar" | "farsio" = "farsio";

  if (parts[1] === "products" && parts[2] === "neveshtyar") {
    product = "neveshtyar";
  } else if (parts[1] === "products" && parts[2] === "avayar") {
    product = "avayar";
  }

  return { locale, product };
}

export type ProductEventName =
  | "product_cta_click"
  | "install_intent"
  | "support_contact"
  | "github_issue_click";

type ProductEventParameters = {
  product: "farsio" | "neveshtyar" | "avayar";
  locale: "fa" | "en";
  cta_type?: string;
  destination_type?: string;
};

export function trackProductEvent(
  name: ProductEventName,
  parameters: ProductEventParameters,
) {
  if (!isBrowser() || !hasMeasurementId()) return;

  initializeAnalytics();

  window.gtag?.("event", name, parameters);
}
