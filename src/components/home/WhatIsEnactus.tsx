"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, EnactusExplainerContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function WhatIsEnactus({
  locale,
  dict,
  explainer,
}: {
  locale: Locale;
  dict: Dict;
  explainer: EnactusExplainerContent;
}) {
  const cards = [
    { letter: "E", word: "ENTREPRENEURIAL", text: explainer.entrepreneurial },
    { letter: "A", word: "ACTION", text: explainer.action },
    { letter: "US", word: "US", text: explainer.us },
  ];

  return (
    <section id="enactus" className="scroll-mt-20 bg-enactus-black py-24 text-white sm:py-32">
      <Container>
        <SectionHeading eyebrow="ENACTUS" title={dict.sections.whatIsEnactus} dark align="left" />

        <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.word} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8"
              >
                <span className="font-display text-5xl font-extrabold text-enactus-yellow">
                  {card.letter}
                </span>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                  {card.word}
                </h3>
                <p className="mt-4 text-balance leading-relaxed text-white/85">{t(card.text, locale)}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-14 rounded-2xl border border-enactus-yellow/30 bg-enactus-yellow/[0.06] p-8 sm:mt-16 sm:p-10">
            <p className="text-balance text-lg leading-relaxed text-white/90 sm:text-xl">
              {t(explainer.globalPurpose, locale)}
            </p>
            <a
              href={explainer.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-enactus-yellow hover:underline"
            >
              enactus.org ↗
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
