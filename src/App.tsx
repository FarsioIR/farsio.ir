import { Icon } from "@iconify/react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Lang, languageMeta, languages, t } from "./i18n";

const LINKS = {
  farsioGithub: "https://github.com/FarsioIR",
  neveshtyarGithub: "https://github.com/AmirMotefaker/Farsi-Smart-Assistant",
  neveshtyarRelease:
    "https://github.com/AmirMotefaker/Farsi-Smart-Assistant/releases/tag/v4.9.1",
  avaGithub: "https://github.com/AmirMotefaker/farsismart-listen",
};

function useLang(): Lang {
  const { lang } = useParams();
  return languages.some((item) => item.code === lang) ? (lang as Lang) : "fa";
}

function localPath(lang: Lang, path = "") {
  return `/${lang}${path}`;
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

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("farsio-theme") || "dark";
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("farsio-theme", theme);
  }, [theme]);

  const switchLanguage = (next: Lang) => {
    const parts = location.pathname.split("/").filter(Boolean);

    if (parts.length && languages.some((item) => item.code === parts[0])) {
      parts.shift();
    }

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
        <button
          className="brand-button"
          type="button"
          onClick={() => go(localPath(lang))}
          aria-label="Farsio home"
        >
          <Brand />
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href={localPath(lang, "/#products")}>{t(lang, "navProducts")}</a>
          <a href={localPath(lang, "/#features")}>{t(lang, "navFeatures")}</a>
          <button type="button" onClick={() => go(localPath(lang, "/docs"))}>
            {t(lang, "navDocs")}
          </button>
          <button type="button" onClick={() => go(localPath(lang, "/about"))}>
            {t(lang, "navAbout")}
          </button>
          <a href={LINKS.farsioGithub} target="_blank" rel="noreferrer">
            <Icon icon="mdi:github" />
            GitHub
          </a>
        </nav>

        <div className="header-actions">
          <div className="language-toggle" aria-label="Language">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                className={item.code === lang ? "active" : ""}
                onClick={() => switchLanguage(item.code)}
              >
                {item.short}
              </button>
            ))}
          </div>

          <button
            className="round-button"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Icon
              icon={
                theme === "dark"
                  ? "solar:sun-2-bold"
                  : "solar:moon-stars-bold"
              }
            />
          </button>

          <a
            className="header-cta"
            href={localPath(lang, "/#products")}
          >
            {t(lang, "navCta")}
            <Icon icon="solar:arrow-left-linear" />
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Menu"
          >
            <Icon icon={mobileOpen ? "solar:close-circle-bold" : "solar:hamburger-menu-bold"} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <div className="shell mobile-menu-inner">
            <a href={localPath(lang, "/#products")} onClick={() => setMobileOpen(false)}>
              {t(lang, "navProducts")}
            </a>
            <a href={localPath(lang, "/#features")} onClick={() => setMobileOpen(false)}>
              {t(lang, "navFeatures")}
            </a>
            <button type="button" onClick={() => go(localPath(lang, "/docs"))}>
              {t(lang, "navDocs")}
            </button>
            <button type="button" onClick={() => go(localPath(lang, "/about"))}>
              {t(lang, "navAbout")}
            </button>
            <a href={LINKS.farsioGithub} target="_blank" rel="noreferrer">
              GitHub
            </a>
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
        <span className="mini-brand">
          <img src="/brand/farsio-mark.png" alt="" />
        </span>
        <div>
          <strong>نوشت‌یار</strong>
          <small>دستیار هوشمند فارسی</small>
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
        <span className="ava-icon">
          <Icon icon="solar:soundwave-bold" />
        </span>
        <div>
          <strong>آوا</strong>
          <small>خواندن و شنیدن فارسی</small>
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
        <a href={localPath(lang, isAva ? "/products/ava" : "/products/neveshtyar")}>
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
  const isAva = type === "ava";

  return (
    <main className="shell inner-page product-page">
      <div className="inner-hero">
        <span className="product-icon large">
          <Icon icon={isAva ? "solar:soundwave-bold" : "solar:pen-new-square-bold"} />
        </span>

        <span className="product-state">
          {t(lang, isAva ? "stateDev" : "statePublic")}
        </span>

        <h1>{t(lang, isAva ? "ava" : "neveshtyar")}</h1>
        <h2>{t(lang, isAva ? "avaTag" : "neveshtyarTag")}</h2>
        <p>{t(lang, isAva ? "avaBody" : "neveshtyarBody")}</p>

        <div className="hero-actions">
          {!isAva && (
            <a
              className="button button-primary"
              href={LINKS.neveshtyarRelease}
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="solar:download-bold" />
              v4.9.1
            </a>
          )}

          <a
            className="button button-secondary"
            href={isAva ? LINKS.avaGithub : LINKS.neveshtyarGithub}
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="mdi:github" />
            GitHub
          </a>
        </div>
      </div>

      <div className="product-page-demo">
        {isAva ? <AvaPanel /> : <WritingPanel />}
      </div>
    </main>
  );
}

