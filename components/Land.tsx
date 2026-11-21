import Image from "next/image";
import { landFacts } from "@/lib/content";
import Title from "./Title";

export default function Land() {
  return (
    <section className="land" id="land" data-tone="light">
      <div className="land__panorama" data-tone="dark">
        <div className="land__img" data-parallax="0.18">
          <Image src="/media/sunrise.jpg" alt="Sunrise over the Ofranda vineyard" fill sizes="100vw" />
        </div>
        <div className="land__shade" />
        <div className="land__overlay">
          <p className="eyebrow eyebrow--light" data-reveal>
            The land, the soul of Ofranda
          </p>
          <Title lines={["The land that gives", "life to our wine"]} className="title--xl title--light" />
        </div>
      </div>

      <div className="land__body paper">
        <div className="land__text">
          <p className="lead lead--left" data-reveal>
            Gentle hills, long warm summers and cold, clear winters. Our vines grow slowly here, sending their roots
            deep in search of water, and that patience is what you taste in the glass.
          </p>
          <p className="body" data-reveal>
            Between the rows we leave wild grasses and flowers for the bees, the birds and the life in the soil. We
            do not fight nature here. We listen to it, season after season, and let the land speak through the
            wine.
          </p>
        </div>
        <dl className="facts">
          {landFacts.map((f, i) => (
            <div key={f.label} className="facts__item" data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="strip paper">
        <figure className="strip__item strip__item--a" data-reveal>
          <div className="strip__img" data-parallax="0.08">
            <Image src="/media/vineyard.jpg" alt="Vineyard rows" fill sizes="(max-width: 900px) 90vw, 34vw" />
          </div>
          <figcaption>Vineyard</figcaption>
        </figure>
        <figure className="strip__item strip__item--b" data-reveal>
          <div className="strip__img" data-parallax="0.14">
            <Image src="/media/clusters.jpg" alt="Grape clusters on the vine" fill sizes="(max-width: 900px) 90vw, 28vw" />
          </div>
          <figcaption>Fruit</figcaption>
        </figure>
        <figure className="strip__item strip__item--c" data-reveal>
          <div className="strip__img" data-parallax="0.06">
            <Image src="/media/aerial.jpg" alt="The hills from above" fill sizes="(max-width: 900px) 90vw, 30vw" />
          </div>
          <figcaption>Terroir</figcaption>
        </figure>
      </div>
    </section>
  );
}
