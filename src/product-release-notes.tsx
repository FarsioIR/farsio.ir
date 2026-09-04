import { Icon } from "@iconify/react";
import type { Lang } from "./i18n";

type ReleaseState = "released" | "preview" | "active" | "planned";
type ReleaseItem = {
  date: string;
  version: string;
  title: string;
  summary: string;
  state: ReleaseState;
  features: string[];
  href?: string;
};

const tr = (lang: Lang, fa: string, en: string) => (lang === "fa" ? fa : en);

function stateLabel(lang: Lang, state: ReleaseState) {
  const labels: Record<ReleaseState, [string, string]> = {
    released: ["منتشر شده", "Released"],
    preview: ["نسخه آزمایشی", "Preview / RC"],
    active: ["در حال توسعه", "In development"],
    planned: ["در برنامه", "Planned"],
  };
  return tr(lang, ...labels[state]);
}

function releases(lang: Lang, type: "neveshtyar" | "ava"): ReleaseItem[] {
  if (type === "neveshtyar") {
    return [
      {
        date: tr(lang, "۲۶ مرداد ۱۴۰۵ · ۱۷ اوت ۲۰۲۶", "17 Aug 2026"),
        version: "v4.9.1",
        title: tr(lang, "تثبیت نسخه عمومی دستیار هوشمند فارسی", "Public Farsi Smart Assistant milestone"),
        summary: tr(lang, "یکی از آخرین انتشارهای محصول با هویت پیشین؛ این نسخه بخشی از سابقه رسمی و قابل‌ردیابی نوشت‌یار است.", "One of the final public releases under the earlier Farsi Smart Assistant identity; it remains part of NeveshtYar's official provenance."),
        state: "released",
        features: [
          tr(lang, "بسته‌های نصب Chromium و Firefox", "Chromium and Firefox installable packages"),
          tr(lang, "بسته منبع ویژه بررسی Mozilla Add-ons", "AMO reviewer-source package"),
          tr(lang, "ثبت رسمی نسخه و دارایی‌های قابل دریافت در GitHub", "Official GitHub release and downloadable artifacts"),
        ],
        href: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.1",
      },
      {
        date: tr(lang, "۴ شهریور ۱۴۰۵ · ۲۶ اوت ۲۰۲۶", "26 Aug 2026"),
        version: "v4.9.2",
        title: tr(lang, "انتشار رسمی با هویت نوشت‌یار", "Canonical NeveshtYar release"),
        summary: tr(lang, "هویت رسمی محصول به نوشت‌یار تثبیت شد و بسته انتشار چندمرورگری با کنترل کیفیت کامل آماده شد.", "The canonical NeveshtYar identity was established with a fully validated multi-browser release package."),
        state: "released",
        features: [
          tr(lang, "قبولی ۱۵ از ۱۵ سناریوی پذیرش Chrome", "Chrome acceptance: 15/15 PASS"),
          tr(lang, "قبولی ۱۵ از ۱۵ سناریوی پذیرش Firefox", "Firefox acceptance: 15/15 PASS"),
          tr(lang, "قبولی ۱۹۳ از ۱۹۳ تست قطعی", "193/193 deterministic tests PASS"),
          tr(lang, "قبولی ممیزی آمادگی فروشگاه افزونه‌ها", "Extension-store audit PASS"),
          tr(lang, "خروجی‌های مستقل Chromium، Firefox و منبع AMO", "Deterministic Chromium, Firefox and AMO source artifacts"),
        ],
        href: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
      },
      {
        date: tr(lang, "مرحله فعلی", "Current stage"),
        version: tr(lang, "آمادگی انتشار فروشگاهی", "Store readiness"),
        title: tr(lang, "آماده‌سازی برای دسترسی ساده‌تر کاربران", "Preparing easier user distribution"),
        summary: tr(lang, "تمرکز فعلی روی مسیر انتشار رسمی در فروشگاه‌های مرورگر، حفظ کیفیت نسخه و کاهش اصطکاک نصب است.", "Current work focuses on official browser-store distribution, release quality and reducing installation friction."),
        state: "active",
        features: [
          tr(lang, "بازبینی نهایی متادیتا و الزامات فروشگاه‌ها", "Final store metadata and policy review"),
          tr(lang, "سخت‌گیری بیشتر روی مجوزها و حریم خصوصی", "Further permission and privacy hardening"),
          tr(lang, "بهبود کیفیت اصلاح فینگلیش، املا و جریان‌های راست‌به‌چپ", "Quality improvements for Finglish, spelling and RTL workflows"),
        ],
      },
      {
        date: tr(lang, "مسیر آینده", "Next"),
        version: tr(lang, "پس از انتشار فروشگاهی", "Post-store"),
        title: tr(lang, "نوشتن فارسی سریع‌تر و دقیق‌تر", "Faster, more accurate Persian writing"),
        summary: tr(lang, "پس از تثبیت انتشار، توسعه روی کیفیت پیشنهادها، سازگاری بیشتر با ویرایشگرهای وب و تجربه کم‌اصطکاک‌تر ادامه پیدا می‌کند.", "After distribution stabilizes, work continues on suggestion quality, broader web-editor compatibility and lower-friction writing workflows."),
        state: "planned",
        features: [
          tr(lang, "پوشش بهتر ویرایشگرها و فرم‌های پیچیده وب", "Broader support for complex web editors and forms"),
          tr(lang, "بهبود پیشنهادهای نگارشی فارسی با کنترل کامل کاربر", "Better Persian writing suggestions with full user control"),
          tr(lang, "اندازه‌گیری کیفیت و پایداری در نسخه‌های بعدی", "Quality and reliability measurement in future releases"),
        ],
      },
    ];
  }

  return [
    {
      date: tr(lang, "۸ شهریور ۱۴۰۵ · ۳۰ اوت ۲۰۲۶", "30 Aug 2026"),
      version: tr(lang, "هویت رسمی v1", "Brand v1"),
      title: tr(lang, "تثبیت هویت رسمی آوایار", "Canonical AvaYar identity"),
      summary: tr(lang, "نام، نشان و مسیر رسمی محصول برای دستیار خواندن و شنیدن فارسی تثبیت شد.", "AvaYar's canonical name, product mark and public identity were established for the Persian reading and listening assistant."),
      state: "released",
      features: [
        tr(lang, "نشان رسمی و دارایی‌های برند آوایار", "Canonical AvaYar product mark and brand assets"),
        tr(lang, "هماهنگی مخزن و مسیر رسمی محصول در فارسیو", "Repository and canonical Farsio product route alignment"),
        tr(lang, "حفظ مسیر توسعه خواندن، ترجمه، خلاصه و صدا", "Product direction preserved around reading, translation, summarization and speech"),
      ],
      href: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-brand-v1-2026-08-30",
    },
    {
      date: tr(lang, "۱۲ شهریور ۱۴۰۵ · ۳ سپتامبر ۲۰۲۶", "3 Sep 2026"),
      version: "0.6.0 preview-3",
      title: tr(lang, "اولین RC نصب‌شدنی متصل به Runtime آنلاین", "First installable RC connected to the online runtime"),
      summary: tr(lang, "آوایار از یک نمونه توسعه‌ای عبور کرد و به نسخه آزمایشی نصب‌شدنی Chrome/Edge با Runtime آنلاین و زنجیره انتشار خودکار رسید.", "AvaYar moved beyond a development prototype to an installable Chrome/Edge RC backed by an online runtime and automated release pipeline."),
      state: "preview",
      features: [
        tr(lang, "ترجمه واقعی انگلیسی به فارسی با Cloudflare Workers AI", "Live English-to-Persian translation through Cloudflare Workers AI"),
        tr(lang, "قبولی تست سرتاسری ترجمه روی Preview آنلاین", "Online translation E2E PASS"),
        tr(lang, "Fallback کنترل‌شده گفتار فارسی مرورگر در نبود TTS سرور", "Controlled browser Persian speech fallback when server TTS is unavailable"),
        tr(lang, "بسته Manifest V3 قابل نصب برای Chrome و Edge", "Installable Manifest V3 package for Chrome and Edge"),
        tr(lang, "ZIP، SHA-256 و metadata رسمی Release Candidate", "Official RC ZIP, SHA-256 checksum and metadata"),
        tr(lang, "زنجیره خودکار Deploy → E2E → Build → Artifact → Prerelease", "Automated Deploy → E2E → Build → Artifact → Prerelease pipeline"),
      ],
      href: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0-preview-3",
    },
    {
      date: tr(lang, "مرحله فعلی", "Current stage"),
      version: tr(lang, "پذیرش RC", "RC acceptance"),
      title: tr(lang, "تست واقعی مرورگر و آمادگی فروشگاه", "Real-browser acceptance and store readiness"),
      summary: tr(lang, "تمرکز فعلی روی پذیرش واقعی Chrome/Edge، بررسی تجربه صفحه‌های فارسی و انگلیسی، کنترل‌های پخش و سخت‌گیری روی مجوزها و حریم خصوصی است.", "Current work focuses on real Chrome/Edge acceptance, Persian and English page workflows, playback controls, permissions and privacy hardening."),
      state: "active",
      features: [
        tr(lang, "تست نصب و رفتار واقعی افزونه در Chrome و Edge", "Real installation and behavior testing in Chrome and Edge"),
        tr(lang, "اعتبارسنجی متن کامل، ترجمه، خلاصه و Play/Pause/Stop", "Validation of full text, translation, summary and Play/Pause/Stop"),
        tr(lang, "Rate limiting و پایداری Runtime آنلاین", "Rate limiting and online runtime reliability"),
        tr(lang, "آماده‌سازی Privacy و metadata برای فروشگاه‌ها", "Store privacy and metadata readiness"),
      ],
    },
    {
      date: tr(lang, "مسیر آینده", "Next"),
      version: tr(lang, "پس از RC", "Post-RC"),
      title: tr(lang, "صدای فارسی باکیفیت‌تر و تجربه خواندن هوشمندتر", "Higher-quality Persian speech and smarter reading"),
      summary: tr(lang, "پس از تثبیت RC، آوایار به سمت صدای فارسی سروری باکیفیت و قابل اتکا، بدون حذف fallback مرورگر، و کیفیت بالاتر در خلاصه و ترجمه حرکت می‌کند.", "After RC stabilization, AvaYar will move toward reliable higher-quality server-side Persian speech while retaining browser fallback, plus stronger summary and translation quality."),
      state: "planned",
      features: [
        tr(lang, "TTS فارسی سروری در صورت تأمین ارائه‌دهنده پایدار", "Server-side Persian TTS when a reliable provider is available"),
        tr(lang, "حفظ fallback مرورگر برای تاب‌آوری سرویس", "Retain browser fallback for resilience"),
        tr(lang, "بهبود کیفیت خلاصه‌سازی و ترجمه فارسی‌محور", "Improve Persian-first summarization and translation quality"),
        tr(lang, "گسترش سازگاری با صفحات و سناریوهای واقعی وب", "Expand compatibility across real-world web pages and workflows"),
      ],
    },
  ];
}

