import type { WineView } from "@/lib/data";
import { alcoholOf, certificates } from "@/lib/content";
import { formatAlcohol, getDict } from "@/lib/i18n";
import Cellar, { type CellarItem } from "./Cellar";

export default function Collection({ items, locale }: { items: WineView[]; locale: string }) {
  const d = getDict(locale);
  const t = d.wine;

  const data: CellarItem[] = items.map((wine) => {
    const specs = [{ label: t.labels.alcohol, value: alcoholOf(wine).map((a) => formatAlcohol(locale, a)).join(" · ") }];
    return {
      slug: wine.slug,
      name: wine.name,
      vintage: wine.vintage,
      type: t.style,
      edition: wine.limited ? t.edition : undefined,
      grapes: wine.grapes,
      summary: wine.summary,
      notes: wine.notes,
      tint: wine.tint,
      specs,
      organic: wine.organic ? certificates.ecocert.code : undefined,
      biodynamic: wine.biodynamic,
      href: !wine.page ? undefined : `/${locale}/wines/${wine.slug}`,
      image: wine.image,
    };
  });

  return <Cellar items={data} label={d.winesSection.railLabel} discover={t.discover} soon={t.soon} notesTitle={t.vinification} />;
}
