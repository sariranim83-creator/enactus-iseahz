import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSiteContent } from "@/lib/content/getContent";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/events/EventCard";
import type { Locale } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return { title: dict.sections.calendar };
}

export default async function EventsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const content = await getSiteContent();

  const upcoming = content.events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = content.events
    .filter((e) => e.status === "past")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-white pb-24 pt-32 sm:pt-36">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-enactus-yellow-dark">
          {dict.nav.events}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-enactus-black sm:text-5xl">
          {dict.sections.calendar}
        </h1>

        <section className="mt-14">
          <h2 className="text-sm font-bold uppercase tracking-widest text-enactus-black">
            {dict.events.upcoming}
          </h2>
          {upcoming.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  locale={locale}
                  categoryLabel={dict.events.categories[event.category]}
                  registerLabel={dict.events.registration}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-enactus-gray-500">{dict.events.empty}</p>
          )}
        </section>

        <section className="mt-20">
          <h2 className="text-sm font-bold uppercase tracking-widest text-enactus-black">
            {dict.events.past}
          </h2>
          {past.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <div key={event.id} className="opacity-80">
                  <EventCard
                    event={event}
                    locale={locale}
                    categoryLabel={dict.events.categories[event.category]}
                    registerLabel={dict.events.registration}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-enactus-gray-500">{dict.events.pastEmpty}</p>
          )}
        </section>
      </Container>
    </div>
  );
}
