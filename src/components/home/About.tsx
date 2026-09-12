"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, AboutContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function About({
  locale,
  dict,
  about,
}: {
  locale: Locale;
  dict: Dict;
  about: AboutContent;
}) {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.sections.about}
          title={t(about.intro, locale)}
          description={
            <>
              <span className="block font-semibold text-enactus-black">{t(about.mission, locale)}</span>
              <span className="mt-3 block">{t(about.values, locale)}</span>
            </>
          }
        />

        <div className="mt-14 flex flex-wrap gap-3 sm:mt-16 sm:gap-4">
          {about.actionWords.map((word, i) => (
            <Reveal key={word} delay={i * 0.06}>
              <motion.span
                whileHover={{ scale: 1.06, backgroundColor: "#FFC72C", color: "#0A0A0A" }}
                transition={{ duration: 0.2 }}
                className="inline-block cursor-default rounded-full border-2 border-enactus-black px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-enactus-black sm:text-base"
              >
                {word}
              </motion.span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
