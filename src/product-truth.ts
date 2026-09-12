export type ProductKey = "neveshtyar" | "avayar";
export type Locale = "fa" | "en";

export type LocalizedText = Record<Locale, string>;

export type ProductCapability = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  status: "stable" | "supported";
};

export type ProductTruth = {
  key: ProductKey;
  brand: "Farsio";
  canonicalName: string;
  localizedName: LocalizedText;
  tagline: LocalizedText;
  category: LocalizedText;
  version: string;
  releaseStatus: "stable";
  releaseDate: string;
  canonicalUrl: string;
  repositoryUrl: string;
  releaseUrl: string;
  sourceSha: string;
  platforms: string[];
  capabilities: ProductCapability[];
  privacyFacts: LocalizedText[];
};

export const FARSIO_BRAND = {
  canonicalName: "Farsio",
  localizedName: { fa: "فارسیو", en: "Farsio" },
  canonicalUrl: "https://farsio.ir",
  repositoryUrl: "https://github.com/FarsioIR",
  role: {
    fa: "برند مادر و مرجع رسمی آنلاین نوشت‌یار و آوایار",
    en: "Parent brand and canonical online authority for NeveshtYar and AvaYar",
  },
} as const;

export const PRODUCT_TRUTH: Record<ProductKey, ProductTruth> = {
  neveshtyar: {
    key: "neveshtyar",
    brand: "Farsio",
    canonicalName: "NeveshtYar",
    localizedName: { fa: "نوشت‌یار", en: "NeveshtYar" },
    tagline: { fa: "بنویس، درست و روان", en: "Write clearly, correctly and fluently" },
    category: { fa: "دستیار نوشتن فارسی و انگلیسی", en: "Persian & English writing assistant" },
    version: "4.9.2",
    releaseStatus: "stable",
    releaseDate: "2026-08-26",
    canonicalUrl: "https://farsio.ir/fa/products/neveshtyar",
    repositoryUrl: "https://github.com/FarsioIR/NeveshtYar",
    releaseUrl: "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
    sourceSha: "f47f64dbb504a87fa768e8ec119aa783b7ba7385",
    platforms: ["Chrome", "Edge", "Brave", "Opera", "Vivaldi", "Firefox"],
    capabilities: [
      {
        id: "keyboard-layout-recovery",
        name: { fa: "اصلاح دوطرفه چیدمان کیبورد", en: "Bidirectional keyboard-layout recovery" },
        description: {
          fa: "متنی را که با چیدمان اشتباه فارسی یا انگلیسی تایپ شده تشخیص می‌دهد و به چیدمان درست برمی‌گرداند.",
          en: "Detects text typed with the wrong Persian or English keyboard layout and restores the intended text.",
        },
        status: "stable",
      },
      {
        id: "finglish",
        name: { fa: "تبدیل فینگلیش", en: "Finglish conversion" },
        description: {
          fa: "کلمات و عبارت‌های رایج فینگلیش را به فارسی تبدیل می‌کند.",
          en: "Converts common Finglish words and phrases into Persian.",
        },
        status: "stable",
      },
      {
        id: "correct-text-preservation",
        name: { fa: "تشخیص متن صحیح", en: "Correct-text preservation" },
        description: {
          fa: "برای کاهش اصلاح ناخواسته، متن صحیح فارسی و انگلیسی را از ورودی نیازمند تبدیل تفکیک می‌کند.",
          en: "Distinguishes valid Persian and English text from input that actually needs correction.",
        },
        status: "stable",
      },
      {
        id: "inline-correction",
        name: { fa: "اصلاح درجا در وب", en: "Inline correction across the web" },
        description: {
          fa: "در کنار فیلدهای متنی وب، جریان اصلاح سریع و درجا ارائه می‌کند.",
          en: "Provides a fast inline correction workflow next to web text fields.",
        },
        status: "stable",
      },
      {
        id: "personal-dictionary",
        name: { fa: "دیکشنری شخصی", en: "Personal dictionary" },
        description: {
          fa: "واژه‌ها و اصلاحات شخصی کاربر را در تنظیمات افزونه مدیریت می‌کند.",
          en: "Lets users manage personal terms and corrections in extension settings.",
        },
        status: "stable",
      },
      {
        id: "user-learning",
        name: { fa: "یادگیری از اصلاحات کاربر", en: "Learning from user corrections" },
        description: {
          fa: "اصلاحات جدید تأییدشده کاربر را برای استفاده بعدی در حافظه افزونه نگه می‌دارد.",
          en: "Can retain user-approved corrections for later use in the extension.",
        },
        status: "supported",
      },
      {
        id: "bilingual-ui",
        name: { fa: "رابط فارسی و انگلیسی", en: "Bilingual Persian/English UI" },
        description: {
          fa: "رابط فارسی RTL و انگلیسی LTR با حفظ انتخاب زبان کاربر ارائه می‌شود.",
          en: "Provides Persian RTL and English LTR interfaces while preserving the user's language choice.",
        },
        status: "stable",
      },
      {
        id: "local-first",
        name: { fa: "اصلاح Local-first", en: "Local-first correction" },
        description: {
          fa: "هسته اصلاح متن بدون ارسال خودکار متن تایپی به سرویس جست‌وجو یا دانش ثالث اجرا می‌شود.",
          en: "Core text correction runs without automatically sending typed text to third-party search or knowledge services.",
        },
        status: "stable",
      },
    ],
    privacyFacts: [
      {
        fa: "نسخه فعلی برای عملکرد اصلی از مجوزهای storage و activeTab استفاده می‌کند.",
        en: "The current release uses storage and activeTab for its core browser workflow.",
      },
      {
        fa: "نسخه Store-safe جست‌وجوی خودکار ثالث و search interception را از runtime حذف کرده است.",
        en: "The Store-safe runtime removes automatic third-party search and search interception.",
      },
    ],
  },
  avayar: {
    key: "avayar",
    brand: "Farsio",
    canonicalName: "AvaYar",
    localizedName: { fa: "آوایار", en: "AvaYar" },
    tagline: { fa: "بشنو، به فارسی", en: "Listen, in Persian" },
    category: { fa: "دستیار خواندن و شنیدن فارسی", en: "Persian reading & listening assistant" },
    version: "0.6.0",
    releaseStatus: "stable",
    releaseDate: "2026-09-10",
    canonicalUrl: "https://farsio.ir/fa/products/avayar",
    repositoryUrl: "https://github.com/FarsioIR/AvaYar",
    releaseUrl: "https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0",
    sourceSha: "20d9da845c32e9873d332fb12192b38521d21232",
    platforms: ["Chrome", "Edge"],
    capabilities: [
      {
        id: "webpage-reading",
        name: { fa: "خواندن محتوای صفحه وب", en: "Webpage reading" },
        description: {
          fa: "متن صفحه فعال را برای جریان خواندن و شنیدن فارسی آماده می‌کند.",
          en: "Prepares text from the active webpage for Persian-first reading and listening.",
        },
        status: "stable",
      },
      {
        id: "full-text",
        name: { fa: "حالت متن کامل", en: "Full-text mode" },
        description: {
          fa: "امکان پردازش و شنیدن نسخه کامل محتوای استخراج‌شده را فراهم می‌کند.",
          en: "Processes and plays the full extracted content when full-text mode is selected.",
        },
        status: "stable",
      },
      {
        id: "summary",
        name: { fa: "حالت خلاصه", en: "Summary mode" },
        description: {
          fa: "برای مرور سریع‌تر، محتوای صفحه را به نسخه خلاصه فارسی آماده می‌کند.",
          en: "Prepares a concise Persian summary for faster review of webpage content.",
        },
        status: "stable",
      },
      {
        id: "english-to-persian",
        name: { fa: "آماده‌سازی انگلیسی به فارسی", en: "English-to-Persian preparation" },
        description: {
          fa: "محتوای انگلیسی را پیش از خواندن صوتی به نسخه فارسی مناسب جریان محصول تبدیل می‌کند.",
          en: "Prepares English content as Persian before the listening workflow.",
        },
        status: "stable",
      },
      {
        id: "persian-neural-tts",
        name: { fa: "تبدیل متن فارسی به گفتار", en: "Persian neural text-to-speech" },
        description: {
          fa: "خروجی فارسی را با مسیر TTS واقعی فارسی به صوت تبدیل می‌کند.",
          en: "Converts the Persian result to audio using the production Persian TTS path.",
        },
        status: "stable",
      },
      {
        id: "dual-voice",
        name: { fa: "دو صدای Sulafat و Iapetus", en: "Sulafat and Iapetus voices" },
        description: {
          fa: "کاربر می‌تواند بین صدای Sulafat و Iapetus انتخاب کند؛ هر دو در Acceptance واقعی مرورگر تأیید شده‌اند.",
          en: "Users can choose between Sulafat and Iapetus; both passed real-browser acceptance.",
        },
        status: "stable",
      },
      {
        id: "progressive-playback",
        name: { fa: "پخش تدریجی صدا", en: "Progressive audio playback" },
        description: {
          fa: "پخش را بخش‌به‌بخش آغاز می‌کند تا برای آماده‌شدن کل متن منتظر نماند.",
          en: "Starts playback chunk by chunk instead of waiting for the entire text to finish processing.",
        },
        status: "stable",
      },
      {
        id: "playback-controls",
        name: { fa: "کنترل‌های پخش", en: "Playback controls" },
        description: {
          fa: "Play، Pause، Resume و Stop در جریان واقعی مرورگر پشتیبانی و تأیید شده‌اند.",
          en: "Play, Pause, Resume and Stop are supported and browser-accepted.",
        },
        status: "stable",
      },
      {
        id: "side-panel",
        name: { fa: "رابط Side Panel مرورگر", en: "Browser side-panel interface" },
        description: {
          fa: "نسخه پایدار با Manifest V3 از رابط Side Panel و ذخیره تنظیمات استفاده می‌کند.",
          en: "The stable Manifest V3 extension uses a browser side-panel interface with persisted settings.",
        },
        status: "stable",
      },
    ],
    privacyFacts: [
      {
        fa: "نسخه ۰.۶.۰ برای اجرای جریان صفحه فعال از activeTab، scripting، sidePanel و storage استفاده می‌کند.",
        en: "Version 0.6.0 uses activeTab, scripting, sidePanel and storage for its active-page workflow.",
      },
      {
        fa: "دسترسی عمومی HTTP/HTTPS به‌صورت optional host permission تعریف شده است و باید با اقدام کاربر اعطا شود.",
        en: "General HTTP/HTTPS access is declared as an optional host permission and requires user-granted access.",
      },
    ],
  },
};

export function getProductTruth(key: ProductKey) {
  return PRODUCT_TRUTH[key];
}

export function getLocalizedProductTruth(key: ProductKey, locale: Locale) {
  const product = PRODUCT_TRUTH[key];
  return {
    ...product,
    name: product.localizedName[locale],
    taglineText: product.tagline[locale],
    categoryText: product.category[locale],
    capabilitiesLocalized: product.capabilities.map((capability) => ({
      ...capability,
      nameText: capability.name[locale],
      descriptionText: capability.description[locale],
    })),
    privacyFactsLocalized: product.privacyFacts.map((item) => item[locale]),
  };
}
