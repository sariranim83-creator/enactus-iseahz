"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, CompetitionContent, CompetitionPhoto } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function Competition({
  locale,
  dict,
  competition,
  photos,
}: {
  locale: Locale;
  dict: Dict;
  competition: CompetitionContent;
  photos: CompetitionPhoto[];
}) {
  return (
    <section className="bg-enactus-black py-24 text-white sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.sections.competition}
          title={t(competition.headline, locale)}
          description={t(competition.intro, locale)}
          dark
        />

        <Reveal delay={0.1}>
          <div className="mt-8 max-w-2xl rounded-2xl border border-enactus-yellow/30 bg-enactus-yellow/[0.06] p-6 sm:p-8">
            <p className="text-balance leading-relaxed text-white/90">
              {t(competition.ambitionStatement, locale)}
            </p>
            <a
              href={competition.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-enactus-yellow hover:underline"
            >
              enactus.org/competitions ↗
            </a>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16">
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, i) => (
                <Reveal key={photo.id} delay={(i % 8) * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={t(photo.caption, locale)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/0 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-xs font-semibold text-white">{photo.eventName}</p>
                      <p className="text-[11px] text-white/70">{t(photo.caption, locale)}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
              <p className="text-sm text-white/50">
                {locale === "fr"
                  ? "Les photos de notre parcours en compétition apparaîtront ici."
                  : "Photos from our competition journey will appear here."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
