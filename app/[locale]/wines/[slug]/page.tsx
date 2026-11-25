import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ShareBar from "@/components/ShareBar";
import BottleTilt from "@/components/BottleTilt";
import Dossier, { type DossierTab } from "@/components/Dossier";
import { BiodyvinMark, EuLeaf } from "@/components/Logo";
import TechIcon, { WarningIcon } from "@/components/TechIcon";
import { alternates, formatAlcohol, formatLitres, formatNumber, getDict } from "@/lib/i18n";
import { alcoholOf, certificates, locales, site } from "@/lib/content";
import { getWine, getWines } from "@/lib/data";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const items = await getWines("en");
  return locales.flatMap((locale) => items.filter((w) => w.page).map((w) => ({ locale, slug: w.slug })));
}

const nameLines = (name: string) => {
  const words = name.toUpperCase().split(" ");
  const out: string[] = [];
  for (const w of words) {
    const last = out[out.length - 1];
    if (last && (last + " " + w).length <= 10) out[out.length - 1] = last + " " + w;
    else out.push(w);
  }
  return out;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const wine = await getWine(locale, slug);
  const page = wine?.page;
  if (!wine || !page) return {};
  const title = `${wine.name} ${wine.vintage}`;
  return {
    title,
    description: page.summary,
    alternates: alternates(locale, `/wines/${slug}`),
    openGraph: { title, description: page.summary, images: [wine.image] },
  };
}

const vinIcons = ["vinification", "fermentation", "extraction", "filtration", "ageing"];
const terroirIcons = ["origin", "altitude", "exposure", "yield", "soil"];
const charIcons = ["glass", "calendar", "percent", "volume", "bottles", "lot"];
const servingIcons = ["temperature", "glass", "decant"];

