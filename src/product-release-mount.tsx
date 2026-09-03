import { createRoot, type Root } from "react-dom/client";
import type { Lang } from "./i18n";
import { ProductReleaseNotes } from "./product-release-notes";

type ProductType = "neveshtyar" | "ava";

type MountedReleaseNotes = {
  key: string;
  host: HTMLDivElement;
  root: Root;
};

let mounted: MountedReleaseNotes | null = null;
let scheduled = false;

function routeContext(): { lang: Lang; type: ProductType } | null {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const lang: Lang = parts[0] === "en" ? "en" : "fa";
  const slug = parts[1] === "products" ? parts[2] : null;

  if (slug === "neveshtyar") return { lang, type: "neveshtyar" };
  if (slug === "avayar" || slug === "ava") return { lang, type: "ava" };
  return null;
}

function unmountCurrent() {
  if (!mounted) return;
  mounted.root.unmount();
  mounted.host.remove();
  mounted = null;
}

function syncReleaseNotes() {
  scheduled = false;
  const context = routeContext();

  if (!context) {
    unmountCurrent();
    return;
  }

  const anchor = document.querySelector<HTMLElement>(".product-trust-section");
  if (!anchor || !anchor.parentElement) return;

  const key = `${context.lang}:${context.type}`;
  if (mounted?.key === key && mounted.host.isConnected) return;

  unmountCurrent();

  const host = document.createElement("div");
  host.dataset.farsioProductReleaseRoot = key;
  anchor.parentElement.insertBefore(host, anchor);

  const root = createRoot(host);
  root.render(<ProductReleaseNotes lang={context.lang} type={context.type} />);
  mounted = { key, host, root };
}

function scheduleSync() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(syncReleaseNotes);
}

export function installProductReleaseNotesMount() {
  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);

  history.pushState = (...args) => {
    originalPushState(...args);
    scheduleSync();
  };

  history.replaceState = (...args) => {
    originalReplaceState(...args);
    scheduleSync();
  };

  window.addEventListener("popstate", scheduleSync);

  const observer = new MutationObserver(scheduleSync);
  observer.observe(document.getElementById("root") ?? document.body, {
    childList: true,
    subtree: true,
  });

  scheduleSync();
}
