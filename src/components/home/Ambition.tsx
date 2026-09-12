"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { t } from "@/lib/utils";
import type { Locale, VisionContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function Ambition({
  locale,
  dict,
  vision,
}: {
  locale: Locale;
  dict: Dict;
  vision: VisionContent;
}) {
  return (
    <section className="bg-enactus-yellow py-24 sm:py-32">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-enactus-black/60"
        >
          {dict.sections.ambition} — {vision.year}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 max-w-4xl text-balance font-display text-3xl font-extrabold leading-tight text-enactus-black sm:text-5xl md:text-6xl"
        >
          {t(vision.ambitionStatement, locale)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-enactus-black/80 sm:text-lg"
        >
          {t(vision.annualVision, locale)}
        </motion.p>
      </Container>
    </section>
  );
}