export default async function WinePage({ params }: Params) {
  const { locale, slug } = await params;
  const wine = await getWine(locale, slug);
  const page = wine?.page;
  if (!wine || !page) notFound();
  const d = getDict(locale);
  const t = d.wine;
  const p = t.page;
  const lines = nameLines(wine.name);
  const longest = Math.max(...lines.map((l) => l.length));
  const harvest = Number(wine.vintage);
  const bottledYear = wine.bottled ? Number(wine.bottled.slice(0, 4)) : undefined;
  const ageing = page.ageing;
  const lastYear = Math.max(harvest + 6, ageing ? ageing[1] : 0);
  const years = Array.from({ length: lastYear - harvest + 1 }, (_, i) => harvest + i);
  const step = years.length > 9 ? 2 : 1;
  const span = years.length - 1;
  const windowStyle = ageing
    ? { top: `${((lastYear - ageing[1]) / span) * 100}%`, height: `${((ageing[1] - ageing[0]) / span) * 100}%` }
    : undefined;
  const others = (await getWines(locale)).filter((o) => o.slug !== wine.slug);

  const rows = (pairs: string[][], icons: string[]) =>
    pairs.map(([label, value], i) => ({ icon: icons[i] ?? "grapes", label, value: value || t.tbc, muted: !value }));

  const tabs: DossierTab[] = [
    { title: p.tabs[0], rows: rows(page.vinification, vinIcons) },
    { title: p.tabs[1], rows: rows(page.terroir, terroirIcons) },
    { title: p.tabs[2], rows: rows(page.characteristics, charIcons) },
  ];

  const facts = [
    { icon: "percent", label: t.labels.alcohol, value: alcoholOf(wine).map((a) => formatAlcohol(locale, a)).join(" · ") },
    { icon: "volume", label: t.labels.volume, value: wine.formats.map((f) => formatLitres(locale, f.litres)).join(" · ") },
    { icon: "bottles", label: t.labels.bottles, value: wine.formats.map((f) => formatNumber(locale, f.bottles)).join(" · ") },
    { icon: "lot", label: t.labels.lot, value: wine.formats.map((f) => f.lot).join(" · ") },
    { icon: "calendar", label: t.labels.vintage, value: wine.vintage },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${wine.name} ${wine.vintage}`,
          description: page.summary,
          image: wine.image.startsWith("http") ? wine.image : `${site.url}${wine.image}`,
          brand: { "@type": "Brand", name: site.name },
          category: "Wine",
          additionalProperty: [...page.characteristics, ...page.vinification]
            .filter(([, v]) => v)
            .map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
        }}
      />

      <section className="vp" data-tone="dark" style={{ ["--tint" as string]: wine.tint }}>
        <div className="vp__stage" data-tilt-host>
          <div className="vp__bg" />

          <div className="vp__crumbs">
            <Breadcrumbs light locale={locale} items={[{ label: d.nav.wines, href: `/${locale}#wines` }, { label: wine.name }]} />
          </div>

          <h1 className="vp__name" style={{ ["--fs" as string]: `${Math.min(17, 70 / (longest * 0.74)).toFixed(2)}vw` }}>
            {lines.map((l, i) => (
              <span key={l} className="vp__line">
                <span style={{ animationDelay: `${0.15 + i * 0.1}s` }}>{l}</span>
              </span>
            ))}
            <span className="sr-only"> {wine.vintage}</span>
          </h1>

          <BottleTilt src={wine.image} alt={`${wine.name} ${wine.vintage}`} />

          <div className="vp__age" aria-label={p.ageing}>
            <p className="vp__age-title">{p.ageing}</p>
            <div className="vp__age-scale">
              <span className={`vp__age-window ${ageing ? "is-set" : ""}`} style={windowStyle}>
                <span className="vp__age-note">
                  <span>{p.window}</span>
                  <b>{ageing ? `${ageing[0]}–${ageing[1]}` : t.tbc}</b>
                </span>
              </span>
              <ol>
                {years
                  .slice()
                  .reverse()
                  .map((y) => (
                    <li key={y} className={y === harvest ? "is-harvest" : y === bottledYear ? "is-bottled" : undefined}>
                      <span className="vp__age-year">{(y - harvest) % step === 0 || y === bottledYear ? y : ""}</span>
                      {y === harvest && <span className="vp__age-tag">{p.harvest}</span>}
                      {y === bottledYear && <span className="vp__age-tag">{p.bottled}</span>}
                    </li>
                  ))}
              </ol>
            </div>
          </div>

          <div className="vp__intro">
            <p className="vp__kicker">
              {t.style} <i>{wine.vintage}</i>
            </p>
            <p className="vp__grapes">{wine.grapes}</p>
            <p className="vp__summary">{page.summary}</p>
            <p className="vp__note">{page.vintageNote}</p>
          </div>

          <div className="vp__character">
            <p className="vp__label">{p.character}</p>
            <dl>
              <div>
                <dt>{p.style}</dt>
                <dd>{page.character.style}</dd>
              </div>
              <div>
                <dt>{p.profile}</dt>
                <dd className="vp__profile">
                  {page.character.profile.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>{p.body}</dt>
                <dd>
                  <span className="vp__body" aria-label={page.character.body}>
                    {p.bodyScale.map((s, i) => (
                      <span key={s} className={`${i < (wine.body ?? 0) ? "is-on" : ""} ${i === (wine.body ?? 0) - 1 ? "is-at" : ""}`}>
                        {s}
                      </span>
                    ))}
                  </span>
                </dd>
              </div>
              <div>
                <dt>{p.segment}</dt>
                <dd>{page.character.segment}</dd>
              </div>
            </dl>
          </div>

          <ul className="vp__facts">
            {facts.map((f) => (
              <li key={f.label}>
                <TechIcon name={f.icon} className="vp__fact-icon" />
                <span>
                  <small>{f.label}</small>
                  {f.value}
                </span>
              </li>
            ))}
            {wine.organic && (
              <li className="vp__leaf">
                <EuLeaf code={certificates.ecocert.code} />
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="vp-more" data-tone="dark" style={{ ["--tint" as string]: wine.tint }}>
        <div className="vp-more__inner">
          <Dossier tabs={tabs} label={wine.name} />

          <div className="vp-acc">
            <details name="vp-acc">
              <summary>
                <span>{p.serving}</span>
              </summary>
              <dl className="vp-acc__rows">
                {page.serving.map(([label, value], i) => (
                  <div key={label}>
                    <TechIcon name={servingIcons[i]} className="vp-acc__icon" />
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details name="vp-acc">
              <summary>
                <span>{p.pairing}</span>
              </summary>
              <ul className="vp-acc__chips">
                {page.pairing.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </details>
            <details name="vp-acc">
              <summary>
                <span>{p.ingredients}</span>
              </summary>
              <p className="vp-acc__lead">{page.ingredients}</p>
              <dl className="vp-acc__table">
                <div>
                  <dt>{page.so2[0]}</dt>
                  <dd>{page.so2[1]}</dd>
                </div>
              </dl>
              <p className="vp-acc__sub">{p.per100}</p>
              <dl className="vp-acc__table">
                {page.nutrition.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details name="vp-acc">
              <summary>
                <span>{p.analytics}</span>
              </summary>
              <dl className="vp-acc__table">
                {page.analytics.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details name="vp-acc">
              <summary>
                <span>{p.producer}</span>
              </summary>
              <address className="vp-acc__address">
                {page.producer.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <dl className="vp-acc__table">
                {page.bottling.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </div>

          <div className="vp-seal">
            <p className="vp__label">{p.certification}</p>
            <div className="vp-seal__marks">
              {wine.organic && (
                <div className="vp-seal__mark">
                  <EuLeaf className="vp-seal__leaf" />
                  <span>
                    {page.certification[0][0]}
                    <b>{page.certification[0][1]}</b>
                  </span>
                </div>
              )}
              <div className="vp-seal__mark">
                <BiodyvinMark className="vp-seal__bdv" />
                <span>
                  {page.certification[1][0]}
                  <b>{page.certification[1][1]}</b>
                </span>
              </div>
            </div>

            <p className="vp__label vp-seal__gap">{p.responsible}</p>
            <ul className="vp-seal__warn">
              {t.warnings.map((w, i) => (
                <li key={w}>
                  <WarningIcon kind={i} className="vp-seal__icon" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <p className="vp-seal__addict">{t.addiction}</p>
            <ShareBar title={`${wine.name} ${wine.vintage}`} t={d.ui} />
          </div>
        </div>
      </section>

      <section className="vp-shelf" data-tone="dark" aria-label={p.collection}>
        <p className="vp__label">{p.collection}</p>
        <ul className="vp-shelf__row">
          {others.map((o) => {
            const inner = (
              <>
                <Image src={o.image} alt={`${o.name} ${o.vintage}`} width={380} height={1400} sizes="120px" className="vp-shelf__img" />
                <span className="vp-shelf__name">{o.name}</span>
                <span className="vp-shelf__meta">{`${o.vintage} · ${alcoholOf(o).map((a) => formatAlcohol(locale, a)).join(" · ")}`}</span>
              </>
            );
            return (
              <li key={o.slug}>
                {!o.page ? <div className="vp-shelf__item is-soon">{inner}</div> : <a href={`/${locale}/wines/${o.slug}`} className="vp-shelf__item">{inner}</a>}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
