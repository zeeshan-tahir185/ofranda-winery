import { certificates } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export default function Hero({ locale }: { locale: string }) {
  const t = getDict(locale);
  const h = t.hero;
  return (
    <section className="hero" id="top" data-tone="dark">
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__shade" />
        <div className="grain" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow intro" style={{ ["--d" as string]: "0.2s" }}>
          {h.eyebrow[0]} <span>·</span> {h.eyebrow[1]}
        </p>
        <h1 className="hero__title">
          <span className="intro-line">
            <span style={{ ["--d" as string]: "0.35s" }}>{h.line1}</span>
          </span>
          <span className="intro-line">
            <span style={{ ["--d" as string]: "0.5s" }}>
              <em>{h.line2[0]}</em>
              {h.line2[1]}
            </span>
          </span>
        </h1>
        <p className="hero__sub intro" style={{ ["--d" as string]: "0.9s" }}>
          {h.sub} &nbsp;·&nbsp; {certificates.ecocert.code}
        </p>
      </div>

      <div className="hero__foot intro" style={{ ["--d" as string]: "1.2s" }}>
        <span className="hero__since">{h.since}</span>
        <a href="#philosophy" className="scroll-cue" aria-label={t.ui.scrollDown}>
          <span>{t.ui.discover}</span>
          <i />
        </a>
        <span className="hero__coords">{h.coords.replace(" · ", "\u00a0\u00a0·\u00a0\u00a0")}</span>
      </div>
    </section>
  );
}
