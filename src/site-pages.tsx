import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import type { Lang } from "./i18n";

const LINKS = {
  farsio: "https://farsio.ir/fa",
  farsioGithub: "https://github.com/FarsioIR",
  neveshtyarGithub: "https://github.com/FarsioIR/NeveshtYar",
  neveshtyarRelease: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
  avaGithub: "https://github.com/FarsioIR/AvaYar",
  founder: "https://amirmotefaker.ir/",
};

const tr = (lang: Lang, fa: string, en: string) => (lang === "fa" ? fa : en);
const localPath = (lang: Lang, suffix = "") => `/${lang}${suffix}`;

type SeoEntry = { title: string; description: string };
export type PageSeo = SeoEntry & {
  canonical: string;
  faHref: string;
  enHref: string;
  xDefaultHref: string;
  locale: "fa_IR" | "en_US";
  alternateLocale: "en_US" | "fa_IR";
};

const SEO: Record<Lang, Record<string, SeoEntry>> = {
  fa: {
    home: { title: "فارسیو | یار فارسی‌زبان", description: "فارسیو؛ ابزارهای فارسی‌محور برای نوشتن، خواندن، ترجمه و شنیدن بهتر با نوشت‌یار و آوایار." },
    products: { title: "محصولات فارسیو | نوشت‌یار و آوایار", description: "محصولات فارسیو را بشناسید؛ نوشت‌یار برای نوشتن دقیق‌تر و آوایار برای خواندن، ترجمه و شنیدن بهتر." },
    neveshtyar: { title: "نوشت‌یار | دستیار نوشتن فارسی و انگلیسی | فارسیو", description: "نوشت‌یار، دستیار نوشتن فارسی و انگلیسی برای اصلاح فینگلیش، بازیابی چیدمان صفحه‌کلید، املا و گردش‌کارهای راست‌به‌چپ." },
    ava: { title: "آوایار | دستیار خواندن و شنیدن فارسی | فارسیو", description: "آوایار، دستیار فارسی‌محور برای خواندن وب، ترجمه، خلاصه‌سازی و تبدیل متن به گفتار." },
    features: { title: "ویژگی‌های فارسیو | طراحی فارسی‌محور، سبک و شفاف", description: "ویژگی‌ها و اصول طراحی فارسیو؛ فارسی در اولویت، سرعت، حریم خصوصی، توسعه شفاف و تجربه دو‌زبانه." },
    docs: { title: "راهنمای فارسیو | نصب، استفاده و مسیر توسعه", description: "راهنمای جامع فارسیو برای شروع، نصب نوشت‌یار، آوایار، حریم خصوصی، گزارش مشکل و نسخه‌ها." },
    faq: { title: "سوالات متداول فارسیو | پاسخ‌های رسمی", description: "پاسخ‌های رسمی درباره فارسیو، نوشت‌یار، آوایار، نسخه‌ها، GitHub، حریم خصوصی و مشارکت." },
    releases: { title: "نسخه‌ها و انتشارهای فارسیو | Release Notes", description: "وضعیت انتشار نوشت‌یار v4.9.2 و مسیر توسعه آوایار." },
    community: { title: "جامعه و GitHub فارسیو | توسعه شفاف", description: "مخزن‌های رسمی GitHub، گزارش مسائل و مسیر مشارکت در توسعه فارسیو." },
    report: { title: "گزارش مشکل فارسیو | راهنمای ثبت Issue حرفه‌ای", description: "راهنمای گزارش خطا با اطلاعات بازتولید، نسخه، مرورگر و رفتار مورد انتظار." },
    contribute: { title: "مشارکت در فارسیو | راهنمای Contribution", description: "راهنمای مشارکت در توسعه فارسیو، Issue، Pull Request، تست و حریم خصوصی." },
    about: { title: "درباره فارسیو | ماموریت، اصول و محصولات", description: "درباره ماموریت فارسیو، نوشت‌یار، آوایار و بنیان‌گذار پروژه." },
    contact: { title: "تماس با فارسیو | مسیرهای رسمی ارتباط", description: "مسیرهای رسمی ارتباط برای موضوعات فنی، همکاری و بازخورد محصول." },
    privacy: { title: "حریم خصوصی فارسیو | اصول داده و شفافیت", description: "اصول حریم خصوصی فارسیو؛ کمینه‌سازی، شفافیت و کنترل کاربر." },
    "guides/finglish-to-persian": { title: "تبدیل فینگلیش به فارسی | راهنمای کامل فارسیو", description: "راهنمای تبدیل فینگلیش به فارسی؛ چالش‌های نوشتار لاتین، خطاهای رایج، بازبینی متن و انتخاب جریان کار مناسب برای نوشتن فارسی." },
    "guides/persian-keyboard-layout": { title: "تبدیل متن کیبورد اشتباه فارسی و انگلیسی | فارسیو", description: "راهنمای بازیابی متن تایپ‌شده با زبان یا چیدمان اشتباه کیبورد فارسی و انگلیسی بدون نیاز به تایپ دوباره کل متن." },
    "guides/persian-ai-writing": { title: "هوش مصنوعی برای نوشتن و ویرایش متن فارسی | فارسیو", description: "راهنمای استفاده از هوش مصنوعی برای نوشتن، اصلاح و بازنویسی متن فارسی با تمرکز بر کیفیت، محدودیت‌ها و بازبینی انسانی." },
    "guides/persian-text-to-speech": { title: "تبدیل متن فارسی به گفتار و صدا | راهنمای فارسیو", description: "راهنمای تبدیل متن فارسی به گفتار؛ آماده‌سازی متن، تلفظ، نشانه‌گذاری، نام‌ها و نکاتی برای دستیابی به خروجی صوتی قابل‌فهم‌تر." },
    "guides/web-reading-summarization": { title: "خلاصه‌سازی صفحات وب با هوش مصنوعی | راهنمای فارسیو", description: "راهنمای خلاصه‌سازی صفحات و محتوای وب؛ استخراج محتوای اصلی، حفظ نکات مهم و استفاده درست از خلاصه برای مطالعه سریع‌تر." },
  },
  en: {
    home: { title: "Farsio | Persian-first tools for writing, reading & listening", description: "Farsio builds Persian-first tools for writing, reading, translation and listening, including NeveshtYar and AvaYar." },
    products: { title: "Farsio Products | NeveshtYar & AvaYar", description: "Explore NeveshtYar for better writing and AvaYar for Persian-first reading, translation and listening." },
    neveshtyar: { title: "NeveshtYar | Persian & English Writing Assistant | Farsio", description: "NeveshtYar is Farsio's local-first writing assistant for Finglish correction, keyboard-layout recovery, spelling and RTL workflows." },
    ava: { title: "AvaYar | Persian Reading & Listening Assistant | Farsio", description: "AvaYar is Farsio's Persian-first web reading, translation, summarization and text-to-speech assistant." },
    features: { title: "Farsio Features | Persian-first, lightweight and transparent", description: "Explore Farsio's product principles: Persian-first design, speed, privacy, transparent development and bilingual UX." },
    docs: { title: "Farsio Guide | Installation, usage and development", description: "A practical Farsio guide covering setup, NeveshtYar, AvaYar, privacy, issue reporting and releases." },
    faq: { title: "Farsio FAQ | Official answers", description: "Official answers about Farsio, NeveshtYar, AvaYar, releases, GitHub, privacy and contribution." },
    releases: { title: "Farsio Releases | Product release notes", description: "Follow NeveshtYar v4.9.2 and AvaYar development status through official sources." },
    community: { title: "Farsio Community & GitHub | Open development", description: "Explore Farsio repositories, issue tracking and contribution paths." },
    report: { title: "Report a Farsio Issue | High-quality bug reports", description: "Learn how to report a Farsio issue with reproducible steps, version, browser and expected behavior." },
    contribute: { title: "Contribute to Farsio | Contribution guide", description: "A practical guide to issues, focused pull requests, validation and safe contribution." },
    about: { title: "About Farsio | Mission, principles and products", description: "Learn about Farsio's mission, Persian-first principles, products and founder." },
    contact: { title: "Contact Farsio | Official communication channels", description: "Official ways to contact Farsio for technical topics, collaboration and product feedback." },
    privacy: { title: "Farsio Privacy | Data and transparency principles", description: "Farsio's privacy principles: minimization, transparency and user control." },
    "guides/finglish-to-persian": { title: "Finglish to Persian Conversion Guide | Farsio", description: "Learn how Finglish-to-Persian conversion works, why Latin-written Persian is ambiguous, and how to review converted Persian text reliably." },
    "guides/persian-keyboard-layout": { title: "Wrong Persian Keyboard Layout Recovery | Farsio", description: "Learn how to recover text accidentally typed with the wrong Persian or English keyboard layout without retyping the entire text." },
    "guides/persian-ai-writing": { title: "AI for Persian Writing & Editing | Farsio Guide", description: "A practical guide to using AI for Persian writing, editing and rewriting while preserving context, terminology, tone and human review." },
    "guides/persian-text-to-speech": { title: "Persian Text to Speech Guide | Farsio", description: "Learn how Persian text-to-speech works and how punctuation, numbers, names and text preparation affect intelligible spoken output." },
    "guides/web-reading-summarization": { title: "AI Web Page Summarization Guide | Farsio", description: "Learn how web page summarization works, how to identify primary content, preserve important context and review long web content faster." },
  },
};

