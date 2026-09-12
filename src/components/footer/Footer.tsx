import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { t } from "@/lib/utils";
import type { Locale, SiteContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function Footer({
  locale,
  dict,
  content,
}: {
  locale: Locale;
  dict: Dict;
  content: SiteContent;
}) {
  return (
    <footer className="bg-enactus-black text-white">
      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo locale={locale} logoUrl={content.general.logoUrl} variant="light" />
            <p className="mt-5 max-w-sm font-display text-xl font-semibold text-balance">
              {t(content.hero.headline, locale)}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t(content.general.institutionName, locale)}
              <br />
              {content.general.location}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-enactus-yellow">
              {dict.sections.contact}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a className="focus-ring rounded hover:text-white" href={`mailto:${content.contact.email}`}>
                  {content.contact.email}
                </a>
              </li>
              <li>{content.contact.location}</li>
            </ul>
            <div className="mt-5">
              <SocialIcons social={content.social} dark />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-enactus-yellow">
              {dict.nav.about}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link className="focus-ring rounded hover:text-white" href={`/${locale}#about`}>
                  {dict.sections.about}
                </Link>
              </li>
              <li>
                <Link className="focus-ring rounded hover:text-white" href={`/${locale}/events`}>
                  {dict.sections.calendar}
                </Link>
              </li>
              <li>
                <Link className="focus-ring rounded hover:text-white" href={`/${locale}/gallery`}>
                  {dict.sections.gallery}
                </Link>
              </li>
              <li>
                <a
                  className="focus-ring rounded hover:text-white"
                  href="https://enactus.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.footer.global} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {content.general.clubName}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="focus-ring rounded text-xs text-white/50 hover:text-white">
              {dict.footer.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="focus-ring rounded text-xs text-white/50 hover:text-white">
              {dict.footer.terms}
            </Link>
            <LanguageSwitcher locale={locale} dark />
          </div>
        </div>
      </div>
    </footer>
  );
}
