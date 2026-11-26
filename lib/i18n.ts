import { locales, type Locale } from "./content";
import en, { type Dict } from "./dict/en";
import ro from "./dict/ro";
import fr from "./dict/fr";
import de from "./dict/de";
import ru from "./dict/ru";

const dicts: Record<Locale, Dict> = { ro, en, fr, de, ru };

export type { Dict };

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDict = (locale: string): Dict => (isLocale(locale) ? dicts[locale] : en);

export const alternates = (locale: string, path = "") => ({
  canonical: `/${locale}${path}`,
  languages: Object.fromEntries([...locales.map((l) => [l, `/${l}${path}`]), ["x-default", `/en${path}`]]),
});

export const formatNumber = (locale: string, value: number) =>
  new Intl.NumberFormat(locale)
    .formatToParts(value)
    .map((p) => (p.type === "group" ? " " : p.value))
    .join("");

export const formatLitres = (locale: string, litres: number) => `${new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(litres)} L`;

export const formatAlcohol = (locale: string, alcohol: number) =>
  `${new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }).format(alcohol / 100)} ${locale === "ru" ? "об." : "vol."}`;

export const formatDate = (locale: string, iso: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
