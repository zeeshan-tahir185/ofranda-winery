import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Title from "@/components/Title";
import { alternates, getDict } from "@/lib/i18n";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return { title: t.story.title, description: t.story.description, alternates: alternates(locale, "/our-story") };
}

export default async function OurStory({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  const p = t.people;
  return (
    <>
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} image="/media/harvest.jpg" crumbs={[{ label: t.story.title }]} />

      <section className="prose-block paper" data-tone="light">
        <div className="prose-block__inner">
          <div className="prose-block__text">
            <p className="lead lead--left" data-reveal>
              {p.text}
            </p>
            <p className="body" data-reveal>
              {p.text2}
            </p>
          </div>
          <figure className="owner" data-reveal>
            <div className="owner__photo">
              <Image src="/media/hands-grapes.jpg" alt="" fill sizes="(max-width: 1180px) 90vw, 36vw" />
            </div>
            <blockquote className="owner__quote">“{p.quote}”</blockquote>
            <figcaption className="owner__name">
              <img src="/media/signature.png" alt="" width={983} height={548} />
              <span>
                <strong>{p.owner}</strong> · {p.role}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="chronicle" data-tone="dark">
        <div className="chronicle__inner">
          <p className="eyebrow eyebrow--light" data-reveal>
            {p.storyTitle}
          </p>
          <Title lines={t.story.chronicle} className="title--xl title--light" />
          <ol className="chronicle__list">
            {p.timeline.map((item, i) => (
              <li key={item.year} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="chronicle__year">{item.year}</span>
                <p>{item.text}</p>
              </li>
            ))}
            <li data-reveal>
              <span className="chronicle__year">…</span>
              <p>
                <em>{p.more}</em>
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
