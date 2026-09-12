import Image from "next/image";
import { formatDate, t } from "@/lib/utils";
import type { Locale, EventItem } from "@/types/content";

const categoryColors: Record<EventItem["category"], string> = {
  workshop: "bg-enactus-yellow text-enactus-black",
  competition: "bg-enactus-black text-white",
  community: "bg-enactus-gray-200 text-enactus-black",
  meeting: "bg-enactus-gray-200 text-enactus-black",
  other: "bg-enactus-gray-200 text-enactus-black",
};

export function EventCard({
  event,
  locale,
  categoryLabel,
  registerLabel,
  large = false,
}: {
  event: EventItem;
  locale: Locale;
  categoryLabel: string;
  registerLabel: string;
  large?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-enactus-gray-200 bg-white">
      <div className={`relative ${large ? "aspect-[16/9]" : "aspect-[4/3]"} bg-enactus-gray-100`}>
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={t(event.title, locale)}
            fill
            sizes={large ? "100vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-3xl font-extrabold text-enactus-gray-300">
              {t(event.title, locale).slice(0, 1)}
            </span>
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${categoryColors[event.category]}`}
        >
          {categoryLabel}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-enactus-yellow-dark">
          {formatDate(event.date, locale)}
          {event.time ? ` · ${event.time}` : ""}
        </p>
        <h3 className={`mt-2 font-display font-bold text-enactus-black ${large ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          {t(event.title, locale)}
        </h3>
        {event.location && <p className="mt-1 text-sm text-enactus-gray-500">{event.location}</p>}
        <p className="mt-3 text-sm leading-relaxed text-enactus-gray-600">{t(event.description, locale)}</p>
        {event.registrationUrl && event.status === "upcoming" && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-4 inline-flex items-center gap-1.5 rounded-full bg-enactus-black px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            {registerLabel}
          </a>
        )}
      </div>
    </article>
  );
}
