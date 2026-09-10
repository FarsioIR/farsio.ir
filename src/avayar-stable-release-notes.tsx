import { Icon } from "@iconify/react";
import type { Lang } from "./i18n";

const tr = (lang: Lang, fa: string, en: string) => (lang === "fa" ? fa : en);

const STABLE_RELEASE = "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0";

export function AvaYarStableReleaseNotes({ lang }: { lang: Lang }) {
  const features = [
    tr(lang, "خواندن متن کامل صفحه و حالت خلاصه فارسی", "Full-page reading and Persian Summary mode"),
    tr(lang, "آماده‌سازی و ترجمه واقعی انگلیسی به فارسی", "Live English-to-Persian preparation and translation"),
    tr(lang, "تبدیل متن فارسی به گفتار عصبی با دو صدای زن و مرد", "Persian neural text-to-speech with female and male voices"),
    tr(lang, "صدای زن Sulafat و صدای مرد Iapetus", "Sulafat female voice and Iapetus male voice"),
    tr(lang, "پخش تدریجی برای شروع سریع‌تر صدا بدون انتظار برای آماده‌شدن کل متن", "Progressive playback for faster time-to-first-audio without waiting for the whole text"),
    tr(lang, "کنترل‌های پخش، مکث، ادامه و توقف", "Play, Pause, Resume and Stop controls"),
    tr(lang, "بسته Manifest V3 تأییدشده برای Chrome و Edge", "Browser-accepted Manifest V3 package for Chrome and Edge"),
  ];

  const acceptance = [
    tr(lang, "خلاصه + صدای زن: قبول", "Summary + female voice: PASS"),
    tr(lang, "خلاصه + صدای مرد: قبول", "Summary + male voice: PASS"),
    tr(lang, "متن کامل + صدای زن: قبول", "Full text + female voice: PASS"),
    tr(lang, "متن کامل + صدای مرد: قبول", "Full text + male voice: PASS"),
    tr(lang, "پخش تدریجی و کنترل‌های پخش: قبول", "Progressive playback and playback controls: PASS"),
  ];

  return (
    <section className="pro-section product-release-section" id="release-notes" data-farsio-product-history="avayar-0.6.0-stable">
      <div className="pro-section-heading">
        <span>{tr(lang, "تاریخچه محصول", "Product history")}</span>
        <h2>{tr(lang, "آوایار ۰.۶.۰ — نسخه پایدار", "AvaYar 0.6.0 — Stable")}</h2>
        <p>{tr(lang,
          "نسخه پایدار آوایار پس از پذیرش واقعی در مرورگر منتشر شد؛ مسیر فعلی محصول از نسخه آزمایشی عبور کرده و وارد مرحله انتشار فروشگاهی شده است.",
          "AvaYar Stable was published after real-browser acceptance. The product has moved beyond RC and is now in browser-store distribution readiness."
        )}</p>
      </div>

      <div className="product-release-timeline">
        <article className="product-release-card is-released">
          <div className="product-release-meta">
            <span className="product-release-state">{tr(lang, "منتشر شده", "Released")}</span>
            <time dateTime="2026-09-10">{tr(lang, "۱۹ شهریور ۱۴۰۵ · ۱۰ سپتامبر ۲۰۲۶", "10 Sep 2026")}</time>
          </div>
          <h3>{tr(lang, "نسخه پایدار ۰.۶.۰", "0.6.0 Stable")}</h3>
          <p>{tr(lang,
            "اولین نسخه پایدار و تأییدشده آوایار برای خواندن، ترجمه، خلاصه‌سازی و شنیدن محتوای وب با صدای فارسی.",
            "The first browser-accepted Stable AvaYar release for reading, translating, summarizing and listening to web content in Persian."
          )}</p>
          <ul>{features.map((feature) => <li key={feature}><Icon icon="solar:check-circle-bold" />{feature}</li>)}</ul>
          <a href={STABLE_RELEASE} target="_blank" rel="noreferrer">
            {tr(lang, "مشاهده انتشار رسمی ۰.۶.۰", "View official 0.6.0 release")}
            <Icon icon="solar:arrow-up-right-linear" />
          </a>
        </article>

        <article className="product-release-card is-released">
          <div className="product-release-meta"><span className="product-release-state">{tr(lang, "پذیرش مرورگر", "Browser acceptance")}</span></div>
          <h3>{tr(lang, "تأیید روی سناریوهای واقعی", "Validated on real browser workflows")}</h3>
          <ul>{acceptance.map((item) => <li key={item}><Icon icon="solar:verified-check-bold" />{item}</li>)}</ul>
        </article>

        <article className="product-release-card is-active">
          <div className="product-release-meta"><span className="product-release-state">{tr(lang, "مرحله فعلی", "Current stage")}</span></div>
          <h3>{tr(lang, "آمادگی انتشار در فروشگاه مرورگر", "Browser-store distribution readiness")}</h3>
          <p>{tr(lang,
            "پس از تثبیت نسخه پایدار، تمرکز روی انتشار رسمی در فروشگاه‌های مرورگر، متادیتا، حریم خصوصی و کاهش اصطکاک نصب است.",
            "With Stable validated, current work focuses on official browser-store distribution, metadata, privacy and lower-friction installation."
          )}</p>
        </article>

        <article className="product-release-card is-planned">
          <div className="product-release-meta"><span className="product-release-state">{tr(lang, "مسیر آینده", "Next")}</span></div>
          <h3>{tr(lang, "کیفیت و پوشش گسترده‌تر", "Broader quality and compatibility")}</h3>
          <p>{tr(lang,
            "نسخه‌های بعدی روی کیفیت ترجمه و خلاصه فارسی، سازگاری بیشتر با صفحات واقعی وب و پایداری تجربه صوتی تمرکز می‌کنند.",
            "Future releases will focus on stronger Persian translation and summarization, broader real-world page compatibility and audio reliability."
          )}</p>
        </article>
      </div>
    </section>
  );
}
