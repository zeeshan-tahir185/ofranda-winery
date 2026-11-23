import { wines } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import Title from "./Title";
import Rail from "./Rail";
import WineCard from "./WineCard";

export default function Wines({ locale }: { locale: string }) {
  const t = getDict(locale);
  const s = t.winesSection;
  return (
    <section className="wines screen" id="wines" data-tone="light">
      <div className="wines__inner">
        <div className="section-head">
          <div>
            <p className="eyebrow" data-reveal>
              {s.eyebrow}
            </p>
            <Title lines={s.title} className="title--xl" />
          </div>
        </div>

        <Rail label={s.railLabel} prevLabel={t.ui.previous} nextLabel={t.ui.next} className="wines__rail">
          {wines.map((w, i) => (
            <WineCard key={w.slug} wine={w} locale={locale} delay={i * 0.08} reveal />
          ))}
        </Rail>
      </div>
    </section>
  );
}
