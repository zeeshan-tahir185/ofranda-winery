import { news } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import Title from "./Title";
import Rail from "./Rail";
import PostCard from "./PostCard";
import { ArrowIcon } from "./Icons";

export default function News({ locale }: { locale: string }) {
  const t = getDict(locale);
  return (
    <section className="news paper screen" id="news" data-tone="light">
      <div className="news__inner">
        <div className="section-head">
          <div>
            <p className="eyebrow" data-reveal>
              {t.news.eyebrow}
            </p>
            <Title lines={t.news.title} className="title--xl" />
          </div>
          <a href={`/${locale}/news`} className="link" data-reveal>
            {t.ui.allNews}
            <ArrowIcon className="link__arrow" />
          </a>
        </div>

        <Rail label={t.news.pageTitle} prevLabel={t.ui.previous} nextLabel={t.ui.next} className="news__rail">
          {news.map((n, i) => (
            <PostCard key={n.slug} post={n} locale={locale} sizes="(max-width: 767px) 80vw, (max-width: 1180px) 45vw, 30vw" delay={i * 0.1} reveal />
          ))}
        </Rail>
      </div>
    </section>
  );
}
