import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { initializeAnalytics, trackPageView } from "./analytics";

export function AnalyticsRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();

    const path =
      `${location.pathname}${location.search}${location.hash}`;

    trackPageView(path, document.title);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
