import { wines } from "@/lib/content";
import Collection from "./Collection";

export default function Wines({ locale }: { locale: string }) {
  return (
    <section className="wines" id="wines" data-tone="dark">
      <Collection items={wines} locale={locale} />
    </section>
  );
}
