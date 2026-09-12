import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/Button";
import type { Locale, EventItem } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function UpcomingEvent({
  locale,
  dict,
  events,
}: {
  locale: Locale;
  dict: Dict;
  events: EventItem[];
}) {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];

  return (
    <section id="events" className="scroll-mt-20 bg-enactus-gray-50 py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.sections.upNext} title={dict.nav.events} />
          <Link
            href={`/${locale}/events`}
            className="focus-ring rounded text-sm font-bold uppercase tracking-wide text-enactus-black underline decoration-enactus-yellow decoration-2 underline-offset-4"
          >
            {dict.cta.viewCalendar} →
          </Link>
        </div>

        <div className="mt-12">
          {featured ? (
            <Reveal>
              <div className="mx-auto max-w-2xl">
                <EventCard
                  event={featured}
                  locale={locale}
                  categoryLabel={dict.events.categories[featured.category]}
                  registerLabel={dict.events.registration}
                  large
                />
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-enactus-gray-300 bg-white p-12 text-center">
                <p className="text-sm text-enactus-gray-500">{dict.events.noUpcoming}</p>
                <div className="mt-5 flex justify-center">
                  <Button href={`/${locale}/events`} variant="outline">
                    {dict.cta.viewCalendar}
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
