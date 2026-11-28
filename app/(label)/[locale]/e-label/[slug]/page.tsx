import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Barcode from "@/components/Barcode";
import LangMenu from "@/components/LangMenu";
import { Logo } from "@/components/Logo";
import { BanIcon, LabelIcon, RecycleCode, RecycleIcon } from "@/components/LabelIcons";
import { alcoholOf, certificates, locales, site } from "@/lib/content";
import { getLabel, getWines } from "@/lib/data";
import { formatAlcohol, getDict } from "@/lib/i18n";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const items = await getWines("en");
  return locales.flatMap((locale) => items.filter((w) => w.label).map((w) => ({ locale, slug: w.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const wine = await getLabel(locale, slug);
  if (!wine) return {};
  const t = getDict(locale).eLabel;
  return {
    metadataBase: new URL(site.url),
    title: `${wine.name} ${wine.vintage} — ${t.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function ELabelPage({ params }: Params) {
  const { locale, slug } = await params;
  const wine = await getLabel(locale, slug);
  const label = wine?.label;
  if (!wine || !label) notFound();
  const d = getDict(locale);
  const t = d.eLabel;
  const [first, ...more] = wine.name.split(" ");
  const alcohol = alcoholOf(wine)
    .map((a) => formatAlcohol(locale, a))
    .join(" · ");

  return (
    <main className="el">
      <header className="el-head">
        <LangMenu locale={locale} label={d.ui.language} className="el-lang" />
        <div className="el-brand">
          <Logo className="el-logo" />
        </div>
        <p className="el-kicker">{t.title.replace(" – ", "\u00a0– ")}</p>
      </header>

      <div className="el-main">
        <div className="el-bottle">
          <Image src={wine.image} alt={`${wine.name} ${wine.vintage}`} width={380} height={1400} sizes="(max-width: 640px) 90px, 200px" priority />
        </div>

        <div className="el-info">
          <h1 className="el-name">
            <span>{first}</span>
            {more.length > 0 && <span>{` ${more.join(" ")}`}</span>}
          </h1>
          <p className="el-sub">
            {wine.vintage}
            <span className="el-dot" aria-hidden="true">
              •
            </span>
            {d.wine.style}
          </p>

          <dl className="el-rows">
            <div className="el-row">
              <LabelIcon name="grapes" className="el-icon" />
              <div>
                <dt>{t.grapes}</dt>
                <dd>{wine.grapes.split(" · ").join(", ")}</dd>
              </div>
            </div>
            {label.ingredients && (
              <div className="el-row">
                <LabelIcon name="leaf" className="el-icon" />
                <div>
                  <dt>{t.ingredients}</dt>
                  <dd>{label.ingredients}</dd>
                </div>
              </div>
            )}
            {label.allergens && (
              <div className="el-row">
                <LabelIcon name="flask" className="el-icon" />
                <div>
                  <dt>{t.allergens}</dt>
                  <dd>
                    <b>{label.allergens}</b>
                  </dd>
                </div>
              </div>
            )}
            {label.nutrition.length > 0 && (
              <div className="el-row">
                <LabelIcon name="document" className="el-icon" />
                <div>
                  <dt>{t.nutrition}</dt>
                  <dd>
                    <table className="el-table">
                      <thead>
                        <tr>
                          <th scope="col">{t.average}</th>
                          <th scope="col">{t.per100}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {label.nutrition.map(([name, value], i) => (
                          <tr key={name} className={i === 2 ? "is-sub" : undefined}>
                            <th scope="row">{t.nutritionRows[i] ?? name}</th>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </dd>
                </div>
              </div>
            )}
            <div className="el-row el-row--inline">
              <LabelIcon name="glass" className="el-icon" />
              <div>
                <dt>{t.alcohol}:</dt>
                <dd>
                  <b>{alcohol}</b>
                </dd>
              </div>
            </div>
            <div className="el-row">
              <LabelIcon name="factory" className="el-icon" />
              <div>
                <dt>{t.producer}</dt>
                <dd>
                  <b className="el-producer">{t.producerName}</b>
                  {t.address}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      {(wine.organic || wine.biodynamic) && (
        <section className={`el-certs ${wine.organic && wine.biodynamic ? "is-both" : ""}`} aria-label={d.wine.page.certification}>
          {wine.organic && (
            <div className="el-cert">
              <img src="/media/logos/eu-organic.svg" alt={d.wine.page.organic} width={1920} height={1288} className="el-leaf" />
              <span className="el-leaf-code">{certificates.ecocert.code}</span>
            </div>
          )}
          {wine.biodynamic && (
            <div className="el-cert">
              <img src="/media/logos/biodyvin.svg" alt={d.wine.page.biodynamic} width={1401} height={1449} className="el-bdv" />
            </div>
          )}
        </section>
      )}

      <section className={`el-band ${label.recycling.length ? "" : "is-solo"}`} aria-label={t.recycle}>
        <ul className="el-bans">
          {t.warnings.map((w, i) => (
            <li key={w}>
              <BanIcon kind={i} className="el-ban" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
        {label.recycling.length > 0 && (
          <div className="el-recycle">
            <RecycleIcon className="el-mobius" />
            <div>
              <p className="el-codes">
                {label.recycling.map((r, i) => (
                  <span key={`${r.code}-${r.material}`}>
                    {i > 0 && <i aria-hidden="true">+</i>}
                    <RecycleCode code={r.code} material={r.material} className="el-code" />
                  </span>
                ))}
              </p>
              <p className="el-recycle-text">
                <b>{t.recycle}</b> {t.recycleNote}
              </p>
            </div>
          </div>
        )}
      </section>

      <p className="el-dependence">
        <span>{t.dependence}</span>
      </p>

      <section className={`el-foot ${label.ean ? "" : "is-solo"}`}>
        {label.ean && <Barcode code={label.ean} label={t.barcode} className="el-barcode" />}
        <p className="el-legal">
          <LabelIcon name="book" className="el-legal-icon" />
          <span>{t.legal}</span>
        </p>
      </section>

      <section className="el-extra">
        <LabelIcon name="info" className="el-extra-icon" />
        <div>
          <p className="el-extra-title">{t.extra}</p>
          {label.extra && <p className="el-extra-text">{label.extra}</p>}
        </div>
      </section>

    </main>
  );
}
