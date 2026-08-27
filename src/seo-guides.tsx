import { Icon } from "@iconify/react";
import type { Lang } from "./i18n";

type GuideKey =
  | "finglish-to-persian"
  | "persian-keyboard-layout"
  | "persian-ai-writing"
  | "persian-text-to-speech"
  | "web-reading-summarization";

type GuideSection = {
  title: string;
  body: string;
};

type GuideData = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: GuideSection[];
  relatedProduct: "neveshtyar" | "ava";
};

const tr = (lang: Lang, fa: string, en: string) =>
  lang === "fa" ? fa : en;

export const GUIDE_KEYS: GuideKey[] = [
  "finglish-to-persian",
  "persian-keyboard-layout",
  "persian-ai-writing",
  "persian-text-to-speech",
  "web-reading-summarization",
];

export function isGuideKey(value: string): value is GuideKey {
  return GUIDE_KEYS.includes(value as GuideKey);
}

export function guideData(lang: Lang, key: GuideKey): GuideData {
  const data: Record<GuideKey, GuideData> = {
    "finglish-to-persian": {
      eyebrow: tr(lang, "راهنمای نوشتن فارسی", "Persian writing guide"),
      title: tr(
        lang,
        "تبدیل فینگلیش به فارسی؛ روش‌ها، خطاها و انتخاب ابزار مناسب",
        "Finglish to Persian: methods, common errors and practical workflows"
      ),
      lead: tr(
        lang,
        "فینگلیش زمانی شکل می‌گیرد که واژه‌های فارسی با حروف لاتین نوشته شوند. این راهنما توضیح می‌دهد تبدیل فینگلیش به فارسی چه چالش‌هایی دارد و چگونه می‌توان خروجی دقیق‌تری به دست آورد.",
        "Finglish represents Persian words with Latin characters. This guide explains the challenges of converting Finglish to Persian and how to build a more reliable workflow."
      ),
      relatedProduct: "neveshtyar",
      sections: [
        {
          title: tr(lang, "فینگلیش چیست؟", "What is Finglish?"),
          body: tr(
            lang,
            "فینگلیش استاندارد املایی واحدی ندارد. یک واژه فارسی ممکن است توسط افراد مختلف با چند شکل لاتین نوشته شود؛ بنابراین تبدیل درست فقط جایگزینی ساده حروف نیست.",
            "Finglish has no single spelling standard. The same Persian word can appear in several Latin forms, so reliable conversion requires more than character substitution."
          ),
        },
        {
          title: tr(lang, "چرا تبدیل فینگلیش دشوار است؟", "Why is conversion difficult?"),
          body: tr(
            lang,
            "ابهام آوایی، حذف واکه‌ها، نام‌ها، اصطلاحات تخصصی و ترکیب واژه‌های فارسی و انگلیسی باعث می‌شوند یک ورودی چند تفسیر ممکن داشته باشد.",
            "Phonetic ambiguity, omitted vowels, names, specialist terminology and mixed Persian-English text can give one input several plausible interpretations."
          ),
        },
        {
          title: tr(lang, "روش بهتر تبدیل", "A better conversion workflow"),
          body: tr(
            lang,
            "بهترین جریان کار، تبدیل اولیه را با بررسی انسانی ترکیب می‌کند. متن نهایی باید از نظر معنی، نیم‌فاصله، علائم نگارشی و نام‌های خاص بازبینی شود.",
            "A strong workflow combines initial conversion with human review. Meaning, Persian spacing, punctuation and proper names should be checked before final use."
          ),
        },
        {
          title: tr(lang, "ابزار مناسب چه ویژگی‌هایی دارد؟", "What makes a useful tool?"),
          body: tr(
            lang,
            "ابزار مناسب باید با جریان واقعی تایپ سازگار باشد، متن فارسی و انگلیسی ترکیبی را مدیریت کند و تصمیم نهایی را به کاربر واگذار کند.",
            "A useful tool should fit real typing workflows, handle mixed Persian-English content and leave the final decision with the writer."
          ),
        },
      ],
    },

    "persian-keyboard-layout": {
      eyebrow: tr(lang, "راهنمای صفحه‌کلید فارسی", "Persian keyboard guide"),
      title: tr(
        lang,
        "بازیابی متن تایپ‌شده با کیبورد اشتباه فارسی و انگلیسی",
        "Recover text typed with the wrong Persian or English keyboard layout"
      ),
      lead: tr(
        lang,
        "یکی از خطاهای رایج تایپ دو‌زبانه زمانی رخ می‌دهد که زبان صفحه‌کلید با زبان موردنظر هماهنگ نیست. در بسیاری از موارد می‌توان متن را بدون تایپ دوباره بازیابی کرد.",
        "A common bilingual typing error happens when the active keyboard layout does not match the intended language. In many cases the text can be recovered without retyping it."
      ),
      relatedProduct: "neveshtyar",
      sections: [
        {
          title: tr(lang, "خطای چیدمان چیست؟", "What is a layout mismatch?"),
          body: tr(
            lang,
            "کلید فیزیکی درست فشرده می‌شود اما سیستم کاراکتر متناظر در چیدمان فعال را ثبت می‌کند؛ در نتیجه رشته‌ای ظاهراً نامفهوم ایجاد می‌شود.",
            "The intended physical keys are pressed, but the operating system records characters from the active layout, producing apparently meaningless text."
          ),
        },
        {
          title: tr(lang, "چرا متن قابل بازیابی است؟", "Why can the text be recovered?"),
          body: tr(
            lang,
            "چون موقعیت کلیدها مشخص است، در بسیاری از موارد می‌توان هر کاراکتر را به کلید متناظر در چیدمان دیگر نگاشت کرد.",
            "Because key positions are known, many strings can be reconstructed by mapping each character back to the corresponding key in the other layout."
          ),
        },
        {
          title: tr(lang, "چه مواردی نیاز به بازبینی دارند؟", "What still needs review?"),
          body: tr(
            lang,
            "متن‌های ترکیبی، علائم، اعداد، کلیدهای ویژه و بخش‌هایی که عمداً انگلیسی نوشته شده‌اند ممکن است به بررسی دستی نیاز داشته باشند.",
            "Mixed-language text, punctuation, numbers, special keys and intentionally English segments may still require manual review."
          ),
        },
      ],
    },

    "persian-ai-writing": {
      eyebrow: tr(lang, "راهنمای نگارش فارسی", "Persian writing guide"),
      title: tr(
        lang,
        "هوش مصنوعی برای نوشتن فارسی؛ کاربرد درست، محدودیت‌ها و بازبینی",
        "AI for Persian writing: practical use, limitations and review"
      ),
      lead: tr(
        lang,
        "ابزارهای هوشمند می‌توانند در اصلاح و بازنویسی متن فارسی کمک کنند، اما کیفیت نهایی به زمینه، لحن، واژگان تخصصی و بازبینی نویسنده وابسته است.",
        "AI-assisted tools can help revise Persian text, but final quality still depends on context, tone, specialist vocabulary and writer review."
      ),
      relatedProduct: "neveshtyar",
      sections: [
        {
          title: tr(lang, "هوش مصنوعی کجا مفید است؟", "Where can AI help?"),
          body: tr(
            lang,
            "شناسایی خطاهای رایج، پیشنهاد بازنویسی، ساده‌سازی جمله و بررسی اولیه خوانایی از کاربردهای مناسب ابزارهای هوشمند هستند.",
            "Finding common errors, suggesting rewrites, simplifying sentences and performing an initial readability review are practical uses."
          ),
        },
        {
          title: tr(lang, "چرا بازبینی انسانی ضروری است؟", "Why is human review essential?"),
          body: tr(
            lang,
            "پیشنهاد خودکار ممکن است معنی، لحن یا اصطلاح تخصصی را تغییر دهد. نویسنده باید قبل از انتشار هر تغییر را در متن واقعی بررسی کند.",
            "Automated suggestions can alter meaning, tone or specialist terminology. Writers should review changes in context before publishing."
          ),
        },
        {
          title: tr(lang, "متن فارسی چه نیازهای خاصی دارد؟", "What is specific to Persian?"),
          body: tr(
            lang,
            "نیم‌فاصله، راست‌به‌چپ بودن، ترکیب فارسی و لاتین، اعداد و نشانه‌گذاری از جزئیاتی هستند که ابزار نگارش فارسی باید جدی بگیرد.",
            "Persian spacing, right-to-left behavior, mixed Latin text, numbers and punctuation are details a Persian writing tool must handle carefully."
          ),
        },
      ],
    },

    "persian-text-to-speech": {
      eyebrow: tr(lang, "راهنمای شنیدن فارسی", "Persian listening guide"),
      title: tr(
        lang,
        "تبدیل متن فارسی به گفتار؛ از آماده‌سازی متن تا صدای قابل‌فهم",
        "Persian text to speech: from text preparation to intelligible audio"
      ),
      lead: tr(
        lang,
        "کیفیت تبدیل متن فارسی به گفتار فقط به مدل صوتی وابسته نیست؛ ساختار متن، علائم نگارشی، اعداد، نام‌ها و زبان‌های ترکیبی نیز بر نتیجه اثر می‌گذارند.",
        "Persian text-to-speech quality depends on more than the voice model. Text structure, punctuation, numbers, names and mixed-language content all affect the result."
      ),
      relatedProduct: "ava",
      sections: [
        {
          title: tr(lang, "TTS چگونه کار می‌کند؟", "How does TTS work?"),
          body: tr(
            lang,
            "سامانه تبدیل متن به گفتار، متن را تحلیل و آن را به خروجی صوتی تبدیل می‌کند. کیفیت تلفظ و آهنگ جمله به نحوه تفسیر متن وابسته است.",
            "A text-to-speech system analyzes written content and produces audio. Pronunciation and prosody depend on how the text is interpreted."
          ),
        },
        {
          title: tr(lang, "آماده‌سازی متن فارسی", "Preparing Persian text"),
          body: tr(
            lang,
            "جمله‌بندی روشن، نشانه‌گذاری درست و بررسی اعداد و نام‌های خاص می‌تواند خوانش صوتی را قابل‌فهم‌تر کند.",
            "Clear sentences, useful punctuation and reviewing numbers and proper names can improve intelligibility."
          ),
        },
        {
          title: tr(lang, "کاربردهای تبدیل متن به گفتار", "Text-to-speech use cases"),
          body: tr(
            lang,
            "شنیدن مقاله، مرور محتوای طولانی و ایجاد یک مسیر مکمل برای دریافت اطلاعات از کاربردهای مهم TTS هستند.",
            "Listening to articles, reviewing long content and providing an alternative way to consume information are important TTS use cases."
          ),
        },
      ],
    },

    "web-reading-summarization": {
      eyebrow: tr(lang, "راهنمای مطالعه وب", "Web reading guide"),
      title: tr(
        lang,
        "خلاصه‌سازی صفحات وب؛ چگونه سریع‌تر به نکات اصلی برسیم؟",
        "Web page summarization: how to reach the main ideas faster"
      ),
      lead: tr(
        lang,
        "خلاصه‌سازی می‌تواند زمان مرور محتوای طولانی را کاهش دهد، اما خلاصه خوب باید ساختار و ادعاهای اصلی منبع را حفظ کند و جای بررسی منبع را نگیرد.",
        "Summarization can reduce the time needed to review long pages, but a useful summary should preserve the source's main structure and claims rather than replace source review."
      ),
      relatedProduct: "ava",
      sections: [
        {
          title: tr(lang, "اول محتوای اصلی را پیدا کنید", "Start with the main content"),
          body: tr(
            lang,
            "منوها، تبلیغات و عناصر جانبی صفحه نباید وزن یکسانی با مقاله یا محتوای اصلی داشته باشند. استخراج درست محتوا اولین مرحله است.",
            "Navigation, ads and peripheral page elements should not carry the same weight as the main article. Reliable content extraction comes first."
          ),
        },
        {
          title: tr(lang, "خلاصه خوب چه چیزی را حفظ می‌کند؟", "What should a good summary preserve?"),
          body: tr(
            lang,
            "موضوع اصلی، استدلال‌ها، محدودیت‌ها و نکات کلیدی باید باقی بمانند؛ حذف زمینه می‌تواند معنی متن را تغییر دهد.",
            "The main topic, arguments, limitations and key points should remain. Removing too much context can change the meaning."
          ),
        },
        {
          title: tr(lang, "چه زمانی باید متن اصلی را خواند؟", "When should you read the source?"),
          body: tr(
            lang,
            "برای تصمیم‌های مهم، نقل دقیق، جزئیات فنی یا بررسی ادعاها باید به محتوای اصلی مراجعه کرد. خلاصه نقطه شروع است، نه همیشه نقطه پایان.",
            "For important decisions, exact quotations, technical details or claim verification, return to the original content. A summary is a starting point, not always the endpoint."
          ),
        },
      ],
    },
  };

  return data[key];
}

