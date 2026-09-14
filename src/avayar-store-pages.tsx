import type { ReactNode } from "react";
import type { Lang } from "./i18n";

const RELEASE_URL =
  "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0";

const SOURCE_URL =
  "https://github.com/FarsioIR/AvaYar";

const ISSUES_URL =
  "https://github.com/FarsioIR/AvaYar/issues";

function localPath(lang: Lang, suffix: string) {
  return `/${lang}${suffix}`;
}

function StorePageShell({
  lang,
  eyebrow,
  title,
  lead,
  children,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <main className="avayar-store-page">
      <section className="avayar-store-hero">
        <div className="avayar-store-brand">
          <img
            src="/brand/products/avayar-flat.svg"
            alt="AvaYar"
          />
          <span>{eyebrow}</span>
        </div>

        <h1>{title}</h1>
        <p>{lead}</p>

        <div
          className="avayar-store-badges"
          aria-label={lang === "fa" ? "مشخصات نسخه" : "Release authority"}
        >
          <span>
            {lang === "fa"
              ? "AvaYar ۰.۶.۰ Stable"
              : "AvaYar 0.6.0 Stable"}
          </span>
          <span>Chrome / Edge</span>
          <span>Manifest V3</span>
        </div>
      </section>

      <section className="avayar-store-content">
        {children}
      </section>

      <section className="avayar-store-authority">
        <h2>
          {lang === "fa"
            ? "منابع رسمی آوایار"
            : "Official AvaYar sources"}
        </h2>

        <div className="avayar-store-link-grid">
          <a href={localPath(lang, "/products/avayar")}>
            {lang === "fa"
              ? "صفحه رسمی محصول"
              : "Official product page"}
          </a>

          <a href={RELEASE_URL} target="_blank" rel="noreferrer">
            {lang === "fa"
              ? "نسخه ۰.۶.۰ پایدار در GitHub"
              : "0.6.0 Stable on GitHub"}
          </a>

          <a href={SOURCE_URL} target="_blank" rel="noreferrer">
            {lang === "fa"
              ? "مخزن رسمی آوایار"
              : "Official AvaYar repository"}
          </a>
        </div>
      </section>
    </main>
  );
}

export function AvaYarPrivacyPage({ lang }: { lang: Lang }) {
  const fa = lang === "fa";

  return (
    <StorePageShell
      lang={lang}
      eyebrow={fa ? "حریم خصوصی آوایار" : "AvaYar Privacy"}
      title={
        fa
          ? "حریم خصوصی و جریان داده آوایار"
          : "AvaYar privacy and data flow"
      }
      lead={
        fa
          ? "این صفحه توضیح می‌دهد آوایار برای خواندن، ترجمه، خلاصه‌سازی و تبدیل متن به گفتار از چه دسترسی‌هایی استفاده می‌کند و چه زمانی محتوای صفحه برای پردازش استفاده می‌شود."
          : "This page explains which permissions AvaYar uses and how webpage content is handled when you request reading, translation, summarization or text-to-speech."
      }
    >
      <article className="avayar-store-card">
        <h2>{fa ? "دسترسی‌های افزونه" : "Extension permissions"}</h2>
        <p>
          {fa
            ? "نسخه پایدار آوایار از activeTab، scripting، sidePanel و storage استفاده می‌کند. دسترسی اختیاری به صفحات وب برای عملیات درخواست‌شده کاربر روی محتوای صفحه در نظر گرفته شده است."
            : "AvaYar Stable uses activeTab, scripting, sidePanel and storage. Optional webpage access supports user-requested operations on webpage content."}
        </p>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "چه داده‌ای پردازش می‌شود؟" : "What data is processed?"}</h2>
        <p>
          {fa
            ? "وقتی کاربر یکی از قابلیت‌های مربوط به محتوای صفحه را اجرا می‌کند، متن لازم برای همان عملیات می‌تواند به سرویس HTTPS آوایار ارسال شود تا پردازش‌هایی مانند آماده‌سازی متن، ترجمه، خلاصه‌سازی یا تولید گفتار انجام شود."
            : "When you invoke a webpage-content feature, the text required for that operation may be sent to AvaYar's HTTPS service for processing such as text preparation, translation, summarization or speech generation."}
        </p>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "کلیدهای سرویس" : "Provider credentials"}</h2>
        <p>
          {fa
            ? "کلیدهای سرویس‌های پردازشی داخل بسته افزونه قرار نمی‌گیرند. نسخه Production از طریق HTTPS به سرویس آوایار متصل می‌شود و credentialهای provider سمت سرویس باقی می‌مانند."
            : "Provider credentials are not shipped inside the extension package. Production connects to the AvaYar service over HTTPS while provider credentials remain server-side."}
        </p>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "ذخیره‌سازی و نگهداری داده" : "Storage and retention"}</h2>
        <p>
          {fa
            ? "این صفحه فقط رفتارهایی را بیان می‌کند که در قرارداد فعلی محصول و Runtime قابل اثبات‌اند. فارسیو مدت نگهداری ثابت برای داده‌های پردازش‌شده سمت سرویس اعلام نمی‌کند مگر اینکه این رفتار در Runtime و سیاست عملیاتی به‌طور قابل‌راستی‌آزمایی تعریف شده باشد."
            : "This page states only behavior supported by the current product and runtime contract. Farsio does not claim a fixed server-side retention period unless that behavior is explicitly defined and verifiable in the runtime and operating policy."}
        </p>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "کنترل کاربر" : "User control"}</h2>
        <p>
          {fa
            ? "پردازش محتوای صفحه به تعامل کاربر و دسترسی اعطاشده توسط مرورگر وابسته است. کاربر می‌تواند مجوزهای افزونه را در تنظیمات مرورگر مشاهده یا مدیریت کند."
            : "Webpage processing depends on user interaction and browser-granted access. Users can inspect or manage extension permissions through browser settings."}
        </p>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "پشتیبانی و گزارش مشکل" : "Support and issue reporting"}</h2>
        <p>
          {fa
            ? "برای سؤال درباره حریم خصوصی، رفتار افزونه یا گزارش مشکل، از مسیر رسمی پشتیبانی آوایار استفاده کنید."
            : "For privacy questions, extension behavior or issue reporting, use the official AvaYar support path."}
        </p>

        <a
          className="avayar-store-primary-link"
          href={localPath(lang, "/products/avayar/support")}
        >
          {fa ? "پشتیبانی آوایار" : "AvaYar Support"}
        </a>
      </article>
    </StorePageShell>
  );
}

