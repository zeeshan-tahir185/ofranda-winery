import { ArrowIcon } from "./Icons";
import { Leaf } from "./LineArt";

export default function Certifications() {
  return (
    <section className="cert" id="certified" data-tone="dark">
      <div className="cert__media">
        <video className="cert__video" autoPlay muted loop playsInline preload="metadata" poster="/media/earth-poster.jpg">
          <source src="/media/earth.mp4" type="video/mp4" />
        </video>
        <div className="cert__shade" />
        <div className="grain" />
      </div>

      <div className="cert__inner">
        <div className="cert__head" data-reveal>
          <p className="eyebrow eyebrow--light">Our certifications</p>
          <p className="cert__lead">
            Grown without compromise, <em>certified with care.</em>
          </p>
        </div>

        <div className="cert__cards">
          <article className="cert-card" data-reveal>
            <Leaf className="cert-card__leaf" />
            <p className="cert-card__kicker">Organic</p>
            <h3 className="cert-card__title">
              Certified Organic <em>by ECOCERT</em>
            </h3>
            <p className="cert-card__label">Certification code</p>
            <p className="cert-card__code">MD-BIO-154</p>
            <p className="cert-card__note">
              <em>ECOCERT certification since 2024</em>
            </p>
            <div className="cert-card__badges">
              <span className="badge-eco">
                ECO
                <br />
                CERT
              </span>
              <span className="badge-sep" />
              <span className="badge-eu" aria-label="EU organic">
                <svg viewBox="0 0 60 40" aria-hidden="true">
                  <rect width="60" height="40" rx="2" fill="currentColor" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i / 12) * Math.PI * 2;
                    return <circle key={i} cx={30 + Math.cos(a) * 11} cy={20 + Math.sin(a) * 11} r="1.3" fill="#f3ede3" />;
                  })}
                </svg>
              </span>
            </div>
          </article>

          <article className="cert-card" data-reveal style={{ transitionDelay: "0.15s" }}>
            <Leaf className="cert-card__leaf cert-card__leaf--flip" />
            <p className="cert-card__kicker">Biodynamic</p>
            <h3 className="cert-card__title cert-card__title--caps">
              Biodynamic, the third stage <em>of certification</em>
            </h3>
            <div className="ring" aria-label="Stage 3 of 4">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" className="ring__track" />
                <circle cx="60" cy="60" r="52" className="ring__value" pathLength="100" />
              </svg>
              <span className="ring__num">
                3<small>/4</small>
              </span>
            </div>
            <p className="cert-card__note">
              <em>
                Ofranda is currently in the third stage of biodynamic certification. The certification has not yet
                been granted.
              </em>
            </p>
            <p className="cert-card__label">Stage 3 of 4, in progress</p>
          </article>
        </div>

        <a href="#certified" className="link link--light" data-reveal>
          Discover more about our certifications
          <ArrowIcon className="link__arrow" />
        </a>
      </div>
    </section>
  );
}