function Docs() {
  const lang = useLang();

  const items = useMemo(
    () =>
      [
        ["docsStart", "docsStartBody", "solar:home-2-bold"],
        ["docsInstall", "docsInstallBody", "solar:download-bold"],
        ["docsAva", "docsAvaBody", "solar:soundwave-bold"],
        ["docsPrivacy", "docsPrivacyBody", "solar:shield-check-bold"],
        ["docsFaq", "docsFaqBody", "solar:question-circle-bold"],
      ] as const,
    [],
  );

  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <main className="shell docs-layout">
      <aside>
        <div className="docs-brand">
          <img src="/brand/farsio-mark.png" alt="" />
          <div>
            <strong>Farsio Docs</strong>
            <span>FA / EN</span>
          </div>
        </div>

        {items.map((item, index) => (
          <button
            key={item[0]}
            type="button"
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
          >
            <Icon icon={item[2]} />
            {t(lang, item[0])}
          </button>
        ))}
      </aside>

      <article className="docs-content">
        <span className="hero-kicker">
          <Icon icon="solar:book-2-bold" />
          Documentation
        </span>

        <h1>{t(lang, current[0])}</h1>
        <p>{t(lang, current[1])}</p>

        {active === 1 && (
          <div className="docs-callout">
            <Icon icon="solar:verified-check-bold" />
            <div>
              <strong>Farsi Smart Assistant v4.9.1</strong>
              <a
                href={LINKS.neveshtyarRelease}
                target="_blank"
                rel="noreferrer"
              >
                GitHub Release
              </a>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}

function About() {
  const lang = useLang();

  return (
    <main className="shell inner-page about-page">
      <span className="hero-kicker">
        <Icon icon="solar:stars-minimalistic-bold" />
        Farsio · فارسیو
      </span>

      <h1>{t(lang, "aboutTitle")}</h1>
      <p>{t(lang, "aboutBody")}</p>

      <div className="about-products">
        <article>
          <Icon icon="solar:pen-new-square-bold" />
          <strong>{t(lang, "neveshtyar")}</strong>
          <span>{t(lang, "neveshtyarTag")}</span>
        </article>

        <article>
          <Icon icon="solar:soundwave-bold" />
          <strong>{t(lang, "ava")}</strong>
          <span>{t(lang, "avaTag")}</span>
        </article>
      </div>
    </main>
  );
}

function Footer() {
  const lang = useLang();

  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Brand />
          <p>{t(lang, "footerBrandBody")}</p>

          <div className="footer-social">
            <a href={LINKS.farsioGithub} target="_blank" rel="noreferrer">
              <Icon icon="mdi:github" />
            </a>
            <a href="mailto:hello@farsio.ir">
              <Icon icon="solar:letter-bold" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <strong>{t(lang, "footerProducts")}</strong>
          <a href={localPath(lang, "/products/neveshtyar")}>
            {t(lang, "neveshtyar")}
          </a>
          <a href={localPath(lang, "/products/ava")}>{t(lang, "ava")}</a>
          <a href={localPath(lang, "/#products")}>{t(lang, "footerAllProducts")}</a>
        </div>

        <div className="footer-column">
          <strong>{t(lang, "footerResources")}</strong>
          <a href={localPath(lang, "/docs")}>{t(lang, "navDocs")}</a>
          <a href={localPath(lang, "/#faq")}>FAQ</a>
          <a href={LINKS.neveshtyarRelease} target="_blank" rel="noreferrer">
            Release Notes
          </a>
        </div>

        <div className="footer-column">
          <strong>{t(lang, "footerCommunity")}</strong>
          <a href={LINKS.farsioGithub} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={LINKS.neveshtyarGithub} target="_blank" rel="noreferrer">
            {t(lang, "footerReport")}
          </a>
          <a href={LINKS.avaGithub} target="_blank" rel="noreferrer">
            {t(lang, "footerContribute")}
          </a>
        </div>

        <div className="footer-column">
          <strong>{t(lang, "footerCompany")}</strong>
          <a href={localPath(lang, "/about")}>{t(lang, "navAbout")}</a>
          <a href="mailto:hello@farsio.ir">{t(lang, "footerContact")}</a>
          <a href={localPath(lang, "/docs")}>{t(lang, "footerPrivacy")}</a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© 2026 Farsio.ir</span>
        <span>{t(lang, "footerRights")}</span>
        <span>فارسی / EN</span>
      </div>
    </footer>
  );
}

function LocalizedLayout() {
  const lang = useLang();

  useEffect(() => {
    const meta = languageMeta(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    document.title =
      lang === "fa"
        ? "فارسیو | ابزارهای هوشمند برای فارسی"
        : "Farsio | Persian-first intelligent tools";
  }, [lang]);

  return (
    <>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="products/neveshtyar"
          element={<ProductPage type="neveshtyar" />}
        />
        <Route path="products/ava" element={<ProductPage type="ava" />} />
        <Route path="docs" element={<Docs />} />
        <Route path="about" element={<About />} />
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
