"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t, cn } from "@/lib/utils";
import type { Locale, SdgItem } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

const SDG_COLORS: Record<number, string> = {
  4: "#C5192D",
  5: "#FF3A21",
  10: "#DD1367",
  16: "#00689D",
};

export function SDGSection({
  locale,
  dict,
  sdgs,
}: {
  locale: Locale;
  dict: Dict;
  sdgs: SdgItem[];
}) {
  const primary = sdgs.find((s) => s.slot === "primary");
  const supporting = sdgs.filter((s) => s.slot === "supporting").sort((a, b) => a.order - b.order);

  return (
    <section id="sdgs" className="scroll-mt-20 bg-enactus-gray-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.sections.sdg}
          title={
            locale === "fr"
              ? "Les enseignants sont aussi des porte-voix de la durabilité."
              : "Teachers are sustainability preachers."
          }
          description={
            locale === "fr"
              ? "En tant que futurs éducateurs, nous avons la responsabilité de devenir des porte-voix de la durabilité — en aidant les apprenants à comprendre non seulement ce qu'est un avenir durable, mais aussi comment y contribuer activement."
              : "As future educators, we have a responsibility to become advocates for sustainability — helping learners understand not only what a sustainable future means, but how they can actively contribute to it."
          }
        />

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-[1.3fr_1fr]">
          {primary && (
            <Reveal>
              <div
                className="flex h-full flex-col justify-between rounded-2xl p-8 text-white sm:p-10"
                style={{ backgroundColor: SDG_COLORS[primary.number] ?? "#C5192D" }}
              >
                <div>
                  <span className="font-display text-6xl font-extrabold sm:text-7xl">
                    {primary.number}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{t(primary.name, locale)}</h3>
                  <p className="mt-4 max-w-md text-balance leading-relaxed text-white/85">
                    {t(primary.description, locale)}
                  </p>
                </div>
                <p className="mt-8 max-w-md text-balance border-t border-white/25 pt-6 text-sm leading-relaxed text-white/90">
                  {t(primary.whyItMatters, locale)}
                </p>
              </div>
            </Reveal>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((sdg, i) => (
              <Reveal key={sdg.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={cn(
                    "flex h-full flex-col justify-between rounded-2xl border border-enactus-gray-200 bg-white p-6"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-lg font-extrabold text-white"
                        style={{ backgroundColor: SDG_COLORS[sdg.number] ?? "#333" }}
                      >
                        {sdg.number}
                      </span>
                      <h3 className="text-base font-bold text-enactus-black">{t(sdg.name, locale)}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-enactus-gray-600">
                      {t(sdg.description, locale)}
                    </p>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-enactus-gray-500">
                    {t(sdg.whyItMatters, locale)}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
