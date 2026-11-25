import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ShareBar from "@/components/ShareBar";
import PostCard from "@/components/PostCard";
import { alternates, formatDate, getDict } from "@/lib/i18n";
import { locales, site } from "@/lib/content";
import { getPostView, getPosts } from "@/lib/data";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts("en");
  return locales.flatMap((locale) => posts.map((n) => ({ locale, slug: n.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostView(locale, slug);
  if (!post) return {};
  const text = post;
  return {
    title: text.title,
    description: text.text,
    alternates: alternates(locale, `/news/${slug}`),
    openGraph: { type: "article", title: text.title, description: text.text, images: [post.image] },
  };
}

export default async function Article({ params }: Params) {
  const { locale, slug } = await params;
  const post = await getPostView(locale, slug);
  if (!post) notFound();
  const t = getDict(locale);
  const text = post;
  const more = (await getPosts(locale)).filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: text.title,
          description: text.text,
          datePublished: post.iso,
          inLanguage: locale,
          image: post.image.startsWith("http") ? post.image : `${site.url}${post.image}`,
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
      <article className="article paper" data-tone="light">
        <header className="article__head">
          <Breadcrumbs locale={locale} items={[{ label: t.news.pageTitle, href: `/${locale}/news` }, { label: text.title }]} />
          <p className="post__meta">
            <span>{t.news.categories[post.category]}</span>
            <time dateTime={post.iso}>{formatDate(locale, post.iso)}</time>
          </p>
          <h1 className="title title--xl article__title">{text.title}</h1>
          <p className="lead lead--left">{text.text}</p>
        </header>
        <div className="article__img">
          <Image src={post.image} alt="" fill priority sizes="(max-width: 1180px) 100vw, 1200px" />
        </div>
        <div className="article__body">
          {text.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <ShareBar title={text.title} t={t.ui} />
        </div>
      </article>

      <section className="more paper" data-tone="light">
        <div className="more__inner">
          <p className="eyebrow">{t.ui.moreNews}</p>
          <div className="more__grid">
            {more.map((n) => (
              <PostCard key={n.slug} post={n} locale={locale} heading="h2" excerpt={false} sizes="(max-width: 767px) 92vw, 30vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
