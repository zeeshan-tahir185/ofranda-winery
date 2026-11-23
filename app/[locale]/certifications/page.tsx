import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Title from "@/components/Title";
import Sketch, { SketchDefs } from "@/components/Sketch";
import { BiodyvinMark, EcocertMark, EuLeaf } from "@/components/Logo";
import { ArrowIcon } from "@/components/Icons";
import { alternates, getDict } from "@/lib/i18n";
import { certificates, chapterArt } from "@/lib/content";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const c = getDict(locale).certPage;
  return { title: c.title, description: c.description, alternates: alternates(locale, "/certifications") };
}

export default async function CertificationsPage({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  const c = t.certPage;
  return (
    <>
      <PageHero locale={locale} eyebrow={t.cert.eyebrow} title={c.heading} image="/media/earth-poster.jpg" crumbs={[{ label: c.title }]} />

      <section className="certs paper" data-tone="light">
        <SketchDefs />
        <div className="certs__inner">
          <article className="cert-row cert-row--eco" data-reveal>
            <div className="cert-row__logo">
              <EcocertMark className="eco-mark" />
              <EuLeaf className="eu-mark" code={certificates.ecocert.code} />
            </div>
            <div>
              <p className="cert-row__kicker">
                {t.cert.organic} · {t.cert.since}
              </p>
              <h2 className="cert-row__title">{certificates.ecocert.code}</h2>
              <p className="body">{c.ecocert}</p>
              <a className="cert-row__link" href={certificates.ecocert.link} target="_blank" rel="noreferrer">
                {t.cert.ecoLink}
                <ArrowIcon className="link__arrow" />
              </a>
            </div>
          </article>

          <article className="cert-row cert-row--bdv" data-reveal>
            <div className="cert-row__logo">
              <BiodyvinMark className="bdv-mark" />
            </div>
            <div>
              <p className="cert-row__kicker">{t.cert.bdvKicker}</p>
              <h2 className="cert-row__title">{c.bdvTitle}</h2>
              <p className="body">{c.biodyvin}</p>
              <span className="cert-row__link cert-row__link--soon">{c.bdvSoon}</span>
            </div>
          </article>

          {chapterArt.map((a, i) => (
            <article key={a.numeral} className="chapter-row">
              <div className="chapter-row__art" data-reveal>
                <Sketch kind={a.art} />
              </div>
              <div>
                <p className="numeral" data-reveal>
                  <span>{a.numeral}.</span>
                  <i />
                </p>
                <Title lines={c.chapters[i].title} as="h2" className="title--lg" />
                <p className="body" data-reveal>
                  {c.chapters[i].body}
                </p>
                <p className="chapter-row__coda" data-reveal>
                  {c.chapters[i].coda}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
