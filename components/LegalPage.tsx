import { Breadcrumbs } from "./PageHero";
import { getDict } from "@/lib/i18n";
import type { LegalDoc } from "@/lib/legal";

export default function LegalPage({ locale, doc }: { locale: string; doc: LegalDoc }) {
  const ui = getDict(locale).ui;
  return (
    <article className="legal paper" data-tone="light">
      <div className="legal__inner">
        <Breadcrumbs locale={locale} items={[{ label: doc.title }]} />
        <h1 className="title title--xl">{doc.title}</h1>
        <p className="legal__updated">
          {ui.lastUpdated}: {doc.updated}
        </p>
        {doc.sections.map((s) => (
          <section key={s.heading} className="legal__section">
            <h2>{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
