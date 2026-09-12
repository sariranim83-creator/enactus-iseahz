"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { t } from "@/lib/utils";
import type { Locale, StatItem } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

function StatGroup({
  title,
  stats,
  locale,
  note,
}: {
  title: string;
  stats: StatItem[];
  locale: Locale;
  note?: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-enactus-yellow">{title}</p>
      <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.id} delay={i * 0.08}>
            <div>
              <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                <Counter value={stat.value} />
              </p>
              <p className="mt-1.5 text-sm text-white/60">{t(stat.label, locale)}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {note && <p className="mt-5 max-w-md text-xs leading-relaxed text-white/40">{note}</p>}
    </div>
  );
}

export function Stats({
  locale,
  dict,
  stats,
}: {
  locale: Locale;
  dict: Dict;
  stats: StatItem[];
}) {
  const club = stats.filter((s) => s.category === "club" && s.visible).sort((a, b) => a.order - b.order);
  const network = stats
    .filter((s) => s.category === "network" && s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="impact" className="scroll-mt-20 bg-enactus-black py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          {club.length > 0 && <StatGroup title={dict.sections.statsClub} stats={club} locale={locale} />}
          {network.length > 0 && (
            <StatGroup
              title={dict.sections.statsNetwork}
              stats={network}
              locale={locale}
              note={dict.stats.networkNote}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