export function AvaYarSupportPage({ lang }: { lang: Lang }) {
  const fa = lang === "fa";

  return (
    <StorePageShell
      lang={lang}
      eyebrow={fa ? "پشتیبانی آوایار" : "AvaYar Support"}
      title={
        fa
          ? "راهنما، پشتیبانی و گزارش مشکل آوایار"
          : "AvaYar help, support and issue reporting"
      }
      lead={
        fa
          ? "مسیر رسمی دریافت راهنما، بررسی نسخه، گزارش خطا و پیگیری مسائل آوایار."
          : "The official path for help, release verification, bug reports and AvaYar issue tracking."
      }
    >
      <article className="avayar-store-card">
        <h2>{fa ? "قبل از گزارش مشکل" : "Before reporting an issue"}</h2>
        <p>
          {fa
            ? "نسخه فعلی پایدار آوایار ۰.۶.۰ است. هنگام گزارش مشکل، نسخه مرورگر، سیستم‌عامل، نوع صفحه، حالت Full Text یا Summary، صدای انتخاب‌شده و پیام خطای مشاهده‌شده را ثبت کنید."
            : "The current Stable release is AvaYar 0.6.0. When reporting a problem, include browser version, operating system, page type, Full Text or Summary mode, selected voice and the observed error message."}
        </p>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "گزارش خطا در GitHub" : "Report a bug on GitHub"}</h2>
        <p>
          {fa
            ? "مشکلات فنی قابل‌بازتولید در Issue Tracker رسمی آوایار ثبت می‌شوند تا وضعیت، اصلاح و شواهد QA قابل‌پیگیری باشند."
            : "Reproducible technical problems are tracked in the official AvaYar issue tracker so status, fixes and QA evidence remain auditable."}
        </p>

        <a
          className="avayar-store-primary-link"
          href={ISSUES_URL}
          target="_blank"
          rel="noreferrer"
        >
          GitHub Issues
        </a>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "ارتباط با فارسیو" : "Contact Farsio"}</h2>
        <p>
          {fa
            ? "برای موضوعات غیرعمومی، همکاری یا مواردی که مناسب Issue عمومی نیستند، از صفحه رسمی تماس فارسیو استفاده کنید."
            : "For non-public matters, collaboration or communication that does not belong in a public issue, use Farsio's official contact page."}
        </p>

        <a
          className="avayar-store-primary-link"
          href={localPath(lang, "/contact")}
        >
          {fa ? "تماس با فارسیو" : "Contact Farsio"}
        </a>
      </article>

      <article className="avayar-store-card">
        <h2>{fa ? "حریم خصوصی" : "Privacy"}</h2>
        <p>
          {fa
            ? "جزئیات دسترسی‌ها و جریان داده نسخه پایدار آوایار در صفحه اختصاصی حریم خصوصی محصول ثبت شده است."
            : "AvaYar Stable permissions and data-flow details are documented on the product-specific privacy page."}
        </p>

        <a
          className="avayar-store-primary-link"
          href={localPath(lang, "/products/avayar/privacy")}
        >
          {fa ? "حریم خصوصی آوایار" : "AvaYar Privacy"}
        </a>
      </article>
    </StorePageShell>
  );
}
