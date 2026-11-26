import { company, contact, social } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { LangLinks } from "./Header";
import { BiodyvinMark, EuLeaf, Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, YoutubeIcon } from "./Icons";

const icons = { Instagram: InstagramIcon, Facebook: FacebookIcon, YouTube: YoutubeIcon };

export default function Footer({ locale }: { locale: string }) {
  const link = (path: string) => `/${locale}${path}`;
  const t = getDict(locale);
  const f = t.footer;
  return (
    <footer className="footer" id="contact" data-tone="dark">
      <div className="footer__cols">
        <div className="footer__col footer__col--brand">
          <Logo className="footer__logo" />
          <p className="footer__tagline">{t.company.tagline}</p>
          <p>{t.company.about}</p>
          <div className="footer__legal-block">
            <p>
              <strong>{company.legal}</strong>
              <br />
              {company.idno}
            </p>
            <p>
              {t.company.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <a href={`tel:${contact.phoneHref}`}>
            <PhoneIcon className="ico" />
            {f.phone}: {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`}>
            <MailIcon className="ico" />
            {contact.email}
          </a>
        </div>

        <div className="footer__col">
          <h4>{f.useful}</h4>
          <a href={link("/our-story")}>{f.about}</a>
          <a href={link("/certifications")}>{f.certifications}</a>
          <a href={link("/news")}>{f.news}</a>
          <a href={link("/privacy-policy")}>{f.privacy}</a>
          <a href={link("/cookie-policy")}>{f.cookies}</a>
        </div>

        <div className="footer__col">
          <h4>{f.social}</h4>
          <div className="footer__social">
            {social.map((s) => {
              const Icon = icons[s.label as keyof typeof icons];
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon className="ico" />
                </a>
              );
            })}
          </div>
          <LangLinks locale={locale} label={t.ui.language} className="langs langs--footer" />
          <div className="footer__certs">
            <h4>{t.wine.page.certification}</h4>
            <div className="footer__cert">
              <EuLeaf className="footer__leaf" />
              <span>
                {f.certs[0][0]}
                <b>{f.certs[0][1].replace(/-/g, "\u2011")}</b>
              </span>
            </div>
            <div className="footer__cert">
              <BiodyvinMark className="footer__bdv" />
              <span>
                {f.certs[1][0]}
                <b>{f.certs[1][1]}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>{f.copyright} {new Date().getFullYear()}</span>
        <span className="footer__legal">
          <a href={link("/legal-information")}>{f.legal}</a>
          <a href={link("/cookie-policy")} data-cookie-settings>
            {f.cookieSettings}
          </a>
        </span>
      </div>

      <div className="footer__giant" aria-hidden="true">
        Ofranda
      </div>
    </footer>
  );
}
