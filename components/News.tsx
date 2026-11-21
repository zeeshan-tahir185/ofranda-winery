import Image from "next/image";
import { news } from "@/lib/content";
import Title from "./Title";
import { ArrowIcon } from "./Icons";

export default function News() {
  return (
    <section className="news" id="news" data-tone="light">
      <div className="news__head">
        <div>
          <p className="eyebrow" data-reveal>
            Life at the winery
          </p>
          <Title lines={["News", "& events"]} className="title--xl" />
        </div>
        <a href="#news" className="link" data-reveal>
          All news
          <ArrowIcon className="link__arrow" />
        </a>
      </div>

      <div className="news__grid">
        {news.map((n, i) => (
          <a href="#news" className="story" key={n.title} data-reveal style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="story__img">
              <Image src={n.image} alt="" fill sizes="(max-width: 900px) 92vw, 30vw" />
            </div>
            <p className="story__meta">
              <span>{n.category}</span>
              <time>{n.date}</time>
            </p>
            <h3 className="story__title">{n.title}</h3>
            <p className="story__text">{n.text}</p>
            <span className="story__more">
              Read more
              <ArrowIcon className="link__arrow" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
