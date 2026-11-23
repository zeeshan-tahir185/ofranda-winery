import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegal } from "@/lib/legal";
import { alternates } from "@/lib/i18n";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegal(locale, "privacy-policy");
  return { title: doc.title, description: doc.description, alternates: alternates(locale, "/privacy-policy") };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  return <LegalPage locale={locale} doc={getLegal(locale, "privacy-policy")} />;
}
