import { cache } from "react";
import { news, wines, type NewsCategory, type Wine, type WineFormat } from "./content";
import { getDict, isLocale } from "./i18n";

export type Pair = [string, string];

export type WinePage = {
  summary: string;
  vintageNote: string;
  character: { profile: string[]; body: string; segment: string };
  vinification: Pair[];
  terroir: Pair[];
  serving: Pair[];
  pairing: string[];
  ingredients: string;
  so2: Pair;
  nutrition: Pair[];
  analytics: Pair[];
  ageing?: [number, number];
};

export type WineLabel = {
  ean: string;
  ingredients: string;
  allergens: string;
  nutrition: Pair[];
  recycling: { code: string; material: string }[];
  extra: string;
};

export type WineView = Wine & { summary?: string; notes: string[]; page?: WinePage; label?: WineLabel };

export type PostView = { slug: string; category: NewsCategory; iso: string; image: string; title: string; text: string; body: string[] };

const useCms = Boolean(process.env.DATABASE_URL);

const cms = cache(async () => {
  const [{ getPayload }, { default: config }] = await Promise.all([import("payload"), import("@payload-config")]);
  return getPayload({ config });
});

const staticWines = (locale: string): WineView[] => {
  const d = getDict(locale);
  return wines.map((w) => {
    const banner = d.wineText[w.slug as keyof typeof d.wineText];
    const page = d.winePage[w.slug as keyof typeof d.winePage];
    return {
      ...w,
      summary: banner?.summary,
      notes: banner?.notes ?? [],
      page: page && !w.soon
        ? {
            summary: page.summary,
            vintageNote: page.vintageNote,
            character: page.character,
            vinification: page.vinification as Pair[],
            terroir: page.terroir as Pair[],
            serving: page.serving as Pair[],
            pairing: page.pairing,
            ingredients: page.ingredients,
            so2: page.so2 as Pair,
            nutrition: page.nutrition as Pair[],
            analytics: page.analytics as Pair[],
          }
        : undefined,
    };
  });
};

type Row = { label?: string | null; value?: string | null };
type Line = { text?: string | null };
type Media = { url?: string | null } | number | null | undefined;

const toPairs = (rows?: Row[] | null): Pair[] => (rows ?? []).map((r) => [r.label ?? "", r.value ?? ""]);
const toLines = (rows?: Line[] | null) => (rows ?? []).map((r) => r.text ?? "").filter(Boolean);
const mediaUrl = (m: Media) => (m && typeof m === "object" && m.url ? m.url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/)/, "") : "");

type CmsWine = {
  slug: string;
  name: string;
  vintage: string;
  grapes: string;
  image: Media;
  tint?: string | null;
  organic?: boolean | null;
  biodynamic?: boolean | null;
  limited?: boolean | null;
  pageLive?: boolean | null;
  formats?: { litres: number; alcohol: number; bottles: number; lot: string }[] | null;
  bottled?: string | null;
  body?: string | null;
  ageingFrom?: number | null;
  ageingTo?: number | null;
  summary?: string | null;
  notes?: Line[] | null;
  pageSummary?: string | null;
  vintageNote?: string | null;
  segment?: string | null;
  bodyLabel?: string | null;
  profile?: Line[] | null;
  vinification?: Row[] | null;
  terroir?: Row[] | null;
  serving?: Row[] | null;
  pairing?: Line[] | null;
  ingredients?: string | null;
  so2Label?: string | null;
  so2Value?: string | null;
  nutrition?: Row[] | null;
  analytics?: Row[] | null;
  labelLive?: boolean | null;
  ean?: string | null;
  labelIngredients?: string | null;
  labelAllergens?: string | null;
  recycling?: { code?: string | null; material?: string | null }[] | null;
  labelExtra?: string | null;
};

const fromCms = (w: CmsWine): WineView => {
  const formats: WineFormat[] = (w.formats ?? []).map((f) => ({ litres: f.litres, alcohol: f.alcohol, bottles: f.bottles, lot: f.lot }));
  const live = Boolean(w.pageLive);
  return {
    slug: w.slug,
    name: w.name,
    vintage: w.vintage,
    grapes: w.grapes,
    organic: Boolean(w.organic),
    biodynamic: Boolean(w.biodynamic),
    limited: Boolean(w.limited),
    formats,
    image: mediaUrl(w.image),
    tint: w.tint || "#2a1719",
    bottled: w.bottled ? w.bottled.slice(0, 10) : undefined,
    body: w.body ? Number(w.body) : undefined,
    soon: !live,
    summary: w.summary ?? undefined,
    notes: toLines(w.notes),
    page: live
      ? {
          summary: w.pageSummary ?? w.summary ?? "",
          vintageNote: w.vintageNote ?? "",
          character: { profile: toLines(w.profile), body: w.bodyLabel ?? "", segment: w.segment ?? "" },
          vinification: toPairs(w.vinification),
          terroir: toPairs(w.terroir),
          serving: toPairs(w.serving),
          pairing: toLines(w.pairing),
          ingredients: w.ingredients ?? "",
          so2: [w.so2Label ?? "", w.so2Value ?? ""],
          nutrition: toPairs(w.nutrition),
          analytics: toPairs(w.analytics),
          ageing: w.ageingFrom && w.ageingTo ? [w.ageingFrom, w.ageingTo] : undefined,
        }
      : undefined,
    label: w.labelLive
      ? {
          ean: w.ean ?? "",
          ingredients: w.labelIngredients ?? "",
          allergens: w.labelAllergens ?? "",
          nutrition: toPairs(w.nutrition),
          recycling: (w.recycling ?? []).map((r) => ({ code: r.code ?? "", material: r.material ?? "" })),
          extra: w.labelExtra ?? "",
        }
      : undefined,
  };
};

export const getWines = cache(async (locale: string): Promise<WineView[]> => {
  const lang = isLocale(locale) ? locale : "en";
  if (!useCms) return staticWines(lang);
  const payload = await cms();
  const res = await payload.find({ collection: "wines", locale: lang, sort: "order", depth: 1, limit: 100 });
  return (res.docs as unknown as CmsWine[]).map(fromCms);
});

export const getWine = async (locale: string, slug: string) => (await getWines(locale)).find((w) => w.slug === slug && w.page);

export const getLabel = async (locale: string, slug: string) => (await getWines(locale)).find((w) => w.slug === slug && w.label);

const staticPosts = (locale: string): PostView[] => {
  const posts = getDict(locale).news.posts;
  return news.map((n) => {
    const t = posts[n.slug as keyof typeof posts];
    return { ...n, title: t.title, text: t.text, body: t.body };
  });
};

type CmsPost = { slug: string; category: NewsCategory; date: string; image: Media; title: string; text: string; body?: Line[] | null };

export const getPosts = cache(async (locale: string): Promise<PostView[]> => {
  const lang = isLocale(locale) ? locale : "en";
  if (!useCms) return staticPosts(lang);
  const payload = await cms();
  const res = await payload.find({ collection: "posts", locale: lang, sort: "-date", depth: 1, limit: 200 });
  return (res.docs as unknown as CmsPost[]).map((p) => ({
    slug: p.slug,
    category: p.category,
    iso: p.date.slice(0, 10),
    image: mediaUrl(p.image),
    title: p.title,
    text: p.text,
    body: toLines(p.body),
  }));
});

export const getPostView = async (locale: string, slug: string) => (await getPosts(locale)).find((p) => p.slug === slug);
