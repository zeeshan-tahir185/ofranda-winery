import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsList from "@/components/NewsList";
import PostCard from "@/components/PostCard";
import { alternates, getDict } from "@/lib/i18n";
import { newsCategories } from "@/lib/content";
import { getPosts } from "@/lib/data";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const n = getDict(locale).news;
  return { title: n.pageTitle, description: n.description, alternates: alternates(locale, "/news") };
}

export default async function NewsPage({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  const news = await getPosts(locale);
  return (
    <>
      <PageHero locale={locale} eyebrow={t.news.eyebrow} title={t.news.title} image="/media/vineyard.jpg" crumbs={[{ label: t.news.pageTitle }]} />
      <section className="newslist paper" data-tone="light">
        <NewsList
          label={t.ui.categories}
          categories={newsCategories.map((key) => ({ key, label: t.news.categories[key] }))}
          items={news.map((p) => ({
            category: p.category,
            node: <PostCard key={p.slug} post={p} locale={locale} heading="h2" sizes="(max-width: 767px) 92vw, (max-width: 1180px) 45vw, 30vw" />,
          }))}
        />
      </section>
    </>
  );
}
