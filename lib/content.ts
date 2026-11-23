export const locales = ["ro", "en", "fr", "de", "ru"] as const;
export type Locale = (typeof locales)[number];

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ofranda-winery.vercel.app").replace(/\/$/, ""),
  name: "Ofranda Winery",
};

export const contact = {
  email: "ofranda@ofranda.com",
  phone: "+373 69 106 777",
  phoneHref: "+37369106777",
};

export const company = {
  legal: "GT STEFIRTA ROMAN",
  producer: "Crama OFRANDA, GT „Ștefirța Roman”",
  address: "Str. Dumbrăvii 46, Stăuceni, mun. Chișinău, MD-4839",
  idno: "IDNO: 1024600038923",
};

export type NavKey = "philosophy" | "certifications" | "wines" | "story" | "land" | "news";

export const nav: { left: { key: NavKey; href: string }[]; right: { key: NavKey; href: string }[] } = {
  left: [
    { key: "philosophy", href: "#philosophy" },
    { key: "certifications", href: "/certifications" },
    { key: "wines", href: "#wines" },
  ],
  right: [
    { key: "story", href: "/our-story" },
    { key: "land", href: "#land" },
    { key: "news", href: "/news" },
  ],
};

export const pillarArt = [
  { numeral: "I", art: "earth" },
  { numeral: "II", art: "cycles" },
  { numeral: "III", art: "terroir" },
] as const;

export const chapterArt = [
  { numeral: "I", art: "earth" },
  { numeral: "II", art: "cycles" },
] as const;

export const certificates = {
  ecocert: {
    code: "MD-BIO-154",
    link: "https://certificat.ecocert.com/company/18E60EAC-B05D-4F41-BD73-B86CE0BF7DB5",
  },
};

export type WineFormat = { litres: number; bottles: number; lot: string };

export type Wine = {
  slug: string;
  name: string;
  vintage: string;
  grapes: string;
  alcohol?: number;
  organic: boolean;
  limited: boolean;
  formats: WineFormat[];
  image: string;
  bottled?: string;
  soon: boolean;
};

export const wines: Wine[] = [
  {
    slug: "humma",
    name: "Humma",
    vintage: "2024",
    grapes: "Fetească Neagră · Cabernet Sauvignon · Rară Neagră",
    alcohol: 15.5,
    organic: true,
    limited: false,
    formats: [{ litres: 0.75, bottles: 4415, lot: "L007" }],
    image: "/media/humma-bottle.png",
    bottled: "2026-06-05",
    soon: false,
  },
  {
    slug: "rupt",
    name: "Rupt",
    vintage: "2023",
    grapes: "Fetească Neagră · Cabernet Sauvignon",
    organic: true,
    limited: false,
    formats: [{ litres: 0.75, bottles: 2663, lot: "L006" }],
    image: "/media/sample-bottle.png",
    soon: true,
  },
  {
    slug: "vinul-fara-nume",
    name: "Vinul fără nume",
    vintage: "2023",
    grapes: "Fetească Neagră · Cabernet Sauvignon · Rară Neagră",
    organic: false,
    limited: false,
    formats: [{ litres: 0.75, bottles: 13783, lot: "L005" }],
    image: "/media/sample-bottle.png",
    soon: true,
  },
  {
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    vintage: "2022",
    grapes: "Cabernet Sauvignon",
    organic: false,
    limited: true,
    formats: [
      { litres: 0.75, bottles: 600, lot: "L004" },
      { litres: 1.5, bottles: 300, lot: "L003" },
    ],
    image: "/media/sample-bottle.png",
    soon: true,
  },
  {
    slug: "feteasca-neagra",
    name: "Fetească Neagră",
    vintage: "2022",
    grapes: "Fetească Neagră",
    organic: false,
    limited: true,
    formats: [
      { litres: 0.75, bottles: 600, lot: "L002" },
      { litres: 1.5, bottles: 300, lot: "L001" },
    ],
    image: "/media/sample-bottle.png",
    soon: true,
  },
];

export const getWine = (slug: string) => wines.find((w) => w.slug === slug && !w.soon);

export const timelinePhoto = "/media/harvest.jpg";

export const landGallery = ["/media/vineyard.jpg", "/media/clusters.jpg", "/media/aerial.jpg", "/media/land-rows.jpg"];

export type NewsCategory = "winery" | "certification" | "events" | "press";

export type Post = { slug: string; category: NewsCategory; iso: string; image: string };

export const newsCategories: ("all" | NewsCategory)[] = ["all", "winery", "certification", "events", "press"];

export const news: Post[] = [
  { slug: "harvest-2026-picked-by-hand", category: "winery", iso: "2026-10-14", image: "/media/basket.jpg" },
  { slug: "third-year-towards-biodyvin", category: "certification", iso: "2026-09-02", image: "/media/clusters.jpg" },
  { slug: "evening-tasting-among-the-vines", category: "events", iso: "2026-08-21", image: "/media/grapes-dark.jpg" },
  { slug: "ofranda-in-the-press", category: "press", iso: "2026-07-09", image: "/media/hands-grapes.jpg" },
];

export const getPost = (slug: string) => news.find((n) => n.slug === slug);

export const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
];
