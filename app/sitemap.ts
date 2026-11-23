import type { MetadataRoute } from "next";
import { locales, news, site, wines } from "@/lib/content";
import { legalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/our-story",
    "/certifications",
    "/news",
    ...news.map((n) => `/news/${n.slug}`),
    ...wines.filter((w) => !w.soon).map((w) => `/wines/${w.slug}`),
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
