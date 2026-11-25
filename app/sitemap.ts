import type { MetadataRoute } from "next";
import { locales, site } from "@/lib/content";
import { getPosts, getWines } from "@/lib/data";
import { legalSlugs } from "@/lib/legal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, posts] = await Promise.all([getWines("en"), getPosts("en")]);
  const paths = [
    "",
    "/our-story",
    "/certifications",
    "/news",
    ...posts.map((n) => `/news/${n.slug}`),
    ...items.filter((w) => w.page).map((w) => `/wines/${w.slug}`),
    ...legalSlugs.map((s) => `/${s}`),
  ];
  const languages = (path: string) => Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`]));
  return paths.flatMap((path) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${path}`,
      lastModified: new Date(),
      alternates: { languages: languages(path) },
    })),
  );
}
