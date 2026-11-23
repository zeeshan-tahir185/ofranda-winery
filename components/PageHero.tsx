import Image from "next/image";
import Title from "./Title";
import JsonLd from "./JsonLd";
import { site } from "@/lib/content";
import { getDict } from "@/lib/i18n";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ locale, items, light = false }: { locale: string; items: Crumb[]; light?: boolean }) {
  const ui = getDict(locale).ui;
  const all = [{ label: ui.home, href: `/${locale}` }, ...items];
  return (
    <>
      <nav className={`crumbs ${light ? "crumbs--light" : ""}`} aria-label={ui.breadcrumb}>
        <ol>
          {all.map((c, i) => (
            <li key={c.label}>
              {c.href && i < all.length - 1 ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${site.url}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}

type Props = {
  locale: string;
  eyebrow: string;
  title: readonly string[];
  image: string;
  crumbs: Crumb[];
  intro?: string;
};

export default function PageHero({ locale, eyebrow, title, image, crumbs, intro }: Props) {
  return (
    <section className="page-hero" data-tone="dark">
      <div className="page-hero__bg" data-parallax="0.12">
        <Image src={image} alt="" fill priority sizes="100vw" />
      </div>
      <div className="page-hero__shade" />
      <div className="grain" />
      <div className="page-hero__inner">
        <Breadcrumbs locale={locale} items={crumbs} light />
        <p className="eyebrow eyebrow--light" data-reveal>
          {eyebrow}
        </p>
        <Title lines={title} as="h1" className="title--xl title--light" />
        {intro && (
          <p className="body body--light page-hero__intro" data-reveal>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
