import { getWines } from "@/lib/data";
import Collection from "./Collection";

export default async function Wines({ locale }: { locale: string }) {
  const items = await getWines(locale);
  return (
    <section className="wines" id="wines" data-tone="dark">
      <Collection items={items} locale={locale} />
    </section>
  );
}
