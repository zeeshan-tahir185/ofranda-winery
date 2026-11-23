import { company, contact } from "./content";
import { getDict } from "./i18n";

export const legalSlugs = ["privacy-policy", "cookie-policy", "legal-information"] as const;
export type LegalSlug = (typeof legalSlugs)[number];

export type LegalDoc = {
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

export const getLegal = (locale: string, slug: LegalSlug): LegalDoc => {
  const t = getDict(locale);
  const doc = t.legal.docs[slug];
  const address = t.company.address.join(", ");
  const values: Record<string, string> = {
    controller: `${company.legal}, ${company.idno}, ${address}. Email: ${contact.email}, ${t.footer.phone}: ${contact.phone}.`,
    legal: company.legal,
    idno: company.idno,
    email: contact.email,
    phone: contact.phone,
  };
  return {
    title: doc.title,
    description: doc.description,
    updated: t.legal.updated,
    sections: doc.sections.map((s) => ({
      heading: s.heading,
      body: s.body.flatMap((p) => (p === "{address}" ? t.company.address : [p.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "")])),
    })),
  };
};
