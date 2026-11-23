"use client";

import { usePathname } from "next/navigation";

const text = {
  ro: { title: ["Pagina nu a fost", "găsită"], body: "Pagina pe care o cauți nu există sau a fost mutată.", back: "Înapoi la pagina principală" },
  en: { title: ["Page not", "found"], body: "The page you are looking for does not exist or has been moved.", back: "Back to the home page" },
  fr: { title: ["Page", "introuvable"], body: "La page que vous cherchez n’existe pas ou a été déplacée.", back: "Retour à l’accueil" },
  de: { title: ["Seite nicht", "gefunden"], body: "Die gesuchte Seite existiert nicht oder wurde verschoben.", back: "Zurück zur Startseite" },
  ru: { title: ["Страница", "не найдена"], body: "Страница, которую вы ищете, не существует или была перемещена.", back: "Вернуться на главную" },
};

export default function NotFound() {
  const code = (usePathname() || "").split("/")[1] as keyof typeof text;
  const locale = code in text ? code : "en";
  const t = text[locale];
  return (
    <section className="missing paper" data-tone="light">
      <p className="missing__code">404</p>
      <h1 className="title title--xl">
        {t.title[0]} <em>{t.title[1]}</em>
      </h1>
      <p className="body">{t.body}</p>
      <a href={`/${locale}`} className="link">
        {t.back}
      </a>
    </section>
  );
}
