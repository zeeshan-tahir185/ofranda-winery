import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";
import { locales, news, wines } from "../lib/content";
import { getDict } from "../lib/i18n";

const root = process.cwd();
const payload = await getPayload({ config });

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
if (adminEmail && adminPassword) {
  const users = await payload.find({ collection: "users", where: { email: { equals: adminEmail } }, limit: 1 });
  if (!users.docs[0]) {
    await payload.create({ collection: "users", data: { email: adminEmail, password: adminPassword, name: "Ofranda" } });
    payload.logger.info(`user ${adminEmail}`);
  }
}

const pairs = (rows?: string[][]) => (rows ?? []).map(([label, value]) => ({ label, value }));
const lines = (rows?: string[]) => (rows ?? []).map((text) => ({ text }));

const upload = async (publicPath: string, alt: string) => {
  const filename = path.basename(publicPath);
  const found = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
  if (found.docs[0]) return found.docs[0].id;
  const doc = await payload.create({ collection: "media", data: { alt }, filePath: path.join(root, "public", publicPath) });
  return doc.id;
};

const wineText = (locale: string, slug: string) => {
  const d = getDict(locale);
  const banner = d.wineText[slug as keyof typeof d.wineText];
  const page = d.winePage[slug as keyof typeof d.winePage];
  return {
    summary: banner?.summary,
    notes: lines(banner?.notes),
    ...(page
      ? {
          pageSummary: page.summary,
          vintageNote: page.vintageNote,
          style: page.character.style,
          segment: page.character.segment,
          bodyLabel: page.character.body,
          profile: lines(page.character.profile),
          vinification: pairs(page.vinification),
          terroir: pairs(page.terroir),
          characteristics: pairs(page.characteristics),
          certification: pairs(page.certification),
          serving: pairs(page.serving),
          pairing: lines(page.pairing),
          ingredients: page.ingredients,
          so2Label: page.so2[0],
          so2Value: page.so2[1],
          nutrition: pairs(page.nutrition),
          analytics: pairs(page.analytics),
          producer: lines(page.producer),
          bottling: pairs(page.bottling),
        }
      : {}),
  };
};

for (const [i, wine] of wines.entries()) {
  const exists = await payload.find({ collection: "wines", where: { slug: { equals: wine.slug } }, limit: 1 });
  if (exists.docs[0]) {
    payload.logger.info(`skip wine ${wine.slug}`);
    continue;
  }
  const image = await upload(wine.image, `${wine.name} ${wine.vintage}`);
  const doc = await payload.create({
    collection: "wines",
    locale: "en",
    data: {
      name: wine.name,
      slug: wine.slug,
      vintage: wine.vintage,
      grapes: wine.grapes,
      image,
      tint: wine.tint,
      order: i + 1,
      organic: wine.organic,
      limited: wine.limited,
      pageLive: !wine.soon,
      formats: wine.formats.map((f) => ({ litres: f.litres, alcohol: f.alcohol, bottles: f.bottles, lot: f.lot })),
      bottled: wine.bottled,
      body: wine.body ? (String(wine.body) as "1" | "2" | "3") : undefined,
      ...wineText("en", wine.slug),
    },
  });
  for (const locale of locales.filter((l) => l !== "en")) {
    await payload.update({ collection: "wines", id: doc.id, locale, data: wineText(locale, wine.slug) });
  }
  payload.logger.info(`wine ${wine.slug}`);
}

for (const post of news) {
  const exists = await payload.find({ collection: "posts", where: { slug: { equals: post.slug } }, limit: 1 });
  if (exists.docs[0]) continue;
  const en = getDict("en").news.posts[post.slug as keyof ReturnType<typeof getDict>["news"]["posts"]];
  const image = await upload(post.image, en.title);
  const doc = await payload.create({
    collection: "posts",
    locale: "en",
    data: { slug: post.slug, category: post.category, date: post.iso, image, title: en.title, text: en.text, body: lines(en.body) },
  });
  for (const locale of locales.filter((l) => l !== "en")) {
    const t = getDict(locale).news.posts[post.slug as keyof ReturnType<typeof getDict>["news"]["posts"]];
    await payload.update({ collection: "posts", id: doc.id, locale, data: { title: t.title, text: t.text, body: lines(t.body) } });
  }
  payload.logger.info(`post ${post.slug}`);
}

process.exit(0);
