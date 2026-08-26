export type Lang = "fa" | "en";

export const languages: {
  code: Lang;
  label: string;
  short: string;
  dir: "rtl" | "ltr";
}[] = [
  {
    code: "fa",
    label: "فارسی",
    short: "FA",
    dir: "rtl",
  },
  {
    code: "en",
    label: "English",
    short: "EN",
    dir: "ltr",
  },
];

type Dictionary = Record<string, string>;

const fa: Dictionary = {
  navProducts: "محصولات",
  navFeatures: "ویژگی‌ها",
  navDocs: "راهنما",
  navAbout: "درباره",
  navCta: "مشاهده محصولات",

  heroKicker: "ابزارهای هوشمند برای فارسی، با تمرکز بر تجربه‌ی واقعی",
  heroTitleA: "بهترین تجربه‌ی ",
  heroTitleB: "نوشتن، خواندن و شنیدن فارسی",
  heroBody:
    "فارسیو خانه‌ی ابزارهای فارسی‌محور است؛ محصولاتی دقیق، سریع و خوش‌ساخت برای اینکه تجربه‌ی دیجیتال فارسی طبیعی‌تر و لذت‌بخش‌تر باشد.",
  explore: "مشاهده محصولات",
  githubCta: "GitHub فارسیو",
  trustPrivacy: "حریم خصوصی‌محور",
  trustOpen: "توسعه شفاف",
  trustPersian: "ساخته‌شده برای فارسی",

  productsEyebrow: "محصولات فارسیو",
  productsTitle: "دو محصول، یک هدف: تجربه‌ی بهتر فارسی",
  productsBody:
    "نوشت‌یار برای نوشتن بهتر و آوایار برای شنیدن بهتر؛ هر دو زیر یک هویت محصولی منسجم و فارسی‌محور.",
  neveshtyar: "نوشت‌یار",
  neveshtyarTag: "بنویس، درست و روان",
  neveshtyarBody:
    "کمک به اصلاح نوشتار، بازیابی چیدمان صفحه‌کلید، Finglish و کار با متن فارسی در مرورگر؛ سریع و قابل کنترل.",
  ava: "آوایار",
  avaTag: "بشنو، به فارسی",
  avaBody:
    "محتوای وب را می‌گیرد، در صورت نیاز به فارسی روان برمی‌گرداند و آن را برای شنیدن با صدای فارسی آماده می‌کند.",
  statePublic: "نسخه عمومی",
  stateDev: "در حال توسعه",
  learnMore: "بیشتر بدانید",

  featuresEyebrow: "چرا فارسیو؟",
  featuresTitle: "هویت محصولی متفاوت، نه فقط یک ظاهر زیبا",
  feature1Title: "فارسی در اولویت",
  feature1Body:
    "ساختار محصول، رابط و محتوا از ابتدا برای زبان فارسی طراحی می‌شوند.",
  feature2Title: "هوشمند و دقیق",
  feature2Body:
    "رفتار محصول محافظه‌کارانه، قابل بررسی و متناسب با متن واقعی فارسی طراحی می‌شود.",
  feature3Title: "سریع و سبک",
  feature3Body:
    "تمرکز بر پاسخ‌گویی سریع، پیچیدگی کمتر و تجربه‌ای روان در استفاده روزمره.",
  feature4Title: "توسعه شفاف",
  feature4Body:
    "بخش مهمی از توسعه، انتشار و تاریخچه فنی محصولات روی GitHub قابل مشاهده است.",
  feature5Title: "حریم خصوصی",
  feature5Body:
    "کمینه‌سازی دسترسی‌ها و جریان داده، بخشی از طراحی محصول است نه یک ویژگی جانبی.",

  showcaseEyebrow: "نگاهی نزدیک",
  showcaseTitle: "محصول باید در عمل زیبا و ساده باشد",
  showcaseBody:
    "یک زبان طراحی مشترک برای نوشتن، اصلاح، خواندن و شنیدن؛ با رابط‌هایی که شلوغ نمی‌شوند.",
  showcaseVoice: "آوایار — تجربه‌ی شنیدن فارسی",
  showcaseEditor: "نوشت‌یار — دستیار نوشتاری شما",
  showcaseReview: "بررسی هوشمند متن",

  metricProducts: "محصول فعال در خانواده فارسیو",
  metricLanguages: "زبان رسمی وب‌سایت",
  metricOpen: "توسعه و انتشار روی GitHub",
  metricPrivacy: "حریم خصوصی در طراحی",

  faqTitle: "سوالات متداول",
  faq1Q: "فارسیو چیست؟",
  faq1A:
    "فارسیو برند مادر مجموعه‌ای از ابزارهای فارسی‌محور است. نوشت‌یار و آوایار نخستین محصولات این خانواده هستند.",
  faq2Q: "آیا فارسیو فقط فارسی است؟",
  faq2A:
    "تمرکز محصول روی فارسی است، اما وب‌سایت رسمی فعلاً به دو زبان فارسی و انگلیسی ارائه می‌شود.",
  faq3Q: "محصولات فارسیو متن‌باز هستند؟",
  faq3A:
    "مسیر توسعه و انتشار محصولات اصلی روی GitHub قابل مشاهده است. وضعیت و مجوز هر محصول در مخزن رسمی همان محصول مشخص می‌شود.",
  faq4Q: "چطور وضعیت نسخه‌ها را دنبال کنم؟",
  faq4A:
    "GitHub مرجع فنی برای Releaseها، تغییرات نسخه، Issueها و وضعیت توسعه محصولات فارسیو است.",

  ctaEyebrow: "Farsio · فارسیو",
  ctaTitle: "تجربه‌ی فارسی دیجیتال را بهتر کنید",
  ctaBody:
    "محصول مناسب خود را ببینید یا مسیر توسعه فارسیو را در GitHub دنبال کنید.",

  aboutTitle: "فارسیو چیست؟",
  aboutBody:
    "فارسیو یک برند محصولی برای ساخت تجربه‌های دیجیتال فارسی‌محور است. نوشت‌یار و آوایار اولین محصولات این خانواده‌اند و ساختار برند برای محصولات بعدی هم آماده شده است.",

  docsStart: "شروع",
  docsStartBody:
    "فارسیو خانواده‌ای از محصولات برای بهتر نوشتن، خواندن و شنیدن فارسی است. این راهنما همراه محصولات کامل‌تر می‌شود.",
  docsInstall: "نصب نوشت‌یار",
  docsInstallBody:
    "نسخه عمومی نوشت‌یار از GitHub Release رسمی در دسترس است و بسته‌های Chromium و Firefox به‌صورت جداگانه منتشر می‌شوند.",
  docsAva: "آوایار",
  docsAvaBody:
    "آوایار در حال توسعه است. صفحه رسمی محصول همزمان با آماده‌شدن نسخه‌های عمومی، روش استفاده و وضعیت انتشار را نمایش خواهد داد.",
  docsPrivacy: "حریم خصوصی",
  docsPrivacyBody:
    "اصل طراحی فارسیو کمینه‌سازی داده و شفافیت است. هر محصول اعلامیه و جزئیات حریم خصوصی مخصوص خود را خواهد داشت.",
  docsFaq: "سوالات پرتکرار",
  docsFaqBody:
    "برای گزارش خطا، پیشنهاد قابلیت و وضعیت فنی، GitHub مرجع اصلی توسعه محصولات فارسیو است.",

  footerBrandBody:
    "فارسیو؛ خانه‌ی ابزارهای فارسی‌محور برای نوشتن، خواندن و شنیدن بهتر.",
  footerProducts: "محصولات",
  footerAllProducts: "همه محصولات",
  footerResources: "منابع",
  footerCommunity: "جامعه",
  footerReport: "گزارش مشکل",
  footerContribute: "مشارکت در توسعه",
  footerCompany: "فارسیو",
  footerContact: "تماس",
  footerPrivacy: "حریم خصوصی",
  footerRights: "تمام حقوق محفوظ است.",
};