function seoKey(routeKey: string) {
  if (routeKey === "products/neveshtyar") return "neveshtyar";
  if (routeKey === "products/avayar") return "ava";
  if (routeKey === "products/ava") return "ava";
  if (routeKey === "report-issue") return "report";
  return routeKey || "home";
}

export function getPageSeo(lang: Lang, routeKey: string): PageSeo {
  const origin = "https://farsio.ir";
  const normalized = routeKey.replace(/^\/+|\/+$/g, "");
  const entry = SEO[lang][seoKey(normalized)] ?? SEO[lang].home;
  const suffix = normalized ? `/${normalized}` : "";
  const other: Lang = lang === "fa" ? "en" : "fa";
  const canonical = `${origin}/${lang}${suffix}`;
  const alternate = `${origin}/${other}${suffix}`;
  return {
    ...entry,
    canonical,
    faHref: lang === "fa" ? canonical : alternate,
    enHref: lang === "en" ? canonical : alternate,
    xDefaultHref: lang === "fa" ? canonical : alternate,
    locale: lang === "fa" ? "fa_IR" : "en_US",
    alternateLocale: lang === "fa" ? "en_US" : "fa_IR",
  };
}

function Breadcrumb({ lang, current }: { lang: Lang; current: string }) {
  return (
    <nav className="pro-breadcrumb" aria-label="Breadcrumb">
      <a href={localPath(lang)}>{tr(lang, "خانه", "Home")}</a>
      <Icon icon="solar:alt-arrow-left-linear" />
      <span aria-current="page">{current}</span>
    </nav>
  );
}

function Hero({ eyebrow, title, lead, icon, children }: { eyebrow: string; title: string; lead: string; icon: string; children?: ReactNode }) {
  return (
    <section className="pro-hero">
      <span className="hero-kicker"><Icon icon={icon} />{eyebrow}</span>
      <h1>{title}</h1>
      <p>{lead}</p>
      {children}
    </section>
  );
}

type Card = { icon: string; title: string; body: string };
function CardGrid({ items }: { items: Card[] }) {
  return <div className="pro-card-grid">{items.map((item) => (
    <article className="pro-card" key={item.title}>
      <span className="pro-card-icon"><Icon icon={item.icon} /></span>
      <h3>{item.title}</h3><p>{item.body}</p>
    </article>
  ))}</div>;
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="pro-section-heading"><span>{eyebrow}</span><h2>{title}</h2>{body ? <p>{body}</p> : null}</div>;
}

type ProductInfo = { name: string; status: string; tagline: string; lead: string; overview: string; cards: Card[]; uses: string[]; facts: [string, string][] };
function productInfo(lang: Lang, type: "neveshtyar" | "ava"): ProductInfo {
  if (type === "neveshtyar") return {
    name: tr(lang, "نوشت‌یار", "NeveshtYar"),
    status: tr(lang, "نسخه عمومی · v4.9.2", "Public release · v4.9.2"),
    tagline: tr(lang, "بنویس، درست و روان", "Persian & English writing assistant"),
    lead: tr(lang, "دستیار نوشتن فارسی و انگلیسی برای مرورگر؛ با تمرکز بر اصلاح فینگلیش، بازیابی چیدمان صفحه‌کلید، املا و تجربه بهتر نوشتن راست‌به‌چپ.", "A browser writing assistant focused on Finglish correction, keyboard-layout recovery, spelling and practical RTL workflows."),
    overview: tr(lang, "نوشت‌یار برای لحظه‌ای ساخته شده که می‌خواهید متن را همان‌جا که می‌نویسید بهتر کنید. ابزارهای ضروری نگارش فارسی نزدیک به جریان واقعی تایپ می‌مانند و کنترل نهایی در اختیار نویسنده است.", "NeveshtYar keeps practical Persian writing tools close to the typing flow and leaves the final decision with the writer."),
    cards: [
      { icon: "solar:keyboard-bold", title: tr(lang, "بازیابی چیدمان صفحه‌کلید", "Keyboard-layout recovery"), body: tr(lang, "متن تایپ‌شده با چیدمان اشتباه فارسی یا انگلیسی را بازیابی می‌کند.", "Recover text accidentally typed with the wrong Persian or English layout.") },
      { icon: "solar:translation-2-bold", title: tr(lang, "اصلاح Finglish", "Finglish correction"), body: tr(lang, "برای ورودی فینگلیش در سناریوهای واقعی نوشتن فارسی طراحی شده است.", "Support real-world Finglish input without breaking the writing flow.") },
      { icon: "solar:pen-new-square-bold", title: tr(lang, "املا و نگارش", "Spelling and writing"), body: tr(lang, "به شناسایی خطاهای رایج و بهبود خوانایی کمک می‌کند.", "Surface common writing issues and readability improvements.") },
      { icon: "solar:text-square-bold", title: tr(lang, "گردش‌کار RTL", "RTL workflows"), body: tr(lang, "رابط و رفتار محصول با واقعیت متن راست‌به‌چپ هماهنگ است.", "Interface details are designed around right-to-left Persian text.") },
      { icon: "solar:shield-check-bold", title: tr(lang, "رویکرد local-first", "Local-first direction"), body: tr(lang, "تا جای ممکن پردازش نزدیک به دستگاه کاربر و دسترسی‌ها محدود نگه داشته می‌شوند.", "Keep processing close to the device where practical and minimize permissions.") },
      { icon: "solar:code-square-bold", title: tr(lang, "توسعه شفاف", "Transparent development"), body: tr(lang, "نسخه‌ها، تاریخچه و Issueها در GitHub رسمی قابل پیگیری‌اند.", "Releases, history and issues are visible in the official repository.") },
    ],
    uses: tr(lang, "اصلاح سریع متن فارسی|بازیابی متن با زبان صفحه‌کلید اشتباه|کار با فینگلیش|بهبود تایپ در فرم‌ها و ویرایشگرها", "Improve Persian text|Recover wrong-layout text|Handle Finglish|Improve typing in forms and editors").split("|"),
    facts: lang === "fa" ? [["وضعیت", "نسخه عمومی"], ["نسخه", "v4.9.2"], ["بستر", "افزونه مرورگر"], ["مرجع", "GitHub رسمی"]] : [["Status", "Public"], ["Release", "v4.9.2"], ["Platform", "Browser extension"], ["Source", "Official GitHub"]],
  };

  return {
    name: tr(lang, "آوایار", "AvaYar"),
    status: tr(lang, "در حال توسعه", "In development"),
    tagline: tr(lang, "بشنو، به فارسی", "Persian Reading & Listening Assistant"),
    lead: tr(lang, "دستیار خواندن و شنیدن فارسی برای وب؛ با تمرکز بر محتوای صفحه، ترجمه فارسی‌محور، خلاصه‌سازی و تبدیل متن به گفتار.", "A Persian-first web reading and listening assistant focused on content, translation, summarization and text-to-speech."),
    overview: tr(lang, "آوایار برای زمانی طراحی می‌شود که خواندن یک صفحه طولانی یا محتوای غیرفارسی بهترین شکل دریافت اطلاعات نیست؛ هدف، تجربه‌ای قابل‌فهم‌تر و شنیدنی‌تر است.", "AvaYar is designed for situations where reading long or foreign-language web content is not the best way to absorb information."),
    cards: [
      { icon: "solar:document-text-bold", title: tr(lang, "خواندن محتوای وب", "Web content reading"), body: tr(lang, "تمرکز روی محتوای اصلی صفحه برای مطالعه و پردازش بهتر.", "Focus on the main page content for easier reading and processing.") },
      { icon: "solar:translation-bold", title: tr(lang, "ترجمه فارسی‌محور", "Persian-first translation"), body: tr(lang, "خروجی برای خواننده فارسی طبیعی و قابل‌فهم هدف‌گذاری می‌شود.", "Aim for Persian output that reads naturally.") },
      { icon: "solar:notes-bold", title: tr(lang, "خلاصه‌سازی", "Summarization"), body: tr(lang, "برای رسیدن سریع‌تر به نکات اصلی محتوای طولانی.", "Reach the main ideas of long content faster.") },
      { icon: "solar:soundwave-bold", title: tr(lang, "تبدیل متن به گفتار", "Text to speech"), body: tr(lang, "آماده‌سازی متن برای تجربه شنیداری فارسی با کنترل‌های ساده.", "Prepare text for a clear Persian listening flow.") },
      { icon: "solar:accessibility-bold", title: tr(lang, "دسترسی بهتر", "Alternative access"), body: tr(lang, "شنیدن و خلاصه‌خوانی مسیر مکملی برای دریافت محتوا هستند.", "Listening and concise reading complement direct reading.") },
      { icon: "solar:code-square-bold", title: tr(lang, "توسعه قابل‌پیگیری", "Trackable development"), body: tr(lang, "پیشرفت فنی از مخزن رسمی فارسیو قابل دنبال‌کردن است.", "Technical progress remains visible in the official repository.") },
    ],
    uses: tr(lang, "مرور سریع محتوای طولانی|دریافت نسخه فارسی‌محور|آماده‌سازی متن برای شنیدن|رسیدن به نکات کلیدی", "Review long content faster|Get a Persian-first version|Prepare text for listening|Reach key points").split("|"),
    facts: lang === "fa" ? [["وضعیت", "در حال توسعه"], ["تمرکز", "خواندن و شنیدن"], ["بستر", "وب"], ["مرجع", "GitHub رسمی"]] : [["Status", "In development"], ["Focus", "Reading & listening"], ["Platform", "Web"], ["Source", "Official GitHub"]],
  };
}