export function GuidePage({
  lang,
  guideKey,
}: {
  lang: Lang;
  guideKey: GuideKey;
}) {
  const guide = guideData(lang, guideKey);

  const productPath =
    guide.relatedProduct === "neveshtyar"
      ? `/${lang}/products/neveshtyar`
      : `/${lang}/products/ava`;

  const productName =
    guide.relatedProduct === "neveshtyar"
      ? "NeveshtYar · نوشت‌یار"
      : "AvaYar · آوایار";

  return (
    <main className="shell inner-page pro-page">
      <nav className="pro-breadcrumb" aria-label="Breadcrumb">
        <a href={`/${lang}`}>{tr(lang, "خانه", "Home")}</a>
        <Icon icon="solar:alt-arrow-left-linear" />
        <a href={`/${lang}/docs`}>{tr(lang, "راهنما", "Guide")}</a>
        <Icon icon="solar:alt-arrow-left-linear" />
        <span aria-current="page">{guide.title}</span>
      </nav>

      <section className="pro-hero">
        <span className="hero-kicker">
          <Icon icon="solar:book-2-bold" />
          {guide.eyebrow}
        </span>
        <h1>{guide.title}</h1>
        <p>{guide.lead}</p>
      </section>

      <article className="pro-section-stack">
        {guide.sections.map((section, index) => (
          <section className="pro-content-section" key={section.title}>
            <div className="pro-content-index">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="pro-content-main">
              <span className="pro-card-icon">
                <Icon icon="solar:document-text-bold" />
              </span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </section>
        ))}
      </article>

      <section className="pro-section">
        <div className="pro-panel pro-copy-panel">
          <h2>
            {tr(
              lang,
              "ابزار مرتبط در فارسیو",
              "Related Farsio product"
            )}
          </h2>
          <p>
            {tr(
              lang,
              "برای دیدن قابلیت‌ها، وضعیت انتشار و جزئیات محصول مرتبط، صفحه رسمی محصول را ببینید.",
              "See the official product page for capabilities, release status and product details."
            )}
          </p>
          <div className="pro-link-row">
            <a className="button button-secondary" href={productPath}>
              {productName}
              <Icon icon="solar:arrow-left-linear" />
            </a>
            <a className="button button-secondary" href={`/${lang}/docs`}>
              {tr(lang, "راهنمای فارسیو", "Farsio guide")}
              <Icon icon="solar:arrow-left-linear" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
