import fs from "node:fs";

const analytics = fs.readFileSync("src/analytics.ts", "utf8");
const tracker = fs.readFileSync("src/analytics-route-tracker.tsx", "utf8");
const main = fs.readFileSync("src/main.tsx", "utf8");

const failures = [];

function requireContract(condition, message) {
  if (!condition) failures.push(message);
}

requireContract(
  analytics.includes('GA4_MEASUREMENT_ID = "G-EXBSWLJBDX"'),
  "canonical Measurement ID missing",
);

requireContract(
  analytics.includes("send_page_view: false"),
  "automatic GA4 page_view must be disabled",
);

requireContract(
  analytics.includes('"event", "page_view"'),
  "explicit SPA page_view event missing",
);

requireContract(
  tracker.includes("useLocation"),
  "React Router location tracking missing",
);

requireContract(
  !analytics.includes("history.pushState") &&
    !analytics.includes("history.replaceState"),
  "analytics must not monkey-patch browser history",
);

requireContract(
  main.includes("<AnalyticsRouteTracker />"),
  "AnalyticsRouteTracker is not mounted",
);

requireContract(
  (analytics.match(/googletagmanager\.com\/gtag\/js/g) || []).length === 1,
  "expected exactly one canonical gtag loader",
);

requireContract(
  !analytics.match(/user(_|-)?id|email|phone|full.?name/i),
  "analytics source contains a prohibited identity field",
);

if (failures.length) {
  console.error("GA4 analytics contract: FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      decision: "PASS",
      measurementId: "G-EXBSWLJBDX",
      routing: "react-router-useLocation",
      automaticPageView: false,
      explicitSpaPageView: true,
      historyMonkeyPatch: false,
      duplicateLoaderGuard: true,
      piiFieldGuard: true
    },
    null,
    2,
  ),
);
