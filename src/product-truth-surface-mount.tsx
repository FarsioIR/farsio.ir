import { Icon } from "@iconify/react";
import { createRoot, type Root } from "react-dom/client";
import type { Lang } from "./i18n";
import { FARSIO_BRAND, getLocalizedProductTruth, type ProductKey } from "./product-truth";

type RouteContext =
  | { kind: "home"; lang: Lang }
  | { kind: "product"; lang: Lang; product: ProductKey }
  | null;

type MountedSurface = {
  key: string;
  host: HTMLDivElement;
  root: Root;
};

let mounted: MountedSurface | null = null;
let scheduled = false;

const tr = (lang: Lang, fa: string, en: string) => (lang === "fa" ? fa : en);

function routeContext(): RouteContext {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const lang: Lang = parts[0] === "en" ? "en" : "fa";

  if (parts.length === 1) return { kind: "home", lang };

  if (parts[1] === "products") {
    if (parts[2] === "neveshtyar") return { kind: "product", lang, product: "neveshtyar" };
    if (parts[2] === "avayar" || parts[2] === "ava") return { kind: "product", lang, product: "avayar" };
  }

  return null;
}

function unmountCurrent() {
  if (!mounted) return;
  mounted.root.unmount();
  mounted.host.remove();
  mounted = null;
}

function syncExistingProductChrome(lang: Lang, product: ProductKey) {
  const truth = getLocalizedProductTruth(product, lang);
  const heroKicker = document.querySelector<HTMLElement>(".pro-hero .hero-kicker");

  if (heroKicker) {
    const desired = tr(lang, `نسخه پایدار · ${truth.version}`, `Stable release · ${truth.version}`);
    const current = heroKicker.textContent?.trim() ?? "";
    if (current !== desired) {
      const icon = heroKicker.querySelector("svg");
      heroKicker.textContent = desired;
      if (icon) heroKicker.prepend(icon);
    }
  }

  const facts = document.querySelector<HTMLElement>(".pro-facts");
  if (facts) {
    const platformText = truth.platforms.join(" · ");
    const labels = lang === "fa"
      ? [["وضعیت", "پایدار"], ["نسخه", truth.version], ["بستر", platformText], ["مرجع", "Release رسمی"]]
      : [["Status", "Stable"], ["Version", truth.version], ["Platforms", platformText], ["Authority", "Official release"]];

    const desiredSignature = labels.map(([label, value]) => `${label}:${value}`).join("|");
    if (facts.dataset.truthSignature !== desiredSignature) {
      facts.replaceChildren(
        ...labels.map(([label, value]) => {
          const item = document.createElement("div");
          const labelEl = document.createElement("span");
          const valueEl = document.createElement("strong");
          labelEl.textContent = label;
          valueEl.textContent = value;
          item.append(labelEl, valueEl);
          return item;
        }),
      );
      facts.dataset.truthSignature = desiredSignature;
    }
  }
}

function syncHomeCards(lang: Lang) {
  const products: ProductKey[] = ["neveshtyar", "avayar"];

  for (const product of products) {
    const selector = product === "avayar" ? ".product-card.product-ava" : ".product-card.product-write";
    const card = document.querySelector<HTMLElement>(selector);
    if (!card) continue;

    const truth = getLocalizedProductTruth(product, lang);
    const state = card.querySelector<HTMLElement>(".product-state");
    const desired = tr(lang, `پایدار · ${truth.version}`, `Stable · ${truth.version}`);
    if (state && state.textContent?.trim() !== desired) state.textContent = desired;
  }
}

