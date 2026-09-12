"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, CultureContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function Culture({
  locale,
  dict,
  culture,
}: {
  locale: Locale;
  dict: Dict;
  culture: CultureContent;
}) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
          <SectionHeading
            eyebrow={dict.sections.culture}
            title={t(culture.headline, locale)}
            description={t(culture.description, locale)}
          />

          <div className="grid grid-cols-2 gap-4">
            {culture.ritualPlaceholders.map((ritual, i) => (
              <Reveal key={ritual.en} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-28 flex-col justify-between rounded-xl border border-dashed border-enactus-gray-300 bg-enactus-gray-50 p-4"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-enactus-yellow-dark">
                    {locale === "fr" ? "Bientôt" : "Coming soon"}
                  </span>
                  <span className="text-sm font-semibold text-enactus-black">{t(ritual, locale)}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
