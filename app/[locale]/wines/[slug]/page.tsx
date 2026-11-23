import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ShareBar from "@/components/ShareBar";
import { BiodyvinMark, EcocertMark, EuLeaf } from "@/components/Logo";
import Collection from "@/components/Collection";
import { DownloadIcon } from "@/components/Icons";
import TechIcon, { WarningIcon } from "@/components/TechIcon";
import { alternates, formatDate, formatLitres, formatNumber, getDict } from "@/lib/i18n";
import { certificates, company, getWine, locales, site, wines } from "@/lib/content";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => wines.filter((w) => !w.soon).map((w) => ({ locale, slug: w.slug })));
}

const textOf = (locale: string, slug: string) => {
  const all = getDict(locale).wineText;
  return all[slug as keyof typeof all];
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const wine = getWine(slug);
  const text = textOf(locale, slug);
  if (!wine || !text) return {};
  const title = `${wine.name} ${wine.vintage}`;
  return {
    title,
    description: text.summary,
    alternates: alternates(locale, `/wines/${slug}`),
    openGraph: { title, description: text.summary, images: [wine.image] },
  };
}

export default async function WinePage({ params }: Params) {
  const { locale, slug } = await params;
  const wine = getWine(slug);
  const text = textOf(locale, slug);
  if (!wine || !text) notFound();
  const t = getDict(locale);
  const w = t.wine;
  const technical = Object.entries(text.technical) as [keyof typeof w.labels, string][];
  const others = wines.filter((o) => o.slug !== wine.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${wine.name} ${wine.vintage}`,
          description: text.summary,
          image: `${site.url}${wine.image}`,
          brand: { "@type": "Brand", name: site.name },
          category: "Wine",
          additionalProperty: technical.map(([key, value]) => ({ "@type": "PropertyValue", name: w.labels[key], value })),
        }}
      />

      <section className="wine-page" data-tone="light">
        <div className="wine-page__inner">
          <Breadcrumbs locale={locale} items={[{ label: t.nav.wines, href: `/${locale}#wines` }, { label: wine.name }]} />

          <div className="wine-page__grid">
            <div className="wine-page__stage">
              <span className="wine-page__shadow" />
              <Image src={wine.image} alt={`${wine.name} ${wine.vintage}`} width={372} height={1418} priority className="wine-page__bottle" />
            </div>

            <div className="wine-page__info">
              <p className="wine-page__kicker">
                {w.style} · {wine.vintage}
                {wine.limited && <> · {w.edition}</>}
              </p>
              <h1 className="wine-page__name">{wine.name}</h1>
              <p className="wine-page__grapes">{wine.grapes}</p>
              <p className="wine-page__summary">{text.summary}</p>
              <ul className="wine-page__highlights">
                {text.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <dl className="wine-page__formats">
                {wine.formats.map((f) => (
                  <div key={f.lot}>
                    <dt>{formatLitres(locale, f.litres)}</dt>
                    <dd>
                      {formatNumber(locale, f.bottles)} {w.bottles}
                    </dd>
                    <dd>
                      {w.lot} {f.lot}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="wine-page__certs">
                {wine.organic && (
                  <>
                    <span className="wine-cert">
                      <EcocertMark className="wine-cert__eco" />
                      <span>
                        {w.organic}
                        <strong>{certificates.ecocert.code}</strong>
                      </span>
                    </span>
                    <span className="wine-cert">
                      <EuLeaf className="wine-cert__eu" code={certificates.ecocert.code} />
                    </span>
                  </>
                )}
                <span className="wine-cert">
                  <BiodyvinMark className="wine-cert__bdv" />
                  <span>
                    {w.bdv}
                    <strong>{w.bdvStage}</strong>
                  </span>
                </span>
              </div>

              <div className="wine-page__actions">
                <span className="btn btn--line btn--sm wine-page__sheet" aria-disabled="true">
                  <DownloadIcon className="ico" />
                  {w.sheetSoon}
                </span>
                <ShareBar title={`${wine.name} ${wine.vintage}`} t={t.ui} />
              </div>
            </div>
          </div>

          <div className="wine-specs">
            <div className="wine-specs__block wine-specs__block--wide">
              <h2 className="wine-specs__title">{w.technical}</h2>
              <dl className="tech">
                {technical.map(([key, value]) => (
                  <div key={key} className="tech__item">
                    <TechIcon name={key} />
                    <dt>{w.labels[key]}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="wine-specs__block">
              <h2 className="wine-specs__title">{w.serving}</h2>
              <dl className="rows">
                {(["temperature", "pairing"] as const).map((key) => (
                  <div key={key}>
                    <dt>{w.labels[key]}</dt>
                    <dd>{w.tbc}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="wine-specs__block">
              <h2 className="wine-specs__title">{w.ingredients}</h2>
              <p className="wine-specs__ingredients">{text.ingredients}</p>
              <dl className="rows">
                <div>
                  <dt>{w.per100}</dt>
                  <dd />
                </div>
                {(["energy", "carbs", "sugars"] as const).map((key) => (
                  <div key={key}>
                    <dt>{w.labels[key]}</dt>
                    <dd>{w.tbc}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="wine-specs__block wine-specs__block--wide">
              <h2 className="wine-specs__title">{w.producerTitle}</h2>
              <dl className="rows rows--stack">
                <div>
                  <dt>{w.labels.producer}</dt>
                  <dd>
                    {company.producer}
                    <br />
                    {company.address}
                  </dd>
                </div>
                <div>
                  <dt>{w.labels.bottler}</dt>
                  <dd>{company.producer}</dd>
                </div>
                {wine.bottled && (
                  <div>
                    <dt>{w.labels.bottled}</dt>
                    <dd>{formatDate(locale, wine.bottled)}</dd>
                  </div>
                )}
                <div>
                  <dt>{w.labels.lotNumber}</dt>
                  <dd>{wine.formats.map((f) => f.lot).join(" / ")}</dd>
                </div>
                <div>
                  <dt>{w.labels.origin}</dt>
                  <dd>{w.originValue}</dd>
                </div>
              </dl>
              <ul className="warnings">
                {w.warnings.map((text, i) => (
                  <li key={text}>
                    <WarningIcon kind={i} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wine-others" data-tone="dark" aria-label={t.winesSection.others.join(" ")}>
        <Collection items={others} locale={locale} />
      </section>
    </>
  );
}