function ProductTruthSurface({ lang, product }: { lang: Lang; product: ProductKey }) {
  const truth = getLocalizedProductTruth(product, lang);

  return (
    <section className="truth-surface" data-product-truth={product}>
      <div className="truth-surface-head">
        <div>
          <span className="truth-eyebrow">
            <Icon icon="solar:verified-check-bold" />
            {tr(lang, "قابلیت‌های تاییدشده نسخه فعلی", "Verified capabilities in the current release")}
          </span>
          <h2>{tr(lang, `همه قابلیت‌های ${truth.name} در نسخه ${truth.version}`, `Everything ${truth.name} supports in ${truth.version}`)}</h2>
          <p>
            {tr(
              lang,
              "این فهرست از مرجع واحد محصول در فارسیو ساخته می‌شود تا صفحه محصول، نسخه رسمی و داده‌های SEO/GEO درباره قابلیت‌های فعلی با هم ناسازگار نشوند.",
              "This list is rendered from Farsio's canonical product registry so the product page, official release and SEO/GEO surfaces stay consistent about current capabilities.",
            )}
          </p>
        </div>

        <div className="truth-release-card">
          <span>{tr(lang, "نسخه پایدار", "Stable release")}</span>
          <strong>{truth.version}</strong>
          <small>{truth.releaseDate}</small>
          <a href={truth.releaseUrl} target="_blank" rel="noreferrer">
            {tr(lang, "مشاهده Release رسمی", "View official release")}
            <Icon icon="solar:arrow-up-right-linear" />
          </a>
        </div>
      </div>

      <div className="truth-capability-grid">
        {truth.capabilitiesLocalized.map((capability, index) => (
          <article className="truth-capability-card" key={capability.id}>
            <span className="truth-capability-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{capability.nameText}</h3>
              <p>{capability.descriptionText}</p>
            </div>
            <span className="truth-capability-state">
              <Icon icon="solar:check-circle-bold" />
              {capability.status === "stable" ? tr(lang, "پایدار", "Stable") : tr(lang, "پشتیبانی‌شده", "Supported")}
            </span>
          </article>
        ))}
      </div>

      <div className="truth-evidence-grid">
        <article className="truth-evidence-card">
          <span className="truth-evidence-icon"><Icon icon="solar:shield-check-bold" /></span>
          <div>
            <h3>{tr(lang, "حریم خصوصی و دسترسی‌ها", "Privacy & permissions")}</h3>
            <ul>
              {truth.privacyFactsLocalized.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
          </div>
        </article>

        <article className="truth-evidence-card">
          <span className="truth-evidence-icon"><Icon icon="solar:monitor-smartphone-bold" /></span>
          <div>
            <h3>{tr(lang, "بسترهای نسخه فعلی", "Current release platforms")}</h3>
            <div className="truth-platforms">
              {truth.platforms.map((platform) => <span key={platform}>{platform}</span>)}
            </div>
          </div>
        </article>

        <article className="truth-evidence-card">
          <span className="truth-evidence-icon"><Icon icon="mdi:github" /></span>
          <div>
            <h3>{tr(lang, "منبع فنی قابل‌پیگیری", "Traceable technical source")}</h3>
            <p className="truth-sha"><code>{truth.sourceSha}</code></p>
            <a href={truth.repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </article>
      </div>
    </section>
  );
}

function HomeAuthoritySurface({ lang }: { lang: Lang }) {
  const neveshtyar = getLocalizedProductTruth("neveshtyar", lang);
  const avayar = getLocalizedProductTruth("avayar", lang);

  return (
    <section className="truth-home-authority shell" data-farsio-parent-authority="true">
      <div className="truth-home-copy">
        <span className="truth-eyebrow"><Icon icon="solar:stars-minimalistic-bold" />Farsio · فارسیو</span>
        <h2>{tr(lang, "فارسیو، برند مادر و مرجع رسمی آنلاین نوشت‌یار و آوایار", "Farsio is the parent brand and canonical online authority for NeveshtYar and AvaYar")}</h2>
        <p>{FARSIO_BRAND.role[lang]}</p>
      </div>

      <div className="truth-home-products">
        {[neveshtyar, avayar].map((product) => (
          <a key={product.key} href={`/${lang}/products/${product.key}`} className="truth-home-product">
            <span>{product.categoryText}</span>
            <strong>{product.name}</strong>
            <small>{tr(lang, "نسخه پایدار", "Stable")} · {product.version} · {product.capabilities.length} {tr(lang, "قابلیت تاییدشده", "verified capabilities")}</small>
            <Icon icon="solar:arrow-left-linear" />
          </a>
        ))}
      </div>
    </section>
  );
}

function syncSurface() {
  scheduled = false;
  const context = routeContext();

  if (!context) {
    unmountCurrent();
    return;
  }

  if (context.kind === "home") {
    const anchor = document.querySelector<HTMLElement>("#features");
    if (!anchor?.parentElement) return;

    const key = `home:${context.lang}`;
    if (mounted?.key === key && mounted.host.isConnected) return;

    syncHomeCards(context.lang);
    unmountCurrent();

    const host = document.createElement("div");
    host.dataset.farsioTruthSurfaceRoot = key;
    anchor.parentElement.insertBefore(host, anchor);
    const root = createRoot(host);
    root.render(<HomeAuthoritySurface lang={context.lang} />);
    mounted = { key, host, root };
    return;
  }

  const anchor = document.querySelector<HTMLElement>(".product-trust-section");
  if (!anchor?.parentElement) return;

  const key = `product:${context.lang}:${context.product}`;
  if (mounted?.key === key && mounted.host.isConnected) return;

  syncExistingProductChrome(context.lang, context.product);
  unmountCurrent();

  const host = document.createElement("div");
  host.dataset.farsioTruthSurfaceRoot = key;
  anchor.parentElement.insertBefore(host, anchor);
  const root = createRoot(host);
  root.render(<ProductTruthSurface lang={context.lang} product={context.product} />);
  mounted = { key, host, root };
}

function scheduleSync() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(syncSurface);
}

export function installProductTruthSurfaceMount() {
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
    characterData: true,
  });

  scheduleSync();
}
