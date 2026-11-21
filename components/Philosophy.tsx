import Image from "next/image";
import { chapters } from "@/lib/content";
import Title from "./Title";
import { Cycles, Divider, Roots, Sprout } from "./LineArt";

const arts = { sprout: Sprout, roots: Roots, cycles: Cycles };

export default function Philosophy() {
  return (
    <section className="philosophy paper" id="philosophy" data-tone="light">
      <div className="philosophy__intro">
        <p className="eyebrow" data-reveal>
          The philosophy of Ofranda
        </p>
        <Title lines={["From Mother Earth", "to the essence of wine"]} className="title--xl" />
        <div data-reveal className="philosophy__divider">
          <Divider />
        </div>
        <p className="lead" data-reveal>
          In Romanian, <em>ofrandă</em> means an offering. Each bottle is what the land gives us in a single year,
          shaped by the sun, the soil and the hands that care for it. We only try not to stand in its way.
        </p>
      </div>

      <div className="chapters">
        {chapters.map((c, i) => {
          const Art = arts[c.art];
          return (
            <article key={c.numeral} className={`chapter ${i % 2 ? "chapter--flip" : ""}`}>
              <div className="chapter__visual">
                <div className="arch" data-reveal>
                  <div className="arch__mask">
                    <div className="arch__img" data-parallax="0.1">
                      <Image src={c.image} alt="" fill sizes="(max-width: 900px) 90vw, 40vw" />
                    </div>
                  </div>
                </div>
                <div className="chapter__art" data-reveal>
                  <Art />
                  <span className="chapter__caption">{c.caption}</span>
                </div>
              </div>
              <div className="chapter__text">
                <p className="numeral" data-reveal>
                  <span>{c.numeral}</span>
                  <i />
                </p>
                <Title lines={c.title} as="h3" className="title--lg" />
                {c.body.map((p, j) => (
                  <p key={j} className={j === c.body.length - 1 ? "chapter__coda" : "chapter__body"} data-reveal>
                    {p}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
