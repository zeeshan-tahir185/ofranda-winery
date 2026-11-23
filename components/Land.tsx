import Image from "next/image";
import { landGallery } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import Title from "./Title";

export default function Land({ locale }: { locale: string }) {
  const l = getDict(locale).land;
  return (
    <section className="land screen" id="land" data-tone="dark">
      <div className="land__bg" data-parallax="0.12">
        <Image src="/media/sunrise.jpg" alt={l.alt} fill sizes="100vw" />
      </div>
      <div className="land__shade" />
      <div className="grain" />

      <div className="land__inner">
        <div className="land__text">
          <p className="eyebrow eyebrow--light" data-reveal>
            {l.eyebrow}
          </p>
          <Title lines={l.title} className="title--xl title--light" />
          <p className="body body--light land__body" data-reveal>
            {l.text}
          </p>
          <dl className="land__facts" data-reveal>
            {l.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="land__gallery">
          {landGallery.map((src, i) => (
            <li key={src} data-reveal style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
              <div className="land__thumb">
                <Image src={src} alt={l.gallery[i]} fill sizes="(max-width: 767px) 60vw, 14vw" />
              </div>
              <span>{l.gallery[i]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
