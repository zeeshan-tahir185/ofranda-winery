import type { Wine } from "@/lib/content";
import { certificates } from "@/lib/content";
import { formatAlcohol, getDict } from "@/lib/i18n";
import Cellar, { type CellarItem } from "./Cellar";

export default function Collection({ items, locale }: { items: Wine[]; locale: string }) {
  const d = getDict(locale);
  const t = d.wine;

  const data: CellarItem[] = items.map((wine) => {
    const text = d.wineText[wine.slug as keyof typeof d.wineText];
    const specs = wine.alcohol ? [{ label: t.labels.alcohol, value: formatAlcohol(locale, wine.alcohol) }] : [];
    return {
      slug: wine.slug,
      name: wine.name,
      vintage: wine.vintage,
      type: t.style,
      edition: wine.limited ? t.edition : undefined,
      grapes: wine.grapes,
      summary: text?.summary,
      notes: text?.highlights ?? [],
      specs,
      organic: wine.organic ? certificates.ecocert.code : undefined,
      href: wine.soon ? undefined : `/${locale}/wines/${wine.slug}`,
      image: wine.image,
      sample: wine.image === "/media/sample-bottle.png",
    };
  });

  return <Cellar items={data} label={d.winesSection.railLabel} discover={t.discover} soon={t.soon} />;
}
