import { pillarArt } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import Title from "./Title";
import Sketch, { SketchDefs } from "./Sketch";
import { ArrowIcon } from "./Icons";

export default function Philosophy({ locale }: { locale: string }) {
  const p = getDict(locale).philosophy;
  return (
    <section className="philo paper screen" id="philosophy" data-tone="light">
      <SketchDefs />
      <div className="philo__inner">
        <div className="philo__text">
          <p className="eyebrow" data-reveal>
            {p.eyebrow}
          </p>
          <Title lines={p.title} className="title--xl" />
          <p className="philo__statement" data-reveal>
            {p.statement[0]}
            <em>{p.statement[1]}</em>
          </p>
          <a href={`/${locale}/our-story`} className="link" data-reveal>
            {p.link}
            <ArrowIcon className="link__arrow" />
          </a>
        </div>

        <ul className="pillars">
          {pillarArt.map((a, i) => (
            <li key={a.numeral} className="pillar" data-reveal style={{ transitionDelay: `${0.1 + i * 0.14}s` }}>
              <Sketch kind={a.art} />
              <span className="pillar__num">{a.numeral}</span>
              <h3 className="pillar__title">{p.pillars[i].title}</h3>
              <p className="pillar__text">{p.pillars[i].text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