export function ProductDetailPage({ lang, type, preview }: { lang: Lang; type: "neveshtyar" | "ava"; preview: ReactNode }) {
  const p = productInfo(lang, type);
  const github = type === "ava" ? LINKS.avaGithub : LINKS.neveshtyarGithub;
  const isAva = type === "ava";

  const audiences = isAva
    ? [
        tr(lang, "افرادی که مقاله‌ها و صفحات طولانی وب را دنبال می‌کنند", "People who regularly work through long articles and web pages"),
        tr(lang, "کاربرانی که ترجیح می‌دهند محتوای فارسی را بشنوند", "People who prefer listening to Persian content"),
        tr(lang, "پژوهشگران و دانشجویانی که به مرور سریع‌تر محتوا نیاز دارند", "Researchers and students who need a faster way to review content"),
        tr(lang, "کاربرانی که محتوای غیرفارسی را با توضیح و خلاصه فارسی می‌خواهند", "Users who want foreign-language content explained and summarized in Persian"),
      ]
    : [
        tr(lang, "افرادی که هر روز فارسی در مرورگر می‌نویسند", "People who write Persian in the browser every day"),
        tr(lang, "کاربرانی که بین کیبورد فارسی و انگلیسی جابه‌جا می‌شوند", "Users who regularly switch between Persian and English keyboard layouts"),
        tr(lang, "نویسندگان، دانشجویان و تیم‌هایی که متن فارسی را ویرایش می‌کنند", "Writers, students and teams editing Persian text"),
        tr(lang, "کاربرانی که با فینگلیش یا خطاهای رایج تایپ فارسی روبه‌رو هستند", "Users dealing with Finglish and common Persian typing mistakes"),
      ];

  const workflow = isAva
    ? [
        {
          title: tr(lang, "۱. صفحه را باز کنید", "1. Open the page"),
          body: tr(lang, "محتوایی را که می‌خواهید بخوانید، خلاصه کنید یا بشنوید در مرورگر باز کنید.", "Open the web content you want to read, summarize or listen to."),
        },
        {
          title: tr(lang, "۲. نوع خروجی را انتخاب کنید", "2. Choose the output"),
          body: tr(lang, "بر اساس نیاز، متن اصلی، خلاصه فارسی، ترجمه یا تجربه شنیداری را انتخاب کنید.", "Choose the original text, Persian summary, translation or listening workflow."),
        },
        {
          title: tr(lang, "۳. نتیجه را مرور کنید", "3. Review the result"),
          body: tr(lang, "خلاصه و ترجمه برای سرعت بیشتر هستند؛ در محتوای حساس یا تخصصی، منبع اصلی را نیز بررسی کنید.", "Summaries and translations improve speed; for sensitive or specialist content, review the original source as well."),
        },
      ]
    : [
        {
          title: tr(lang, "۱. همان‌جایی که می‌نویسید بمانید", "1. Stay where you write"),
          body: tr(lang, "هدف نوشت‌یار این است که ابزارهای نگارشی نزدیک به جریان واقعی نوشتن در مرورگر باشند.", "NeveshtYar keeps writing tools close to the actual browser writing flow."),
        },
        {
          title: tr(lang, "۲. مشکل متن را مشخص کنید", "2. Choose the writing problem"),
          body: tr(lang, "فینگلیش، چیدمان اشتباه کیبورد، املا یا اصلاح متن را بر اساس نیاز انتخاب کنید.", "Choose Finglish correction, keyboard-layout recovery, spelling or text improvement."),
        },
        {
          title: tr(lang, "۳. پیشنهاد را قبل از استفاده نهایی مرور کنید", "3. Review before applying"),
          body: tr(lang, "در متن‌های رسمی، تخصصی یا حساس، تصمیم نهایی همیشه باید با نویسنده بماند.", "For formal, specialist or sensitive writing, the final decision should remain with the writer."),
        },
      ];

  const guideLinks = isAva
    ? [
        {
          title: tr(lang, "راهنمای تبدیل متن فارسی به گفتار", "Persian text-to-speech guide"),
          href: localPath(lang, "/guides/persian-text-to-speech"),
        },
        {
          title: tr(lang, "راهنمای خلاصه‌سازی صفحات وب", "Web reading and summarization guide"),
          href: localPath(lang, "/guides/web-reading-summarization"),
        },
      ]
    : [
        {
          title: tr(lang, "راهنمای تبدیل فینگلیش به فارسی", "Finglish-to-Persian guide"),
          href: localPath(lang, "/guides/finglish-to-persian"),
        },
        {
          title: tr(lang, "بازیابی متن با چیدمان اشتباه کیبورد", "Wrong keyboard-layout recovery"),
          href: localPath(lang, "/guides/persian-keyboard-layout"),
        },
        {
          title: tr(lang, "راهنمای هوش مصنوعی برای نوشتن فارسی", "AI for Persian writing guide"),
          href: localPath(lang, "/guides/persian-ai-writing"),
        },
      ];

  return (
    <main className="shell inner-page pro-page">
      <Breadcrumb lang={lang} current={p.name} />
      <Hero eyebrow={p.status} title={p.name} lead={p.lead} icon={type === "ava" ? "solar:soundwave-bold" : "solar:pen-new-square-bold"}>
        <div className="pro-tagline">{p.tagline}</div>
        <div className="hero-actions">
          {type === "neveshtyar" ? <a className="button button-primary" href={LINKS.neveshtyarRelease} target="_blank" rel="noreferrer"><Icon icon="solar:download-bold" />v4.9.2</a> : null}
          <a className="button button-secondary" href={github} target="_blank" rel="noreferrer"><Icon icon="mdi:github" />GitHub</a>
        </div>
      </Hero>
      <section className="pro-product-overview">
        <article className="pro-panel pro-copy-panel">
          <SectionTitle eyebrow={tr(lang, "نمای کلی", "Overview")} title={tr(lang, "محصولی برای یک مسئله واقعی", "A product built around a real problem")} />
          <p>{p.overview}</p>
          <div className="pro-facts">{p.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        </article>
        <div className="pro-product-preview">{preview}</div>
      </section>
      <section className="pro-section"><SectionTitle eyebrow={tr(lang, "قابلیت‌ها", "Capabilities")} title={tr(lang, "قابلیت‌هایی برای تجربه واقعی کاربر", "Capabilities for real user workflows")} /><CardGrid items={p.cards} /></section>
      <section className="pro-section pro-split-section">
        <div>
          <SectionTitle
            eyebrow={tr(lang, "سناریوها", "Use cases")}
            title={tr(lang, "کجا به کار می‌آید؟", "Where does it fit?")}
          />
          <ul className="pro-check-list">
            {p.uses.map((x) => (
              <li key={x}>
                <Icon icon="solar:check-circle-bold" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="pro-panel pro-principles">
          <strong>{tr(lang, "اصل طراحی فارسیو", "Farsio design principle")}</strong>
          <p>
            {tr(
              lang,
              "هوشمندی باید به کاربر کمک کند، نه اینکه کنترل تجربه را از او بگیرد. قابلیت‌ها باید روشن و قابل بررسی باشند.",
              "Intelligence should help without taking control away. Features should stay clear and reviewable.",
            )}
          </p>
          <a href={localPath(lang, "/privacy")}>
            {tr(lang, "اصول حریم خصوصی", "Privacy principles")}
            <Icon icon="solar:arrow-left-linear" />
          </a>
        </aside>
      </section>

      <section className="pro-section">
        <SectionTitle
          eyebrow={tr(lang, "برای چه کسانی؟", "Who is it for?")}
          title={tr(
            lang,
            isAva ? "آوایار برای دریافت سریع‌تر و شنیدنی‌تر محتوا" : "نوشت‌یار برای کسانی که فارسی را هر روز می‌نویسند",
            isAva ? "AvaYar is for faster, more listenable content workflows" : "NeveshtYar is for people who write Persian every day",
          )}
          body={tr(
            lang,
            "محصول باید قبل از هر چیز مسئله واقعی کاربر را حل کند؛ نه اینکه فقط مجموعه‌ای از قابلیت‌های هوش مصنوعی باشد.",
            "A product should first solve a real user problem rather than become a collection of AI features.",
          )}
        />

        <div className="product-audience-grid">
          {audiences.map((item) => (
            <article className="product-audience-card" key={item}>
              <Icon icon="solar:user-check-rounded-bold" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pro-section">
        <SectionTitle
          eyebrow={tr(lang, "روش استفاده", "How it works")}
          title={tr(lang, "یک جریان ساده و قابل‌فهم", "A simple, understandable workflow")}
          body={tr(
            lang,
            "ارزش محصول زمانی بیشتر می‌شود که رسیدن از مسئله به نتیجه کوتاه و قابل پیش‌بینی باشد.",
            "Product value improves when the path from problem to result stays short and predictable.",
          )}
        />

        <div className="product-workflow-grid">
          {workflow.map((step) => (
            <article className="pro-panel product-workflow-card" key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pro-section product-trust-section">
        <SectionTitle
          eyebrow={tr(lang, "اعتماد و کنترل", "Trust & control")}
          title={tr(lang, "هوش مصنوعی باید قابل‌فهم و قابل‌کنترل بماند", "AI should remain understandable and controllable")}
        />

        <div className="product-trust-grid">
          <article className="pro-panel">
            <Icon icon="solar:shield-check-bold" />
            <h3>{tr(lang, "حریم خصوصی در طراحی", "Privacy by design")}</h3>
            <p>
              {tr(
                lang,
                "دسترسی‌ها و داده باید به نیاز واقعی قابلیت محدود شوند. جزئیات هر نسخه و رفتار محصول باید از منابع رسمی قابل بررسی باشد.",
                "Permissions and data should remain limited to real functional requirements. Product behavior and releases should remain reviewable through official sources.",
              )}
            </p>
            <a href={localPath(lang, "/privacy")}>
              {tr(lang, "مشاهده اصول حریم خصوصی", "Read privacy principles")}
            </a>
          </article>

          <article className="pro-panel">
            <Icon icon="mdi:github" />
            <h3>{tr(lang, "توسعه قابل‌پیگیری", "Traceable development")}</h3>
            <p>
              {tr(
                lang,
                "GitHub مرجع رسمی وضعیت فنی، Issueها و تاریخچه توسعه محصول است.",
                "GitHub is the official technical reference for issues, development status and history.",
              )}
            </p>
            <a href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </article>

          <article className="pro-panel">
            <Icon icon="solar:chat-round-check-bold" />
            <h3>{tr(lang, "گزارش مسئله با اطلاعات کافی", "Report issues with useful context")}</h3>
            <p>
              {tr(
                lang,
                "برای گزارش خطا، نسخه، مرورگر، مراحل بازتولید و نتیجه مورد انتظار را بنویسید و داده حساس منتشر نکنید.",
                "For bug reports, include version, browser, reproduction steps and expected behavior, and never publish sensitive data.",
              )}
            </p>
            <a href={localPath(lang, "/report-issue")}>
              {tr(lang, "راهنمای گزارش مشکل", "Issue reporting guide")}
            </a>
          </article>
        </div>
      </section>

      <section className="pro-section">
        <SectionTitle
          eyebrow={tr(lang, "یادگیری بیشتر", "Learn more")}
          title={tr(lang, "راهنماهای مرتبط با این محصول", "Guides related to this product")}
          body={tr(
            lang,
            "راهنماها مسئله را عمیق‌تر توضیح می‌دهند و صفحه محصول مسیر استفاده و وضعیت رسمی را نگه می‌دارد.",
            "Guides explain the underlying problem in more depth, while the product page remains the official product destination.",
          )}
        />

        <div className="product-guides-grid">
          {guideLinks.map((guide) => (
            <a className="product-guide-link" key={guide.href} href={guide.href}>
              <span>{guide.title}</span>
              <Icon icon="solar:arrow-left-linear" />
            </a>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <div>
          <span>{tr(lang, "پشتیبانی و ارتباط", "Support & contact")}</span>
          <h2>
            {tr(
              lang,
              isAva ? "درباره آوایار سوال، پیشنهاد یا مسئله فنی دارید؟" : "درباره نوشت‌یار سوال، پیشنهاد یا مسئله فنی دارید؟",
              isAva ? "Have a question, suggestion or technical issue about AvaYar?" : "Have a question, suggestion or technical issue about NeveshtYar?",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "برای هر موضوع مسیر مناسب را انتخاب کنید تا درخواست شما در جای درست ثبت و پیگیری شود.",
              "Choose the appropriate channel so your request is recorded and handled in the right place.",
            )}
          </p>
        </div>

        <div className="hero-actions">
          <a className="button button-primary" href={localPath(lang, "/contact")}>
            <Icon icon="solar:letter-bold" />
            {tr(lang, "تماس با فارسیو", "Contact Farsio")}
          </a>

          <a className="button button-secondary" href={github} target="_blank" rel="noreferrer">
            <Icon icon="mdi:github" />
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}

type PageKey = "products" | "features" | "docs" | "releases" | "community" | "report-issue" | "contribute" | "about" | "contact" | "privacy";
type Section = { title: string; body: string; icon: string; bullets?: string[]; links?: { label: string; href: string; external?: boolean }[] };
type PageData = { eyebrow: string; title: string; lead: string; icon: string; sections: Section[] };

function pageData(lang: Lang, key: PageKey): PageData {
  const data: Record<PageKey, PageData> = {
    products: {
      eyebrow: "Farsio Products", title: tr(lang, "محصولات فارسیو", "Farsio products"), icon: "solar:widget-4-bold",
      lead: tr(lang, "هر محصول فارسیو یک مسئله مشخص را هدف می‌گیرد؛ نوشت‌یار برای نوشتن و آوایار برای خواندن و شنیدن.", "Each Farsio product targets a concrete problem: NeveshtYar for writing and AvaYar for reading and listening."),
      sections: [
        { title: "NeveshtYar · نوشت‌یار", body: productInfo(lang, "neveshtyar").lead, icon: "solar:pen-new-square-bold", bullets: productInfo(lang, "neveshtyar").uses, links: [{ label: tr(lang, "صفحه محصول", "Product page"), href: localPath(lang, "/products/neveshtyar") }, { label: "GitHub", href: LINKS.neveshtyarGithub, external: true }] },
        { title: "AvaYar · آوایار", body: productInfo(lang, "ava").lead, icon: "solar:soundwave-bold", bullets: productInfo(lang, "ava").uses, links: [{ label: tr(lang, "صفحه محصول", "Product page"), href: localPath(lang, "/products/avayar") }, { label: "GitHub", href: LINKS.avaGithub, external: true }] },
      ],
    },
    features: {
      eyebrow: tr(lang, "اصول محصول", "Product principles"), title: tr(lang, "ویژگی‌هایی که هویت فارسیو را می‌سازند", "The principles that define Farsio"), icon: "solar:stars-minimalistic-bold",
      lead: tr(lang, "کیفیت فارسیو از ترکیب زبان، سرعت، شفافیت، حریم خصوصی و دسترس‌پذیری شکل می‌گیرد.", "Farsio quality comes from language, speed, transparency, privacy and accessibility working together."),
      sections: [
        { title: tr(lang, "فارسی در اولویت", "Persian-first"), body: tr(lang, "جهت نوشتار، تایپوگرافی، اصطلاحات و تعامل از ابتدا برای فارسی طراحی می‌شوند.", "Directionality, typography, terminology and interactions are designed around Persian from the start."), icon: "solar:star-fall-bold" },
        { title: tr(lang, "سریع و کم‌اصطکاک", "Fast and low-friction"), body: tr(lang, "جریان‌های اصلی کوتاه، قابل‌پیش‌بینی و مناسب استفاده روزمره می‌مانند.", "Core workflows stay short, predictable and useful in everyday work."), icon: "solar:bolt-bold" },
        { title: tr(lang, "حریم خصوصی در طراحی", "Privacy by design"), body: tr(lang, "کمینه‌سازی دسترسی و داده بخشی از تصمیم معماری است.", "Permission and data minimization are architecture decisions."), icon: "solar:shield-check-bold" },
        { title: tr(lang, "توسعه شفاف", "Transparent development"), body: tr(lang, "مخزن‌ها، Issueها و Releaseها مسیر فنی را قابل پیگیری نگه می‌دارند.", "Repositories, issues and releases keep the technical path reviewable."), icon: "solar:code-square-bold" },
        { title: tr(lang, "تجربه دو‌زبانه", "Bilingual experience"), body: tr(lang, "فارسی و انگلیسی مسیرهای مستقل و قابل ایندکس دارند.", "Persian and English have independent, indexable routes."), icon: "solar:translation-2-bold" },
        { title: tr(lang, "خوانایی و دسترس‌پذیری", "Readability and accessibility"), body: tr(lang, "ساختار معنایی، کنتراست، تم و RTL بخشی از کیفیت محصول‌اند.", "Semantic structure, contrast, themes and RTL support are part of product quality."), icon: "solar:accessibility-bold" },
      ],
    },
    docs: {
      eyebrow: "Farsio Guide", title: tr(lang, "راهنمای کامل فارسیو", "Farsio practical guide"), icon: "solar:book-2-bold",
      lead: tr(lang, "از انتخاب محصول تا نصب، استفاده، حریم خصوصی، گزارش مشکل و نسخه‌ها؛ این صفحه نقطه شروع مستندات است.", "From choosing a product to installation, usage, privacy, issue reporting and releases, this is the documentation starting point."),
      sections: [
        { title: tr(lang, "شروع", "Getting started"), body: tr(lang, "نوشت‌یار برای نوشتن و آوایار برای خواندن، ترجمه و شنیدن طراحی شده‌اند.", "NeveshtYar is for writing; AvaYar is for reading, translation and listening."), icon: "solar:home-2-bold", bullets: tr(lang, "صفحه محصول را بخوانید|نسخه را از مرجع رسمی بگیرید|GitHub مرجع فنی است", "Read the product page|Use official releases|GitHub is the technical source").split("|") },
        { title: tr(lang, "نصب نوشت‌یار", "Install NeveshtYar"), body: tr(lang, "نسخه عمومی مرجع v4.9.2 است. فایل و جزئیات را از Release رسمی دریافت کنید.", "The current public reference is v4.9.2. Use the official release for files and details."), icon: "solar:download-bold", bullets: tr(lang, "منبع رسمی را بررسی کنید|دسترسی‌های افزونه را مرور کنید|نسخه و مرورگر را در Issue بنویسید", "Verify the official source|Review permissions|Include version and browser in issues").split("|"), links: [{ label: "v4.9.2", href: LINKS.neveshtyarRelease, external: true }] },
        { title: tr(lang, "استفاده از نوشت‌یار", "Using NeveshtYar"), body: tr(lang, "پیشنهادها را قبل از استفاده نهایی مرور کنید، مخصوصاً در متن‌های تخصصی یا حساس.", "Review suggestions before final use, especially in specialist or sensitive text."), icon: "solar:pen-new-square-bold" },
        { title: tr(lang, "وضعیت آوایار", "AvaYar status"), body: tr(lang, "آوایار در حال توسعه است و مخزن رسمی مرجع پیشرفت فنی آن است.", "AvaYar is in development and the official repository is the technical progress source."), icon: "solar:soundwave-bold", links: [{ label: "AvaYar GitHub", href: LINKS.avaGithub, external: true }] },
        { title: tr(lang, "حریم خصوصی", "Privacy"), body: tr(lang, "دسترسی و داده باید تا حد نیاز واقعی قابلیت‌ها محدود بمانند؛ اطلاعات حساس را در Issue عمومی منتشر نکنید.", "Permissions and data should stay limited to real needs; never publish sensitive information in public issues."), icon: "solar:shield-check-bold", links: [{ label: tr(lang, "صفحه حریم خصوصی", "Privacy page"), href: localPath(lang, "/privacy") }] },
        { title: tr(lang, "گزارش مشکل", "Report an issue"), body: tr(lang, "نسخه، محیط، مراحل بازتولید، رفتار واقعی و رفتار مورد انتظار را واضح ثبت کنید.", "Include version, environment, reproduction steps, actual behavior and expected behavior."), icon: "solar:bug-bold", links: [{ label: tr(lang, "راهنمای Issue", "Issue guide"), href: localPath(lang, "/report-issue") }] },
      ],
    },
    releases: { eyebrow: "Release Notes", title: tr(lang, "وضعیت انتشار محصولات", "Product release status"), lead: tr(lang, "نسخه عمومی و وضعیت توسعه محصولات را از منابع رسمی دنبال کنید.", "Follow public releases and development status through official sources."), icon: "solar:tag-bold", sections: [
      { title: "NeveshtYar · v4.9.2", body: tr(lang, "نسخه مرجع عمومی نوشت‌یار با فایل‌ها و تاریخچه در GitHub رسمی.", "The public NeveshtYar reference release with files and history on official GitHub."), icon: "solar:verified-check-bold", links: [{ label: "GitHub Release", href: LINKS.neveshtyarRelease, external: true }] },
      { title: "AvaYar", body: tr(lang, "آوایار در حال توسعه است؛ وضعیت فنی را از مخزن رسمی دنبال کنید.", "AvaYar is in development; follow its official repository for progress."), icon: "solar:soundwave-bold", links: [{ label: "GitHub", href: LINKS.avaGithub, external: true }] },
    ] },
    community: { eyebrow: "Farsio Community", title: tr(lang, "توسعه‌ای قابل مشاهده و مشارکت", "Visible and approachable development"), lead: tr(lang, "GitHub مرجع اصلی فعالیت فنی فارسیو است.", "GitHub is Farsio's primary technical home."), icon: "solar:users-group-rounded-bold", sections: [
      { title: tr(lang, "سازمان GitHub فارسیو", "Farsio GitHub organization"), body: tr(lang, "مخزن‌های رسمی و تاریخچه توسعه در FarsioIR نگهداری می‌شوند.", "Official repositories and development history live under FarsioIR."), icon: "mdi:github", links: [{ label: "FarsioIR", href: LINKS.farsioGithub, external: true }] },
      { title: tr(lang, "Issueهای قابل‌پیگیری", "Trackable issues"), body: tr(lang, "برای خطا یا پیشنهاد مشخص، Issue یک سابقه فنی روشن ایجاد می‌کند.", "For bugs or concrete proposals, issues create a clear technical record."), icon: "solar:bug-bold", links: [{ label: tr(lang, "راهنمای Issue", "Issue guide"), href: localPath(lang, "/report-issue") }] },
      { title: tr(lang, "مشارکت متمرکز", "Focused contributions"), body: tr(lang, "PRهای کوچک، مستند و قابل تست بررسی را ساده‌تر می‌کنند.", "Small, documented and testable pull requests are easier to review."), icon: "solar:branching-paths-up-bold", links: [{ label: tr(lang, "راهنمای مشارکت", "Contribution guide"), href: localPath(lang, "/contribute") }] },
    ] },
    "report-issue": { eyebrow: "Issue Quality", title: tr(lang, "یک Issue خوب، نصف مسیر حل مسئله است", "A good issue removes half the debugging work"), lead: tr(lang, "گزارش حرفه‌ای باید بازتولیدپذیر، کوتاه و عاری از اطلاعات حساس باشد.", "A useful report should be reproducible, concise and free of sensitive information."), icon: "solar:bug-bold", sections: [
      { title: tr(lang, "محصول و نسخه", "Product and version"), body: tr(lang, "نام محصول، نسخه و مرورگر یا محیط را ثبت کنید.", "Record product, release, browser and environment."), icon: "solar:info-circle-bold" },
      { title: tr(lang, "مراحل بازتولید", "Reproduction steps"), body: tr(lang, "مراحل را کوتاه و به ترتیب از وضعیت شروع تا خطا بنویسید.", "Write short ordered steps from starting state to failure."), icon: "solar:list-check-bold" },
      { title: tr(lang, "واقعی و مورد انتظار", "Actual vs expected"), body: tr(lang, "رفتار واقعی و رفتار مورد انتظار را جدا توضیح دهید.", "Describe actual and expected behavior separately."), icon: "solar:checklist-minimalistic-bold" },
      { title: tr(lang, "مدرک امن", "Safe evidence"), body: tr(lang, "تصویر یا لاگ مفید است، اما توکن، کلید و داده حساس را حذف کنید.", "Screenshots or logs help, but remove tokens, keys and sensitive data."), icon: "solar:shield-check-bold" },
    ] },
    contribute: { eyebrow: "Contribute", title: tr(lang, "مشارکت خوب، کوچک و قابل بررسی است", "Good contributions are focused and reviewable"), lead: tr(lang, "از مخزن درست شروع کنید، مسئله را روشن نگه دارید و تغییر را همراه validation ارائه دهید.", "Start from the correct repository, keep the problem clear and submit changes with validation."), icon: "solar:branching-paths-up-bold", sections: [
      { title: tr(lang, "مسئله را روشن کنید", "Clarify the problem"), body: tr(lang, "برای تغییر بزرگ ابتدا دامنه و رفتار مورد انتظار را در Issue روشن کنید.", "For larger changes, clarify scope and expected behavior in an issue first."), icon: "solar:dialog-2-bold" },
      { title: tr(lang, "PR متمرکز", "Focused PR"), body: tr(lang, "هر PR یک هدف اصلی داشته باشد و از تغییرات نامرتبط دور بماند.", "Keep each PR centered on one main goal."), icon: "solar:branching-paths-up-bold" },
      { title: tr(lang, "تست و validation", "Test and validate"), body: tr(lang, "build یا validation مخزن را اجرا و نتیجه را در PR ثبت کنید.", "Run repository build or validation and document the result."), icon: "solar:test-tube-bold" },
      { title: tr(lang, "بدون داده حساس", "No sensitive data"), body: tr(lang, "کلید، توکن و داده کاربران نباید وارد commit یا Issue عمومی شوند.", "Secrets, tokens and user data must not enter public commits or issues."), icon: "solar:shield-check-bold" },
    ] },
    about: { eyebrow: "Farsio · فارسیو", title: tr(lang, "فارسیو برای بهترکردن تجربه دیجیتال فارسی ساخته می‌شود", "Farsio is building a better digital Persian experience"), lead: tr(lang, "فارسیو خانه محصولاتی است که فارسی را در مسئله، طراحی، متن و رفتار محصول از ابتدا جدی می‌گیرند.", "Farsio is a product home for tools that treat Persian as a first-class requirement."), icon: "solar:stars-minimalistic-bold", sections: [
      { title: tr(lang, "ماموریت", "Mission"), body: tr(lang, "کم‌کردن اصطکاک کار با فارسی در نوشتن، اصلاح، خواندن، ترجمه و شنیدن.", "Reduce friction in Persian writing, correction, reading, translation and listening."), icon: "solar:target-bold" },
      { title: tr(lang, "فارسی یک نیاز اصلی است", "Persian is first-class"), body: tr(lang, "جهت نوشتار، تایپ و کیفیت متن باید از پایه در محصول دیده شوند.", "Directionality, typing habits and Persian text quality belong in the foundation."), icon: "solar:star-fall-bold" },
      { title: tr(lang, "هر محصول یک مسئله روشن", "One clear problem per product"), body: tr(lang, "نوشت‌یار و آوایار هرکدام یک مجموعه مسئله مشخص را هدف می‌گیرند.", "NeveshtYar and AvaYar each target a defined set of problems."), icon: "solar:widget-4-bold" },
      { title: tr(lang, "شفافیت فنی", "Technical transparency"), body: tr(lang, "نسخه‌ها و تاریخچه توسعه از GitHub قابل مشاهده و پیگیری‌اند.", "Releases and development history remain visible through GitHub."), icon: "solar:code-square-bold" },
      { title: tr(lang, "بنیان‌گذار و سازنده: امیر متفکر", "Founder & maker: Amir Motefaker"), body: tr(lang, "فارسیو با تمرکز بر محصول‌سازی، مهندسی و تجربه فارسی‌محور توسعه داده می‌شود.", "Farsio is developed around product engineering and Persian-first user experience."), icon: "solar:user-id-bold", links: [{ label: "amirmotefaker.ir", href: LINKS.founder, external: true }] },
    ] },
    contact: {
      eyebrow: "Contact",
      title: tr(
        lang,
        "تماس با فارسیو؛ هر موضوع از مسیر درست",
        "Contact Farsio through the right channel",
      ),
      lead: tr(
        lang,
        "برای پشتیبانی نوشت‌یار و آوایار، گزارش خطا، پیشنهاد قابلیت، همکاری یا ارتباط تجاری، مسیر مناسب را انتخاب کنید تا درخواست قابل‌پیگیری بماند.",
        "Choose the appropriate route for NeveshtYar and AvaYar support, bug reports, feature proposals, collaboration or business contact.",
      ),
      icon: "solar:letter-bold",
      sections: [
        {
          title: tr(lang, "پشتیبانی نوشت‌یار", "NeveshtYar support"),
          body: tr(
            lang,
            "برای خطا، رفتار غیرمنتظره یا پیشنهاد قابلیت نوشت‌یار از مخزن رسمی استفاده کنید. نسخه، مرورگر، مراحل بازتولید و نتیجه مورد انتظار را بنویسید.",
            "For NeveshtYar bugs, unexpected behavior or feature proposals, use the official repository. Include version, browser, reproduction steps and expected behavior.",
          ),
          icon: "solar:pen-new-square-bold",
          bullets: tr(
            lang,
            "نسخه و مرورگر را مشخص کنید|مراحل بازتولید را کوتاه و دقیق بنویسید|اطلاعات حساس را در Issue عمومی منتشر نکنید",
            "Include version and browser|Write concise reproduction steps|Never publish sensitive information in a public issue",
          ).split("|"),
          links: [
            { label: "NeveshtYar GitHub", href: LINKS.neveshtyarGithub, external: true },
            { label: tr(lang, "راهنمای گزارش مشکل", "Issue reporting guide"), href: localPath(lang, "/report-issue") },
          ],
        },
        {
          title: tr(lang, "پشتیبانی آوایار", "AvaYar support"),
          body: tr(
            lang,
            "آوایار در حال توسعه است. Issueها و وضعیت فنی باید از مخزن رسمی آن پیگیری شوند.",
            "AvaYar is in development. Issues and technical progress should be followed through its official repository.",
          ),
          icon: "solar:soundwave-bold",
          bullets: tr(
            lang,
            "نوع صفحه یا محتوای ورودی را توضیح دهید|رفتار واقعی و مورد انتظار را بنویسید|در صورت نیاز محیط و مرورگر را ذکر کنید",
            "Describe the page or input content|Explain actual and expected behavior|Include environment and browser when relevant",
          ).split("|"),
          links: [
            { label: "AvaYar GitHub", href: LINKS.avaGithub, external: true },
            { label: tr(lang, "صفحه آوایار", "AvaYar product page"), href: localPath(lang, "/products/avayar") },
          ],
        },
        {
          title: tr(lang, "پیشنهاد محصول و تجربه کاربری", "Product and UX feedback"),
          body: tr(
            lang,
            "اگر پیشنهادی برای تجربه فارسی، قابلیت محصول یا مسیر استفاده دارید، بهتر است مسئله و نتیجه مطلوب را به‌وضوح توضیح دهید؛ نه فقط نام یک قابلیت.",
            "For product or UX proposals, describe the underlying problem and desired outcome rather than only naming a feature.",
          ),
          icon: "solar:lightbulb-bolt-bold",
          links: [
            { label: tr(lang, "محصولات فارسیو", "Farsio products"), href: localPath(lang, "/products") },
            { label: "FarsioIR", href: LINKS.farsioGithub, external: true },
          ],
        },
        {
          title: tr(lang, "همکاری و مشارکت فنی", "Technical collaboration"),
          body: tr(
            lang,
            "برای مشارکت کد، مستندات یا بهبودهای فنی، ابتدا Issue و راهنمای مشارکت را بررسی و تغییرات را در Pull Requestهای کوچک و قابل‌مرور ارائه کنید.",
            "For code, documentation or technical contributions, review existing issues and contribution guidance, then keep pull requests small and reviewable.",
          ),
          icon: "solar:code-square-bold",
          links: [
            { label: tr(lang, "راهنمای مشارکت", "Contribution guide"), href: localPath(lang, "/contribute") },
            { label: "GitHub", href: LINKS.farsioGithub, external: true },
          ],
        },
        {
          title: tr(lang, "حریم خصوصی یا موضوع حساس", "Privacy or sensitive topics"),
          body: tr(
            lang,
            "داده شخصی، کلید API، متن محرمانه یا اطلاعات حساس را در Issue عمومی GitHub قرار ندهید. ابتدا اصول حریم خصوصی فارسیو را مرور کنید.",
            "Do not publish personal data, API keys, confidential text or other sensitive information in public GitHub issues. Review Farsio privacy principles first.",
          ),
          icon: "solar:shield-check-bold",
          links: [
            { label: tr(lang, "حریم خصوصی فارسیو", "Farsio privacy"), href: localPath(lang, "/privacy") },
          ],
        },
        {
          title: tr(lang, "همکاری تجاری و ارتباط با سازنده", "Business and maker contact"),
          body: tr(
            lang,
            "برای موضوعات تجاری، همکاری بین‌محصولی، پرتفوی یا ارتباط مستقیم با سازنده فارسیو، وب‌سایت رسمی امیر متفکر مرجع ارتباط است.",
            "For business topics, cross-product collaboration, portfolio matters or direct maker contact, use Amir Motefaker's official website.",
          ),
          icon: "solar:global-bold",
          links: [
            { label: "amirmotefaker.ir", href: LINKS.founder, external: true },
          ],
        },
      ],
    },
    privacy: { eyebrow: "Privacy", title: tr(lang, "حریم خصوصی باید بخشی از طراحی باشد", "Privacy should be part of product design"), lead: tr(lang, "فارسیو حریم خصوصی را با کمینه‌سازی، شفافیت و کنترل کاربر تعریف می‌کند.", "Farsio frames privacy around minimization, transparency and user control."), icon: "solar:shield-check-bold", sections: [
      { title: tr(lang, "کمینه‌سازی", "Minimization"), body: tr(lang, "دسترسی و داده فقط تا جایی استفاده شوند که قابلیت واقعی نیاز دارد.", "Permissions and data should only be used to the extent required by functionality."), icon: "solar:minimalistic-magnifer-bold" },
      { title: tr(lang, "شفافیت", "Transparency"), body: tr(lang, "رفتار مهم، نسخه و تغییرات از مرجع فنی قابل بررسی باشند.", "Important behavior, releases and changes should remain reviewable through official sources."), icon: "solar:eye-bold" },
      { title: tr(lang, "کنترل کاربر", "User control"), body: tr(lang, "پیشنهاد هوشمند نباید جای تصمیم کاربر را بگیرد.", "Intelligent suggestions should not replace user decisions."), icon: "solar:shield-check-bold" },
      { title: tr(lang, "جزئیات هر محصول", "Product-specific details"), body: tr(lang, "جزئیات را با نسخه و مخزن همان محصول بررسی کنید.", "Review the relevant release and repository for product-specific details."), icon: "solar:document-text-bold" },
    ] },
  };
  return data[key];
}

export function GenericPage({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  const page = pageData(lang, pageKey);
  return (
    <main className="shell inner-page pro-page">
      <Breadcrumb lang={lang} current={page.title} />
      <Hero eyebrow={page.eyebrow} title={page.title} lead={page.lead} icon={page.icon} />
      <div className="pro-section-stack">{page.sections.map((section, index) => (
        <section className="pro-content-section" key={section.title}>
          <div className="pro-content-index">{String(index + 1).padStart(2, "0")}</div>
          <div className="pro-content-main">
            <span className="pro-card-icon"><Icon icon={section.icon} /></span>
            <h2>{section.title}</h2><p>{section.body}</p>
            {section.bullets ? <ul className="pro-check-list">{section.bullets.map((x) => <li key={x}><Icon icon="solar:check-circle-bold" /><span>{x}</span></li>)}</ul> : null}
            {section.links ? <div className="pro-link-row">{section.links.map((link) => <a className="button button-secondary" href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} key={link.label}>{link.label}<Icon icon="solar:arrow-left-linear" /></a>)}</div> : null}
          </div>
        </section>
      ))}</div>
    </main>
  );
}

function faqItems(lang: Lang): [string, string][] {
  return lang === "fa" ? [
    ["فارسیو چیست؟", "فارسیو خانه محصولاتی برای بهترشدن تجربه دیجیتال فارسی است. نوشت‌یار و آوایار نخستین محصولات این خانواده‌اند."],
    ["نوشت‌یار چه کاری انجام می‌دهد؟", "نوشت‌یار روی نوشتن فارسی و انگلیسی، فینگلیش، بازیابی چیدمان صفحه‌کلید، املا و RTL تمرکز دارد."],
    ["آوایار منتشر شده است؟", "آوایار در حال توسعه است و صفحه اختصاصی و مخزن رسمی آن وضعیت فعلی را توضیح می‌دهند."],
    ["نسخه رسمی نوشت‌یار را از کجا بگیرم؟", "مرجع نسخه عمومی، Release رسمی v4.9.2 در مخزن NeveshtYar سازمان FarsioIR است."],
    ["برای گزارش خطا چه اطلاعاتی لازم است؟", "نسخه، مرورگر، مراحل بازتولید، رفتار واقعی و رفتار مورد انتظار را ثبت کنید و داده حساس منتشر نکنید."],
    ["محصولات فارسیو متن‌باز هستند؟", "مخزن و تاریخچه توسعه محصولات اصلی در GitHub قابل مشاهده است. مجوز هر محصول را از همان مخزن بررسی کنید."],
    ["چرا فارسی و انگلیسی URL جدا دارند؟", "هر زبان URL مستقل و متادیتای اختصاصی دارد تا تجربه کاربر و فهم موتورهای جستجو روشن‌تر باشد."],
    ["چطور مشارکت کنم؟", "از صفحه مشارکت شروع کنید، مخزن مناسب را انتخاب کنید و تغییرات کوچک و قابل‌بررسی را در Pull Request ارائه دهید."],
  ] : [
    ["What is Farsio?", "Farsio is the product home for tools designed to improve the digital Persian experience. NeveshtYar and AvaYar are the first products."],
    ["What does NeveshtYar do?", "NeveshtYar focuses on Persian and English writing, Finglish correction, keyboard-layout recovery, spelling and RTL workflows."],
    ["Is AvaYar publicly released?", "AvaYar is in development. Its dedicated page and official repository describe current status."],
    ["Where can I get NeveshtYar?", "The current public reference is the official NeveshtYar v4.9.2 release in FarsioIR."],
    ["What should an issue include?", "Include version, browser, reproduction steps, actual behavior and expected behavior. Never publish sensitive data."],
    ["Are Farsio products open source?", "Main product repositories and development history are visible on GitHub. Check each repository for its license."],
    ["Why separate Persian and English URLs?", "Each language has an independent URL and metadata so users and search systems can understand the correct version."],
    ["How can I contribute?", "Start from the contribution page, choose the right repository and submit small, reviewable pull requests."],
  ];
}

export function FaqPage({ lang }: { lang: Lang }) {
  return <main className="shell inner-page pro-page">
    <Breadcrumb lang={lang} current="FAQ" />
    <Hero eyebrow="FAQ" title={tr(lang, "پاسخ‌های روشن به سوالات پرتکرار", "Clear answers to common Farsio questions")} lead={tr(lang, "پاسخ‌های رسمی درباره محصولات، نسخه‌ها، GitHub، حریم خصوصی و مشارکت.", "Official answers about products, releases, GitHub, privacy and contribution.")} icon="solar:question-circle-bold" />
    <div className="pro-faq-list">{faqItems(lang).map(([q, a]) => <details key={q}><summary>{q}<Icon icon="solar:alt-arrow-down-linear" /></summary><p>{a}</p></details>)}</div>
  </main>;
}

export function ProfessionalFooter({ lang, brand }: { lang: Lang; brand: ReactNode }) {
  return <footer className="site-footer">
    <div className="shell footer-main">
      <div className="footer-brand">{brand}<p>{tr(lang, "فارسیو؛ خانه‌ی ابزارهای فارسی‌محور برای نوشتن، خواندن، ترجمه و شنیدن بهتر.", "Farsio builds Persian-first tools for better writing, reading, translation and listening.")}</p><div className="footer-social"><a href={LINKS.farsioGithub} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon icon="mdi:github" /></a><a href={LINKS.founder} target="_blank" rel="noreferrer" aria-label="Amir Motefaker"><Icon icon="solar:global-bold" /></a></div></div>
      <div className="footer-column"><strong>{tr(lang, "محصولات", "Products")}</strong><a href={localPath(lang, "/products")}>{tr(lang, "همه محصولات", "All products")}</a><a href={localPath(lang, "/products/neveshtyar")}>NeveshtYar · نوشت‌یار</a><a href={localPath(lang, "/products/avayar")}>AvaYar · آوایار</a></div>
      <div className="footer-column"><strong>{tr(lang, "منابع", "Resources")}</strong><a href={localPath(lang, "/docs")}>{tr(lang, "راهنما", "Guide")}</a><a href={localPath(lang, "/faq")}>FAQ</a><a href={localPath(lang, "/releases")}>{tr(lang, "نسخه‌ها", "Releases")}</a><a href={localPath(lang, "/features")}>{tr(lang, "ویژگی‌ها", "Features")}</a></div>
      <div className="footer-column"><strong>{tr(lang, "جامعه", "Community")}</strong><a href={localPath(lang, "/community")}>{tr(lang, "جامعه و GitHub", "Community & GitHub")}</a><a href={localPath(lang, "/report-issue")}>{tr(lang, "گزارش مشکل", "Report an issue")}</a><a href={localPath(lang, "/contribute")}>{tr(lang, "مشارکت", "Contribute")}</a></div>
      <div className="footer-column"><strong>Farsio · فارسیو</strong><a href={localPath(lang, "/about")}>{tr(lang, "درباره", "About")}</a><a href={localPath(lang, "/contact")}>{tr(lang, "تماس", "Contact")}</a><a href={localPath(lang, "/privacy")}>{tr(lang, "حریم خصوصی", "Privacy")}</a></div>
    </div>
    <div className="shell footer-bottom"><span>© 2026 Farsio.ir</span><span>{tr(lang, "تمام حقوق محفوظ است.", "All rights reserved.")}</span><span>فارسی / EN</span></div>
    <div className="shell founder-signature" dir="rtl"><strong>ساخته‌شده با <span className="signature-heart">♥</span> توسط <a className="signature-founder" href={LINKS.founder} target="_blank" rel="author noopener noreferrer">امیر متفکر</a> <span className="signature-dot">•</span> <a className="signature-farsio" href={LINKS.farsio}>فارسیو</a></strong></div>
  </footer>;
}
