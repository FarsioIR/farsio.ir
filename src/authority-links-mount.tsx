import { createRoot, type Root } from "react-dom/client";
import { Icon } from "@iconify/react";
import type { Lang } from "./i18n";

type RouteKind = "neveshtyar" | "avayar" | "writing-guide" | "reading-guide";

type Context = {
  lang: Lang;
  kind: RouteKind;
};

type MountedAuthorityLinks = {
  key: string;
  host: HTMLDivElement;
  root: Root;
};

const writingGuides = [
  ["finglish-to-persian", "تبدیل فینگلیش به فارسی", "Finglish to Persian"],
  ["persian-keyboard-layout", "اصلاح چیدمان اشتباه کیبورد", "Wrong keyboard layout recovery"],
  ["persian-ai-writing", "هوش مصنوعی برای نوشتن فارسی", "AI for Persian writing"],
] as const;

const readingGuides = [
  ["persian-text-to-speech", "تبدیل متن فارسی به گفتار", "Persian text to speech"],
  ["web-reading-summarization", "خلاصه‌سازی صفحات وب", "Web page summarization"],
] as const;

let mounted: MountedAuthorityLinks | null = null;
let scheduled = false;

const tr = (lang: Lang, fa: string, en: string) => (lang === "fa" ? fa : en);

function routeContext(): Context | null {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const lang: Lang = parts[0] === "en" ? "en" : "fa";

  if (parts[1] === "products" && parts[2] === "neveshtyar") return { lang, kind: "neveshtyar" };
  if (parts[1] === "products" && (parts[2] === "avayar" || parts[2] === "ava")) return { lang, kind: "avayar" };

  if (parts[1] === "guides") {
    const slug = parts[2] ?? "";
    if (writingGuides.some(([key]) => key === slug)) return { lang, kind: "writing-guide" };
    if (readingGuides.some(([key]) => key === slug)) return { lang, kind: "reading-guide" };
  }

  return null;
}

function AuthorityLinks({ context }: { context: Context }) {
  const { lang, kind } = context;
  const isWriting = kind === "neveshtyar" || kind === "writing-guide";
  const productPath = isWriting ? `/${lang}/products/neveshtyar` : `/${lang}/products/avayar`;
  const productName = isWriting ? "NeveshtYar · نوشت‌یار" : "AvaYar · آوایار";
  const guides = isWriting ? writingGuides : readingGuides;

  return (
    <section className="authority-links" aria-labelledby="authority-links-title" data-farsio-authority-links>
      <div className="authority-links__intro">
        <span className="authority-links__eyebrow">
          <Icon icon="solar:link-round-angle-bold" />
          {tr(lang, "مسیرهای مرتبط", "Related paths")}
        </span>
        <h2 id="authority-links-title">
          {tr(lang, "برای ادامه مطالعه", "Continue exploring")}
        </h2>
        <p>
          {tr(
            lang,
            "این صفحه بخشی از خوشه محتوایی رسمی فارسیو است؛ از مسیرهای زیر برای دیدن محصول اصلی و راهنماهای مرتبط استفاده کنید.",
            "This page belongs to an official Farsio topic cluster. Use these links to reach the product pillar and closely related guides."
          )}
        </p>
      </div>

      <div className="authority-links__grid">
        <a className="authority-links__card authority-links__card--primary" href={productPath}>
          <span>{tr(lang, "صفحه اصلی محصول", "Product pillar")}</span>
          <strong>{productName}</strong>
          <Icon icon="solar:arrow-left-linear" />
        </a>

        {guides.map(([slug, fa, en]) => (
          <a className="authority-links__card" href={`/${lang}/guides/${slug}`} key={slug}>
            <span>{tr(lang, "راهنمای مرتبط", "Related guide")}</span>
            <strong>{tr(lang, fa, en)}</strong>
            <Icon icon="solar:arrow-left-linear" />
          </a>
        ))}
      </div>
    </section>
  );
}

function unmountCurrent() {
  if (!mounted) return;
  mounted.root.unmount();
  mounted.host.remove();
  mounted = null;
}

function syncAuthorityLinks() {
  scheduled = false;
  const context = routeContext();
  if (!context) {
    unmountCurrent();
    return;
  }

  const main = document.querySelector<HTMLElement>("main");
  if (!main) return;

  const key = `${context.lang}:${context.kind}:${window.location.pathname}`;
  if (mounted?.key === key && mounted.host.isConnected) return;

  unmountCurrent();

  const host = document.createElement("div");
  host.dataset.farsioAuthorityRoot = key;
  main.appendChild(host);

  const root = createRoot(host);
  root.render(<AuthorityLinks context={context} />);
  mounted = { key, host, root };
}

function scheduleSync() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(syncAuthorityLinks);
}

export function installAuthorityLinksMount() {
  window.addEventListener("popstate", scheduleSync);
  const observer = new MutationObserver(scheduleSync);
  observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
  scheduleSync();
}
