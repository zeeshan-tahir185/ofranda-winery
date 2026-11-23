import Image from "next/image";
import { timelinePhoto } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import Title from "./Title";
import { ArrowIcon } from "./Icons";

export default function People({ locale }: { locale: string }) {
  const p = getDict(locale).people;
  return (
    <section className="people" id="people" data-tone="dark">
      <div className="people__grid">
        <figure className="people__photo" data-reveal>
          <div className="people__img" data-parallax="0.1">
            <Image src={timelinePhoto} alt={p.photoAlt} fill sizes="(max-width: 1180px) 92vw, 46vw" />
          </div>
          <figcaption className="people__quote">
            <span className="people__mark">“</span>
            {p.quote}
          </figcaption>
        </figure>

        <div className="people__text">
          <p className="eyebrow eyebrow--light" data-reveal>
            {p.eyebrow}
          </p>
          <Title lines={p.title} className="title--xl title--light" />
          <p className="body body--light" data-reveal>
            {p.text}
          </p>
          <div className="signature" data-reveal>
            <img src="/media/signature.png" alt="" width={983} height={548} />
            <span>
              <strong>{p.owner}</strong> · {p.role}
            </span>
          </div>
          <a href={`/${locale}/our-story`} className="link link--light" data-reveal>
            {p.link}
            <ArrowIcon className="link__arrow" />
          </a>
        </div>
      </div>

      <div className="story">
        <p className="story__title" data-reveal>
          {p.storyTitle}
        </p>
        <ol className="story__track">
          {p.timeline.map((t, i) => (
            <li key={t.year} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="story__year">{t.year}</span>
              <i className="story__dot" />
              <p>{t.text}</p>
            </li>
          ))}
          <li className="story__more" data-reveal style={{ transitionDelay: "0.5s" }}>
            <span className="story__year">
              <em>…</em>
            </span>
            <i className="story__dot" />
            <p>
              <em>{p.more}</em>
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
