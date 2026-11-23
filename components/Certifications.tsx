import { certificates } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { ArrowIcon } from "./Icons";
import { BiodyvinMark, EcocertMark, EuLeaf } from "./Logo";

export default function Certifications({ locale }: { locale: string }) {
  const { ecocert } = certificates;
  const c = getDict(locale).cert;
  return (
    <section className="cert half" id="certified" data-tone="dark">
      <div className="cert__media">
        <video className="cert__video" autoPlay muted loop playsInline preload="metadata" poster="/media/earth-poster.jpg">
          <source src="/media/earth.mp4" type="video/mp4" />
        </video>
        <div className="cert__shade" />
        <div className="grain" />
      </div>

      <div className="cert__inner">
        <div className="cert__head" data-reveal>
          <p className="eyebrow eyebrow--light">{c.eyebrow}</p>
          <p className="cert__lead">
            {c.lead[0]}
            <em>{c.lead[1]}</em>
          </p>
          <a href={`/${locale}/certifications`} className="link link--light cert__more">
            {c.more}
            <ArrowIcon className="link__arrow" />
          </a>
        </div>

        <div className="cert__cards">
          <article className="badge-card badge-card--eco" data-reveal>
            <div className="badge-card__logo">
              <EcocertMark className="eco-mark" />
              <EuLeaf className="eu-mark" code={ecocert.code} />
            </div>
            <div className="badge-card__body">
              <p className="badge-card__kicker">{c.organic} · {c.since}</p>
              <p className="badge-card__big">{ecocert.code}</p>
              <p className="badge-card__text">{c.ecoText}</p>
              <a className="badge-card__link" href={ecocert.link} target="_blank" rel="noreferrer">
                {c.ecoLink}
                <ArrowIcon className="link__arrow" />
              </a>
            </div>
          </article>

          <article className="badge-card badge-card--bdv" data-reveal style={{ transitionDelay: "0.15s" }}>
            <div className="badge-card__logo">
              <BiodyvinMark className="bdv-mark" />
            </div>
            <div className="badge-card__body">
              <p className="badge-card__kicker">{c.bdvKicker}</p>
              <p className="badge-card__big">{c.bdvStage}</p>
              <p className="badge-card__text">{c.bdvText}</p>
              <a className="badge-card__link" href={`/${locale}/certifications`}>
                {c.bdvLink}
                <ArrowIcon className="link__arrow" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
