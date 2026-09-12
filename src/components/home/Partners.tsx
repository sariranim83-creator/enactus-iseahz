import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { Locale, Partner, ContactContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

const VALUE_POINTS_EN = [
  "Student development",
  "Entrepreneurship",
  "Sustainability education",
  "Communication skills",
  "Community engagement",
  "Experiential learning",
  "Youth leadership",
];
const VALUE_POINTS_FR = [
  "Développement étudiant",
  "Entrepreneuriat",
  "Éducation à la durabilité",
  "Compétences en communication",
  "Engagement communautaire",
  "Apprentissage par l'action",
  "Leadership des jeunes",
];

export function Partners({
  locale,
  dict,
  partners,
  contact,
}: {
  locale: Locale;
  dict: Dict;
  partners: Partner[];
  contact: ContactContent;
}) {
  const active = partners.filter((p) => p.active);
  const points = locale === "fr" ? VALUE_POINTS_FR : VALUE_POINTS_EN;

  return (
    <section id="partners" className="scroll-mt-20 bg-enactus-black py-24 text-white sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.sections.sponsor}
          title={locale === "fr" ? "Devenez partenaire de la prochaine génération de leaders." : "Partner with the next generation of leaders."}
          description={
            locale === "fr"
              ? "Un partenariat avec Enactus ISEAHZ soutient concrètement le développement étudiant, l'entrepreneuriat, l'éducation à la durabilité, la communication, l'engagement communautaire et le leadership des jeunes."
              : "Collaborating with Enactus ISEAHZ supports student development, entrepreneurship, sustainability education, communication skills, community engagement, experiential learning and youth leadership."
          }
          dark
        />

        <div className="mt-8 flex flex-wrap gap-2.5">
          {points.map((point) => (
            <span
              key={point}
              className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70"
            >
              {point}
            </span>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 sm:mt-16">
            {active.length > 0 ? (
              <div className="flex flex-wrap items-center gap-10">
                {active.map((partner) => (
                  <a
                    key={partner.id}
                    href={partner.website ?? undefined}
                    target={partner.website ? "_blank" : undefined}
                    rel={partner.website ? "noopener noreferrer" : undefined}
                    className="focus-ring opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                  >
                    <Image
                      src={partner.logoUrl}
                      alt={partner.organizationName}
                      width={140}
                      height={60}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-enactus-yellow">
                  {dict.partners.opportunities}
                </p>
                <p className="mt-3 max-w-md text-balance text-white/70">
                  {locale === "fr"
                    ? "Votre organisation pourrait faire partie de ce qui arrive."
                    : "Your organization could be part of what comes next."}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-12">
          <Button href={`mailto:${contact.email}`} variant="primary">
            {dict.cta.startConversation}
          </Button>
        </div>
      </Container>
    </section>
  );
}
