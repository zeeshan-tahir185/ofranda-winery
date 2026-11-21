import { contact, locales, social } from "@/lib/content";
import { Wordmark } from "./Header";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, YoutubeIcon } from "./Icons";

const icons = { Instagram: InstagramIcon, Facebook: FacebookIcon, YouTube: YoutubeIcon };

export default function Footer() {
  return (
    <footer className="footer" id="contact" data-tone="dark">
      <div className="footer__top" data-reveal>
        <p className="footer__line">
          Where the land is alive, <em>the wine is authentic.</em>
        </p>
      </div>

      <div className="footer__cols">
        <div className="footer__col footer__col--brand">
          <Wordmark className="wordmark--footer" />
          <p>
            A certified organic winery on the path to biodynamics. A place, a philosophy and a different
            understanding of wine.
          </p>
          <p className="footer__place">{contact.location}</p>
          <a href={`mailto:${contact.email}`}>
            <MailIcon className="ico" />
            {contact.email}
          </a>
          <a href={`tel:${contact.phoneHref}`}>
            <PhoneIcon className="ico" />
            {contact.phone}
          </a>
        </div>

        <div className="footer__col">
          <h4>Useful links</h4>
          <a href="#people">About us</a>
          <a href="#certified">Our certifications</a>
          <a href="#top">Privacy policy</a>
          <a href="#top">Cookie policy</a>
        </div>

        <div className="footer__col">
          <h4>We are social</h4>
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
          <div className="langs langs--footer">
            {locales.map((l) => (
              <a key={l} href={`/${l}`} className={l === "en" ? "is-active" : undefined}>
                {l.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>Copyright © Ofranda. All rights reserved {new Date().getFullYear()}</span>
        <span className="footer__legal">
          <a href="#top">Legal information</a>
          <a href="#top" data-cookie-settings>
            Cookie settings
          </a>
        </span>
      </div>

      <div className="footer__giant" aria-hidden="true">
        Ofranda
      </div>
    </footer>
  );
}
