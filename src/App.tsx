import { Icon } from "@iconify/react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Lang, languageMeta, languages, t } from "./i18n";
import { GuidePage, isGuideKey } from "./seo-guides";
import {
  FaqPage,
  GenericPage,
  getPageSeo,
  ProductDetailPage,
  ProfessionalFooter,
} from "./site-pages";

const LINKS = {
  farsioGithub: "https://github.com/FarsioIR",
  neveshtyarGithub: "https://github.com/FarsioIR/NeveshtYar",
  neveshtyarRelease:
    "https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2",
  avaGithub: "https://github.com/FarsioIR/AvaYar",
};

function useLang(): Lang {
  const { lang } = useParams();
  return languages.some((item) => item.code === lang) ? (lang as Lang) : "fa";
}

function localPath(lang: Lang, path = "") {
  return `/${lang}${path}`;
}

function upsertMeta(
  key: "name" | "property",
  value: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${key}="${value}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertAlternateLink(hreflang: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  );
  if (!element) {
    element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "compact" : ""}`}>
      <img src="/brand/farsio-logo.png" alt="Farsio · فارسیو" />
    </span>
  );
}

function Header() {
  const lang = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("farsio-theme") || "dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("farsio-theme", theme);
  }, [theme]);

  const switchLanguage = (next: Lang) => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length && languages.some((item) => item.code === parts[0])) parts.shift();
    const suffix = parts.length ? `/${parts.join("/")}` : "";
    navigate(`/${next}${suffix}${location.search}${location.hash}`);
    setMobileOpen(false);
  };

  const go = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <header className="site-header">
      <div className="shell header-shell">
        <button className="brand-button" type="button" onClick={() => go(localPath(lang))} aria-label="Farsio home">
          <Brand />
        </button>

        <nav className="desktop-nav" aria-label={lang === "fa" ? "ناوبری اصلی" : "Main navigation"}>
          <div
            className="products-nav"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="products-nav-trigger"
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
            >
              {t(lang, "navProducts")}
              <Icon icon="solar:alt-arrow-down-linear" />
            </button>

            <div
              className={`products-dropdown ${productsOpen ? "open" : ""}`}
              aria-hidden={!productsOpen}
            >
              <a
                href={localPath(lang, "/products/neveshtyar")}
                onClick={() => setProductsOpen(false)}
              >
                <span className="products-dropdown-logo">
                  <img src="/brand/products/neveshtyar-mark.png" alt="NeveshtYar" />
                </span>
                <span>
                  <strong>{lang === "fa" ? "نوشت‌یار" : "NeveshtYar"}</strong>
                  <small>{lang === "fa" ? "دستیار نوشتن فارسی" : "Persian writing assistant"}</small>
                </span>
              </a>

              <a
                href={localPath(lang, "/products/avayar")}
                onClick={() => setProductsOpen(false)}
              >
                <span className="products-dropdown-logo">
                  <img src="/brand/products/avayar-mark.png" alt="AvaYar" />
                </span>
                <span>
                  <strong>{lang === "fa" ? "آوایار" : "AvaYar"}</strong>
                  <small>{lang === "fa" ? "خواندن، خلاصه‌سازی و شنیدن" : "Reading, summary & listening"}</small>
                </span>
              </a>
            </div>
          </div>

          <a href={localPath(lang, "/features")}>{t(lang, "navFeatures")}</a>
          <button type="button" onClick={() => go(localPath(lang, "/docs"))}>{t(lang, "navDocs")}</button>
          <button type="button" onClick={() => go(localPath(lang, "/about"))}>{t(lang, "navAbout")}</button>
          <a className="github-nav-link" href={LINKS.farsioGithub} target="_blank" rel="noreferrer" aria-label="Farsio on GitHub" title="GitHub">
            <Icon icon="mdi:github" />
          </a>
        </nav>

        <div className="header-actions">
          <div className="language-toggle" aria-label={lang === "fa" ? "انتخاب زبان" : "Language selector"}>
            {languages.map((item) => (
              <button key={item.code} type="button" className={item.code === lang ? "active" : ""} onClick={() => switchLanguage(item.code)}>{item.short}</button>
            ))}
          </div>
          <button className="round-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={lang === "fa" ? "تغییر حالت روشن و تاریک" : "Toggle light and dark theme"}>
            <Icon icon={theme === "dark" ? "solar:sun-2-bold" : "solar:moon-stars-bold"} />
          </button>
          <a className="header-cta" href={localPath(lang, "/products")}>{t(lang, "navCta")}<Icon icon="solar:arrow-left-linear" /></a>
          <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-label={lang === "fa" ? "منوی سایت" : "Site menu"}>
            <Icon icon={mobileOpen ? "solar:close-circle-bold" : "solar:hamburger-menu-bold"} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <div className="shell mobile-menu-inner">
            <div className="mobile-products">
              <span>{t(lang, "navProducts")}</span>

              <a href={localPath(lang, "/products/neveshtyar")} onClick={() => setMobileOpen(false)}>
                <img src="/brand/products/neveshtyar-mark.png" alt="NeveshtYar" />
                <span>
                  <strong>{lang === "fa" ? "نوشت‌یار" : "NeveshtYar"}</strong>
                  <small>{lang === "fa" ? "دستیار نوشتن فارسی" : "Persian writing assistant"}</small>
                </span>
              </a>

              <a href={localPath(lang, "/products/avayar")} onClick={() => setMobileOpen(false)}>
                <img src="/brand/products/avayar-mark.png" alt="AvaYar" />
                <span>
                  <strong>{lang === "fa" ? "آوایار" : "AvaYar"}</strong>
                  <small>{lang === "fa" ? "خواندن و شنیدن فارسی" : "Persian reading & listening"}</small>
                </span>
              </a>

              <a href={localPath(lang, "/products")} onClick={() => setMobileOpen(false)}>
                {lang === "fa" ? "مشاهده همه محصولات" : "View all products"}
              </a>
            </div>

            <a href={localPath(lang, "/features")} onClick={() => setMobileOpen(false)}>{t(lang, "navFeatures")}</a>
            <button type="button" onClick={() => go(localPath(lang, "/docs"))}>{t(lang, "navDocs")}</button>
            <button type="button" onClick={() => go(localPath(lang, "/about"))}>{t(lang, "navAbout")}</button>
            <a className="github-nav-link mobile" href={LINKS.farsioGithub} target="_blank" rel="noreferrer" aria-label="Farsio on GitHub" title="GitHub"><Icon icon="mdi:github" /></a>
          </div>
        </div>
      )}
    </header>
  );
}

function WritingPanel() {
  return (
    <div className="demo-panel writing-panel">
      <div className="demo-panel-head">
        <span className="mini-brand"><img className="product-logo-mark" src="/brand/products/neveshtyar-mark.png" alt="NeveshtYar" /></span>
        <div>
          <strong>نوشت‌یار</strong>
          <small>بنویس، درست و روان</small>
        </div>
        <span className="panel-status">AI</span>
      </div>

      <div className="editor-line">
        فارسیو تجربه‌ی نوشتن فارسی را
        <mark> روان‌تر </mark>
        می‌کند.
      </div>

      <div className="suggestion-box">
        <span className="suggestion-label">پیشنهاد فارسیو</span>
        <div>
          <Icon icon="solar:magic-stick-3-bold" />
          دقیق‌تر، روان‌تر و طبیعی‌تر بنویسید.
        </div>
        <div className="suggestion-actions">
          <span>Tab</span>
          <button type="button">پذیرش</button>
        </div>
      </div>
    </div>
  );
}

function AvaPanel() {
  return (
    <div className="demo-panel ava-panel">
      <div className="demo-panel-head">
        <span className="ava-icon"><img className="product-logo-mark" src="/brand/products/avayar-mark.png" alt="AvaYar" /></span>
        <div>
          <strong>آوایار</strong>
          <small>بشنو، به فارسی</small>
        </div>
        <span className="panel-status gold">TTS</span>
      </div>

      <div className="waveform" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, index) => (
          <i
            key={index}
            style={{
              height: `${12 + ((index * 17) % 46)}px`,
            }}
          />
        ))}
      </div>

      <div className="audio-row">
        <button type="button" aria-label="Play">
          <Icon icon="solar:play-bold" />
        </button>
        <span>00:12 / 01:08</span>
        <div className="audio-progress">
          <i />
        </div>
        <Icon icon="solar:volume-loud-bold" />
      </div>
    </div>
  );
}

function Hero() {
  const lang = useLang();

  return (
    <section className="hero shell">
      <div className="hero-copy">
        <span className="hero-kicker">
          <Icon icon="solar:stars-minimalistic-bold" />
          {t(lang, "heroKicker")}
        </span>

        <h1>
          {t(lang, "heroTitleA")}
          <span>{t(lang, "heroTitleB")}</span>
        </h1>

        <p>{t(lang, "heroBody")}</p>

        <div className="hero-actions">
          <a className="button button-primary" href={localPath(lang, "/#products")}>
            {t(lang, "explore")}
            <Icon icon="solar:arrow-left-linear" />
          </a>

          <a
            className="button button-secondary"
            href={LINKS.farsioGithub}
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="mdi:github" />
            {t(lang, "githubCta")}
          </a>
        </div>

        <div className="hero-trust">
          <span>
            <Icon icon="solar:shield-check-bold" />
            {t(lang, "trustPrivacy")}
          </span>
          <i />
          <span>{t(lang, "trustOpen")}</span>
          <i />
          <span>{t(lang, "trustPersian")}</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="Farsio product preview">
        <div className="persian-orbit orbit-right">ف</div>
        <div className="persian-orbit orbit-left">ی</div>
        <div className="hero-halo halo-teal" />
        <div className="hero-halo halo-gold" />

        <div className="floating writing-float">
          <WritingPanel />
        </div>

        <div className="floating ava-float">
          <AvaPanel />
        </div>

        <div className="floating-mark">
          <img src="/brand/farsio-mark.png" alt="" />
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  lang,
  type,
}: {
  lang: Lang;
  type: "neveshtyar" | "ava";
}) {
  const isAva = type === "ava";

  return (
    <article className={`product-card ${isAva ? "product-ava" : "product-write"}`}>
      <div className="product-card-top">
        <span className="product-icon">
          <Icon icon={isAva ? "solar:soundwave-bold" : "solar:pen-new-square-bold"} />
        </span>

        <span className="product-state">
          {t(lang, isAva ? "stateDev" : "statePublic")}
        </span>
      </div>

      <div className="product-title-row">
        <div>
          <h3>{t(lang, isAva ? "ava" : "neveshtyar")}</h3>
          <strong>{t(lang, isAva ? "avaTag" : "neveshtyarTag")}</strong>
        </div>
      </div>

      <p>{t(lang, isAva ? "avaBody" : "neveshtyarBody")}</p>

      <div className="product-mini-preview">
        {isAva ? <AvaPanel /> : <WritingPanel />}
      </div>

      <div className="product-actions">
        <a href={localPath(lang, isAva ? "/products/avayar" : "/products/neveshtyar")}>
          {t(lang, "learnMore")}
          <Icon icon="solar:arrow-left-linear" />
        </a>

        <a
          href={isAva ? LINKS.avaGithub : LINKS.neveshtyarGithub}
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="mdi:github" />
          GitHub
        </a>
      </div>
    </article>
  );
}

function Products() {
  const lang = useLang();

  return (
    <section className="section shell" id="products">
      <div className="section-heading centered">
        <span>{t(lang, "productsEyebrow")}</span>
        <h2>{t(lang, "productsTitle")}</h2>
        <p>{t(lang, "productsBody")}</p>
      </div>

      <div className="product-grid">
        <ProductCard lang={lang} type="neveshtyar" />
        <ProductCard lang={lang} type="ava" />
      </div>
    </section>
  );
}

function Features() {
  const lang = useLang();

  const icons = [
    "solar:star-fall-bold",
    "solar:brain-bold",
    "solar:bolt-bold",
    "solar:code-square-bold",
    "solar:shield-check-bold",
  ];

  return (
    <section className="section shell" id="features">
      <div className="section-heading centered">
        <span>{t(lang, "featuresEyebrow")}</span>
        <h2>{t(lang, "featuresTitle")}</h2>
      </div>

      <div className="feature-strip">
        {[1, 2, 3, 4, 5].map((number, index) => (
          <article key={number}>
            <span className={index % 2 === 0 ? "teal-feature" : "gold-feature"}>
              <Icon icon={icons[index]} />
            </span>
            <h3>{t(lang, `feature${number}Title`)}</h3>
            <p>{t(lang, `feature${number}Body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({
  variant,
  title,
}: {
  variant: "voice" | "editor" | "review";
  title: string;
}) {
  return (
    <article className={`showcase-card ${variant}`}>
      <h3>{title}</h3>

      {variant === "voice" && (
        <div className="showcase-inner voice-preview">
          <div className="preview-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="showcase-wave">
            {Array.from({ length: 22 }).map((_, index) => (
              <i
                key={index}
                style={{ height: `${8 + ((index * 19) % 38)}px` }}
              />
            ))}
          </div>
          <div className="mini-player">
            <Icon icon="solar:play-bold" />
            <span>00:00 / 01:08</span>
          </div>
        </div>
      )}

      {variant === "editor" && (
        <div className="showcase-inner editor-preview">
          <div className="editor-toolbar">
            {Array.from({ length: 9 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
          <p>فارسیو تجربه‌ی نوشتن فارسی را متحول می‌کند.</p>
          <div className="smart-popover">
            <strong>پیشنهاد فارسیو</strong>
            <span>روان‌تر و دقیق‌تر بنویسید.</span>
            <button type="button">Tab</button>
          </div>
        </div>
      )}

      {variant === "review" && (
        <div className="showcase-inner review-preview">
          <strong>بررسی املا و نگارش</strong>
          {[
            ["اشتباه املایی", "اصلاح"],
            ["نشانه‌گذاری", "پیشنهاد"],
            ["خوانایی متن", "بهتر"],
          ].map(([label, state]) => (
            <div key={label}>
              <span>{label}</span>
              <small>{state}</small>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function Showcase() {
  const lang = useLang();

  return (
    <section className="section shell showcase-section">
      <div className="section-heading centered">
        <span>{t(lang, "showcaseEyebrow")}</span>
        <h2>{t(lang, "showcaseTitle")}</h2>
        <p>{t(lang, "showcaseBody")}</p>
      </div>

      <div className="showcase-grid">
        <ShowcaseCard variant="voice" title={t(lang, "showcaseVoice")} />
        <ShowcaseCard variant="editor" title={t(lang, "showcaseEditor")} />
        <ShowcaseCard variant="review" title={t(lang, "showcaseReview")} />
      </div>
    </section>
  );
}

function TrustBoard() {
  const lang = useLang();

  return (
    <section className="shell trust-board">
      <div>
        <strong>۲</strong>
        <span>{t(lang, "metricProducts")}</span>
      </div>
      <div>
        <strong>FA / EN</strong>
        <span>{t(lang, "metricLanguages")}</span>
      </div>
      <div>
        <strong>
          <Icon icon="mdi:github" />
        </strong>
        <span>{t(lang, "metricOpen")}</span>
      </div>
      <div>
        <strong>
          <Icon icon="solar:shield-check-bold" />
        </strong>
        <span>{t(lang, "metricPrivacy")}</span>
      </div>
    </section>
  );
}

function Faq() {
  const lang = useLang();

  return (
    <section className="section shell faq-section">
      <div className="section-heading centered">
        <span>FAQ</span>
        <h2>{t(lang, "faqTitle")}</h2>
      </div>

      <div className="faq-grid">
        {[1, 2, 3, 4].map((number) => (
          <details key={number}>
            <summary>
              {t(lang, `faq${number}Q`)}
              <Icon icon="solar:alt-arrow-down-linear" />
            </summary>
            <p>{t(lang, `faq${number}A`)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  const lang = useLang();

  return (
    <section className="shell final-cta">
      <div className="cta-art">ف</div>

      <div>
        <span>{t(lang, "ctaEyebrow")}</span>
        <h2>{t(lang, "ctaTitle")}</h2>
        <p>{t(lang, "ctaBody")}</p>
      </div>

      <div className="cta-actions">
        <a className="button button-primary" href={localPath(lang, "/#products")}>
          {t(lang, "explore")}
          <Icon icon="solar:arrow-left-linear" />
        </a>

        <a
          className="button button-secondary"
          href={LINKS.farsioGithub}
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="mdi:github" />
          GitHub
        </a>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Features />
      <Showcase />
      <TrustBoard />
      <Faq />
      <FinalCta />
    </>
  );
}

function ProductPage({ type }: { type: "neveshtyar" | "ava" }) {
  const lang = useLang();
  return <ProductDetailPage lang={lang} type={type} preview={type === "ava" ? <AvaPanel /> : <WritingPanel />} />;
}

function SeoGuide() {
  const lang = useLang();
  const { guideKey = "" } = useParams();

  if (!isGuideKey(guideKey)) {
    return <Navigate to={`/${lang}/docs`} replace />;
  }

  return <GuidePage lang={lang} guideKey={guideKey} />;
}

function Docs() {
  const lang = useLang();
  return <GenericPage lang={lang} pageKey="docs" />;
}

function About() {
  const lang = useLang();
  return <GenericPage lang={lang} pageKey="about" />;
}

function Footer() {
  const lang = useLang();
  return <ProfessionalFooter lang={lang} brand={<Brand />} />;
}

function LocalizedLayout() {
  const lang = useLang();
  const location = useLocation();

  useEffect(() => {
    const meta = languageMeta(lang);
    const routeKey = location.pathname.replace(/^\/(fa|en)/, "").replace(/^\/+|\/+$/g, "");
    const seo = getPageSeo(lang, routeKey);

    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:locale", seo.locale);
    upsertMeta("property", "og:locale:alternate", seo.alternateLocale);
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertLink("canonical", seo.canonical);
    upsertAlternateLink("fa", seo.faHref);
    upsertAlternateLink("en", seo.enHref);
    upsertAlternateLink("x-default", seo.xDefaultHref);
  }, [lang, location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="products" element={<GenericPage lang={lang} pageKey="products" />} />
        <Route path="products/neveshtyar" element={<ProductPage type="neveshtyar" />} />
        <Route path="products/avayar" element={<ProductPage type="ava" />} />
        <Route path="products/ava" element={<Navigate to={`/${lang}/products/avayar`} replace />} />
        <Route path="features" element={<GenericPage lang={lang} pageKey="features" />} />
        <Route path="docs" element={<Docs />} />
        <Route path="guides/:guideKey" element={<SeoGuide />} />
        <Route path="faq" element={<FaqPage lang={lang} />} />
        <Route path="releases" element={<GenericPage lang={lang} pageKey="releases" />} />
        <Route path="community" element={<GenericPage lang={lang} pageKey="community" />} />
        <Route path="report-issue" element={<GenericPage lang={lang} pageKey="report-issue" />} />
        <Route path="contribute" element={<GenericPage lang={lang} pageKey="contribute" />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<GenericPage lang={lang} pageKey="contact" />} />
        <Route path="privacy" element={<GenericPage lang={lang} pageKey="privacy" />} />
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fa" replace />} />
      <Route path="/:lang/*" element={<LocalizedLayout />} />
    </Routes>
  );
}
