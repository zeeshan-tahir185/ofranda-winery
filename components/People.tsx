import Image from "next/image";
import { timeline } from "@/lib/content";
import Title from "./Title";
import { ArrowIcon } from "./Icons";

export default function People() {
  return (
    <section className="people" id="people" data-tone="dark">
      <div className="people__grid">
        <div className="people__visual">
          <div className="people__main" data-reveal>
            <div className="people__img" data-parallax="0.12">
              <Image src="/media/harvest.jpg" alt="Harvest by hand in the vineyard" fill sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
          <div className="people__inset" data-reveal>
            <div className="people__img" data-parallax="0.2">
              <Image src="/media/picking.jpg" alt="Picking grapes by hand" fill sizes="(max-width: 900px) 50vw, 20vw" />
            </div>
          </div>
        </div>

        <div className="people__text">
          <p className="eyebrow eyebrow--light" data-reveal>
            The history and people of Ofranda
          </p>
          <Title lines={["The people", "behind Ofranda"]} className="title--xl title--light" />
          <p className="body body--light" data-reveal>
            A winemaker with decades in the cellar and a team of local people who have known these hills all their
            lives. Every vine is pruned, tended and harvested by hand, by people who believe that good wine begins
            long before the grapes are picked.
          </p>
          <blockquote className="quote" data-reveal>
            “We do not make the wine. We accompany it, from the soil to the bottle, and try to keep it honest.”
          </blockquote>
          <div className="signature" data-reveal>
            <img src="/media/signature.png" alt="Winemaker's signature" width={983} height={548} />
            <span>The winemaker of Ofranda</span>
          </div>
          <a href="#people" className="link link--light" data-reveal>
            Discover our story
            <ArrowIcon className="link__arrow" />
          </a>
        </div>
      </div>

      <ol className="timeline">
        {timeline.map((t, i) => (
          <li key={t.year} data-reveal style={{ transitionDelay: `${i * 0.12}s` }}>
            <span className="timeline__year">{t.year}</span>
            <i className="timeline__dot" />
            <p>{t.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
