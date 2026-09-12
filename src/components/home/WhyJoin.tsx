"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, WhyJoinItem } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function WhyJoin({
  locale,
  dict,
  items,
}: {
  locale: Locale;
  dict: Dict;
  items: WhyJoinItem[];
}) {
  return (
    <section className="bg-enactus-gray-50 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.sections.whyJoin} title={dict.sections.whyJoinHeadline} />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-enactus-gray-200 bg-enactus-gray-200 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {[...items]
            .sort((a, b) => a.order - b.order)
            .map((item, i) => (
              <Reveal key={item.number} delay={(i % 4) * 0.06}>
                <motion.div
                  whileHover={{ backgroundColor: "#0A0A0A" }}
                  transition={{ duration: 0.2 }}
                  className="group h-full bg-white p-7"
                >
                  <span className="font-display text-3xl font-extrabold text-enactus-yellow-dark transition-colors group-hover:text-enactus-yellow">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-enactus-black transition-colors group-hover:text-white">
                    {t(item.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-enactus-gray-600 transition-colors group-hover:text-white/70">
                    {t(item.description, locale)}
                  </p>
                </motion.div>
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}
