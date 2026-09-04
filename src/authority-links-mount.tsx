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

type PathLink = readonly [slug: string, fa: string, en: string];

const writingGuides = [
  ["finglish-to-persian", "تبدیل فینگلیش به فارسی", "Finglish to Persian"],
  ["persian-keyboard-layout", "اصلاح چیدمان اشتباه کیبورد", "Wrong keyboard layout recovery"],
  ["persian-ai-writing", "هوش مصنوعی برای نوشتن فارسی", "AI for Persian writing"],
] as const satisfies readonly PathLink[];

const readingGuides = [
  ["persian-text-to-speech", "تبدیل متن فارسی به گفتار", "Persian text to speech"],
  ["web-reading-summarization", "خلاصه‌سازی صفحات وب", "Web page summarization"],
] as const satisfies readonly PathLink[];

const writingIntents = [
  ["finglish-to-persian-workflow", "جریان کار تبدیل فینگلیش به فارسی", "Finglish to Persian workflow"],
  ["persian-ai-writing-assistant", "انتخاب دستیار نگارش فارسی", "Choosing a Persian writing assistant"],
] as const satisfies readonly PathLink[];

const readingIntents = [
  ["persian-text-to-speech-workflow", "جریان کار تبدیل متن فارسی به گفتار", "Persian text-to-speech workflow"],
  ["web-summarization-assistant", "خلاصه‌سازی صفحه وب", "Web summarization assistant"],
  ["english-to-persian-translation", "ترجمه انگلیسی به فارسی برای مطالعه وب", "English to Persian web-reading translation"],
] as const satisfies readonly PathLink[];

const writingComparisons = [
  ["finglish-vs-keyboard-layout", "فینگلیش یا خطای چیدمان کیبورد؟", "Finglish or keyboard-layout error?"],
  ["manual-vs-ai-persian-editing", "ویرایش دستی یا ویرایش با هوش مصنوعی؟", "Manual or AI-assisted Persian editing?"],
  ["ai-writing-vs-human-review", "دستیار نگارش یا بازبینی انسانی؟", "AI writing assistant or human review?"],
] as const satisfies readonly PathLink[];

const readingComparisons = [
  ["tts-engine-vs-browser-fallback", "موتور گفتار یا صدای مرورگر؟", "TTS engine or browser fallback?"],
  ["summary-vs-full-source", "خلاصه یا مطالعه کامل منبع؟", "Summary or full-source reading?"],
  ["translate-vs-summary-vs-read-aloud", "ترجمه، خلاصه یا بلندخوانی؟", "Translate, summarize or read aloud?"],
] as const satisfies readonly PathLink[];

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
  const productPath = isWriting
    ? `/${lang}/products/neveshtyar`
    : `/${lang}/products/avayar`;
  const releasePath = `${productPath}#release-notes`;
  const productName = isWriting
    ? tr(lang, "نوشت‌یار", "NeveshtYar")
    : tr(lang, "آوایار", "AvaYar");
  const guides = isWriting ? writingGuides : readingGuides;
  const intents = isWriting ? writingIntents : readingIntents;
  const comparisons = isWriting ? writingComparisons : readingComparisons;

  return (
    <section className="authority-links" aria-labelledby="authority-links-title" data-farsio-authority-links>
      <div className="authority-links__intro">
        <span className="authority-links__eyebrow">
          <Icon icon="solar:route-bold" />
          {tr(lang, "مسیر تصمیم‌گیری فارسیو", "Farsio decision path")}
        </span>
        <h2 id="authority-links-title">
          {tr(lang, "از راهنما تا تصمیم و سابقه انتشار", "From guidance to decision and release history")}
        </h2>
        <p>
          {tr(
            lang,
            "این مسیر رسمی، راهنماهای کاربردی، پاسخ‌های مبتنی بر نیت جست‌وجو، مقایسه‌های تصمیم‌محور، صفحه محصول و سابقه انتشار را به هم متصل می‌کند تا کاربر بتواند بر اساس نیاز واقعی خود مسیر مناسب را انتخاب کند.",
            "This official path connects practical guides, search-intent answers, decision-focused comparisons, the product page and release provenance so users can choose the right workflow for their actual need."
          )}
        </p>
      </div>

      <div className="authority-links__grid">
        <a className="authority-links__card authority-links__card--primary" href={productPath}>
          <span>{tr(lang, "صفحه اصلی محصول", "Product pillar")}</span>
          <strong>{productName}</strong>
          <Icon icon="solar:arrow-left-linear" />
        </a>

        <a className="authority-links__card authority-links__card--release" href={releasePath}>
          <span>{tr(lang, "سابقه رسمی و تاریخ‌دار", "Official dated provenance")}</span>
          <strong>{tr(lang, "یادداشت‌های انتشار و نقشه راه", "Release notes and roadmap")}</strong>
          <Icon icon="solar:history-bold" />
        </a>

        {guides.map(([slug, fa, en]) => (
          <a className="authority-links__card" href={`/${lang}/guides/${slug}`} key={`guide:${slug}`}>
            <span>{tr(lang, "راهنمای کاربردی", "Practical guide")}</span>
            <strong>{tr(lang, fa, en)}</strong>
            <Icon icon="solar:book-2-bold" />
          </a>
        ))}

        {intents.map(([slug, fa, en]) => (
          <a className="authority-links__card" href={`/${lang}/insights/${slug}`} key={`intent:${slug}`}>
            <span>{tr(lang, "پاسخ بر اساس نیت کاربر", "Intent-led answer")}</span>
            <strong>{tr(lang, fa, en)}</strong>
            <Icon icon="solar:lightbulb-bolt-bold" />
          </a>
        ))}

        {comparisons.map(([slug, fa, en]) => (
          <a className="authority-links__card authority-links__card--decision" href={`/${lang}/compare/${slug}`} key={`compare:${slug}`}>
            <span>{tr(lang, "صفحه تصمیم و مقایسه", "Decision and comparison")}</span>
            <strong>{tr(lang, fa, en)}</strong>
            <Icon icon="solar:sort-vertical-bold" />
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
