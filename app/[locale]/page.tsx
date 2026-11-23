import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Certifications from "@/components/Certifications";
import Wines from "@/components/Wines";
import People from "@/components/People";
import Land from "@/components/Land";
import News from "@/components/News";
import JsonLd from "@/components/JsonLd";
import { contact, site } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Winery",
          name: site.name,
          url: `${site.url}/${locale}`,
          logo: `${site.url}/icon.svg`,
          email: contact.email,
          telephone: contact.phoneHref,
          description: t.company.tagline,
          address: {
            "@type": "PostalAddress",
            streetAddress: "46 Dumbrăvii Str",
            addressLocality: "Stăuceni",
            addressRegion: "Chișinău",
            postalCode: "MD-4839",
            addressCountry: "MD",
          },
        }}
      />
      <Hero locale={locale} />
      <Philosophy locale={locale} />
      <Certifications locale={locale} />
      <Wines locale={locale} />
      <People locale={locale} />
      <Land locale={locale} />
      <News locale={locale} />
    </>
  );
}
