import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SocialIcons } from "@/components/ui/SocialIcons";
import type { SocialLinks, ContactContent, Locale } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function Contact({
  locale,
  dict,
  contact,
  social,
}: {
  locale: Locale;
  dict: Dict;
  contact: ContactContent;
  social: SocialLinks;
}) {
  return (
    <section className="bg-enactus-gray-50 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-enactus-yellow-dark">
              {dict.sections.contact}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-enactus-black sm:text-4xl md:text-5xl">
              {locale === "fr" ? "Créons un impact ensemble." : "Let's create impact together."}
            </h2>
            <p className="mt-5 max-w-md text-balance leading-relaxed text-enactus-gray-600">
              {locale === "fr"
                ? "Pour toute demande professionnelle, partenariat ou future collaboration, contactez Enactus ISEAHZ."
                : "For professional enquiries, partnerships and future collaboration opportunities, contact Enactus ISEAHZ."}
            </p>
            <div className="mt-8">
              <Button href={`mailto:${contact.email}`}>{contact.email}</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-enactus-gray-200 bg-white p-8">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="font-bold uppercase tracking-wide text-enactus-gray-400">Email</dt>
                  <dd className="mt-1 text-enactus-black">{contact.email}</dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-wide text-enactus-gray-400">
                    {locale === "fr" ? "Emplacement" : "Location"}
                  </dt>
                  <dd className="mt-1 text-enactus-black">{contact.location}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-enactus-gray-100 pt-6">
                <SocialIcons social={social} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