export function ProductReleaseNotes({ lang, type }: { lang: Lang; type: "neveshtyar" | "ava" }) {
  const items = releases(lang, type);
  const current = items.find((item) => item.state === "active");
  return (
    <section className="pro-section product-release-section" id="release-notes">
      <div className="pro-section-heading">
        <span>{tr(lang, "تاریخچه محصول", "Product history")}</span>
        <h2>{tr(lang, "یادداشت انتشار و نقشه راه", "Release notes & roadmap")}</h2>
        <p>{tr(lang, "تغییرات مهم محصول با تاریخ، وضعیت فعلی و قدم‌های بعدی؛ به زبان کاربر و با ارجاع به انتشارهای رسمی.", "Major product changes with dates, current status and next steps, written for users and linked to official releases.")}</p>
      </div>

      {current ? (
        <div className="product-stage-banner">
          <span><Icon icon="solar:flag-2-bold" />{tr(lang, "اکنون", "Now")}</span>
          <div><strong>{current.title}</strong><p>{current.summary}</p></div>
        </div>
      ) : null}

      <div className="product-release-timeline">
        {items.map((item) => (
          <article className={`product-release-card release-${item.state}`} key={`${item.date}-${item.version}`}>
            <div className="release-marker" aria-hidden="true"><span /></div>
            <div className="release-content">
              <div className="release-meta">
                <span className={`release-state release-state-${item.state}`}>{stateLabel(lang, item.state)}</span>
                <time>{item.date}</time>
                <strong>{item.version}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul>{item.features.map((feature) => <li key={feature}><Icon icon="solar:check-circle-bold" /><span>{feature}</span></li>)}</ul>
              {item.href ? <a className="release-source" href={item.href} target="_blank" rel="noreferrer"><Icon icon="mdi:github" />{tr(lang, "مشاهده انتشار رسمی", "View official release")}<Icon icon="solar:arrow-left-linear" /></a> : null}
            </div>
          </article>
        ))}
      </div>

      <div className="release-note-policy">
        <Icon icon="solar:history-bold" />
        <p>{tr(lang, "از این پس هر انتشار یا تغییر مهم نوشت‌یار و آوایار با تاریخ، اثر آن برای کاربر و وضعیت عرضه در همین صفحه ثبت می‌شود؛ GitHub مرجع فنی و این صفحه مرجع عمومی محصول است.", "From now on, every meaningful NeveshtYar and AvaYar release will be recorded here with its date, user impact and availability status. GitHub remains the technical source; this page is the public product record.")}</p>
      </div>
    </section>
  );
}
