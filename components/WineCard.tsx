import Image from "next/image";
import type { Wine } from "@/lib/content";
import { formatAlcohol, formatLitres, formatNumber, getDict } from "@/lib/i18n";
import { EcocertMark } from "./Logo";
import { ArrowIcon } from "./Icons";

export default function WineCard({ wine, locale, delay = 0, reveal = false }: { wine: Wine; locale: string; delay?: number; reveal?: boolean }) {
  const t = getDict(locale).wine;
  const text = getDict(locale).wineText[wine.slug as keyof ReturnType<typeof getDict>["wineText"]];
  return (
    <a
      href={wine.soon ? undefined : `/${locale}/wines/${wine.slug}`}
      className={`wine-card ${wine.soon ? "wine-card--soon" : ""}`}
      data-reveal={reveal || undefined}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      <div className="wine-card__stage">
        {wine.limited && <span className="wine-card__edition">{t.edition}</span>}
        {wine.organic && <EcocertMark className="wine-card__eco" />}
        <span className="wine-card__shadow" />
        <Image src={wine.image} alt={wine.soon ? "" : `${wine.name} ${wine.vintage}`} width={372} height={1418} className="wine-card__bottle" />
      </div>
      <div className="wine-card__info">
        <h3 className="wine-card__name">{wine.name}</h3>
        <p className="wine-card__style">
          {t.style} · {wine.vintage}
          {wine.alcohol && <span> · {formatAlcohol(locale, wine.alcohol)}</span>}
        </p>
        <p className="wine-card__grapes">{wine.grapes}</p>
        {text && <p className="wine-card__highlights">{text.highlights.join(" · ")}</p>}
        <dl className="wine-card__formats">
          {wine.formats.map((f) => (
            <div key={f.lot}>
              <dt>{formatLitres(locale, f.litres)}</dt>
              <dd>
                {formatNumber(locale, f.bottles)} {t.bottles}
              </dd>
              <dd>
                {t.lot} {f.lot}
              </dd>
            </div>
          ))}
        </dl>
        {wine.soon ? (
          <span className="wine-card__more wine-card__more--soon">{t.soon}</span>
        ) : (
          <span className="wine-card__more">
            {t.discover}
            <ArrowIcon className="link__arrow" />
          </span>
        )}
      </div>
    </a>
  );
}