const en: Dictionary = {
  navProducts: "Products",
  navFeatures: "Features",
  navDocs: "Docs",
  navAbout: "About",
  navCta: "Explore products",

  heroKicker: "Intelligent tools for Persian, built around real product experience",
  heroTitleA: "A better way to ",
  heroTitleB: "write, read and listen in Persian",
  heroBody:
    "Farsio is the home of Persian-first products: thoughtful, fast and well-crafted tools designed to make digital Persian feel more natural.",
  explore: "Explore products",
  githubCta: "Farsio on GitHub",
  trustPrivacy: "Privacy-minded",
  trustOpen: "Open development",
  trustPersian: "Built for Persian",

  productsEyebrow: "Farsio products",
  productsTitle: "Two products, one goal: a better Persian experience",
  productsBody:
    "NeveshtYar helps you write better. AvaYar helps you listen better. Both belong to one coherent Persian-first product family.",
  neveshtyar: "NeveshtYar",
  neveshtyarTag: "NeveshtYar by Farsio",
  neveshtyarBody:
    "Persian & English writing assistant, keyboard-layout recovery and Finglish correction.",
  ava: "AvaYar",
  avaTag: "Persian Reading & Listening Assistant by Farsio",
  avaBody:
    "Persian-first web reading, translation and text-to-speech experience.",
  statePublic: "Public release",
  stateDev: "In development",
  learnMore: "Learn more",

  featuresEyebrow: "Why Farsio?",
  featuresTitle: "A distinct product identity, not just a pretty interface",
  feature1Title: "Persian-first",
  feature1Body:
    "Product structure, interface and content are designed for Persian from the beginning.",
  feature2Title: "Thoughtful intelligence",
  feature2Body:
    "Product behavior is designed to be conservative, reviewable and useful for real Persian text.",
  feature3Title: "Fast & lightweight",
  feature3Body:
    "Responsive workflows, less complexity and a smooth everyday experience.",
  feature4Title: "Open development",
  feature4Body:
    "Important parts of development, releases and technical history are visible on GitHub.",
  feature5Title: "Privacy-minded",
  feature5Body:
    "Permission and data-flow minimization are part of product design, not an afterthought.",

  showcaseEyebrow: "A closer look",
  showcaseTitle: "Products should feel simple and beautiful in real use",
  showcaseBody:
    "A shared design language for writing, correction, reading and listening without unnecessary interface clutter.",
  showcaseVoice: "AvaYar — Persian listening",
  showcaseEditor: "NeveshtYar — your writing assistant",
  showcaseReview: "Smart text review",

  metricProducts: "products in the Farsio family",
  metricLanguages: "official website languages",
  metricOpen: "development and releases on GitHub",
  metricPrivacy: "privacy as a design principle",

  faqTitle: "Frequently asked questions",
  faq1Q: "What is Farsio?",
  faq1A:
    "Farsio is the umbrella brand for Persian-first digital tools. NeveshtYar and AvaYar are the first products in the family.",
  faq2Q: "Is Farsio Persian-only?",
  faq2A:
    "The product focus is Persian, while the official website currently supports Persian and English.",
  faq3Q: "Are Farsio products open source?",
  faq3A:
    "Core development and release history are visible on GitHub. Each product repository defines its own current status and license.",
  faq4Q: "Where can I follow releases?",
  faq4A:
    "GitHub is the technical source of truth for releases, changes, issues and development status.",

  ctaEyebrow: "Farsio · فارسیو",
  ctaTitle: "Make your digital Persian experience better",
  ctaBody:
    "Explore the right product for you or follow Farsio's development on GitHub.",

  aboutTitle: "What is Farsio?",
  aboutBody:
    "Farsio is a product brand focused on Persian-first digital experiences. NeveshtYar and AvaYar are the first products in a structure designed to grow.",

  docsStart: "Getting started",
  docsStartBody:
    "Farsio is a family of products for writing, reading and listening in Persian. These docs will grow alongside the products.",
  docsInstall: "Install NeveshtYar",
  docsInstallBody:
    "NeveshtYar's public release is available from the official GitHub Release page, with separate Chromium and Firefox packages.",
  docsAva: "AvaYar",
  docsAvaBody:
    "AvaYar is in development. Its official product page will expose usage and release information as public versions become available.",
  docsPrivacy: "Privacy",
  docsPrivacyBody:
    "Farsio is designed around data minimization and transparency. Each product will maintain its own privacy information.",
  docsFaq: "FAQ",
  docsFaqBody:
    "GitHub is the technical source of truth for bug reports, feature requests and product development status.",

  footerBrandBody:
    "Farsio — Persian-first tools for writing, reading and listening better.",
  footerProducts: "Products",
  footerAllProducts: "All products",
  footerResources: "Resources",
  footerCommunity: "Community",
  footerReport: "Report an issue",
  footerContribute: "Contribute",
  footerCompany: "Farsio",
  footerContact: "Contact",
  footerPrivacy: "Privacy",
  footerRights: "All rights reserved.",
};

const dictionaries: Record<Lang, Dictionary> = {
  fa,
  en,
};

export function t(lang: Lang, key: string): string {
  return dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
}

export function languageMeta(lang: Lang) {
  return languages.find((item) => item.code === lang)!;
}
