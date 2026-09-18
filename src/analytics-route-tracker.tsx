import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  getAnalyticsContext,
  initializeAnalytics,
  trackPageView,
  trackProductEvent,
} from "./analytics";

export function AnalyticsRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();

    const path =
      `${location.pathname}${location.search}${location.hash}`;

    trackPageView(path, document.title);

    const context = getAnalyticsContext(path);

    if (context.product !== "farsio") {
      trackProductEvent(
        "product_view",
        context,
      );
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}
