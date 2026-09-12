"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MemberCta } from "@/components/ui/MemberCta";
import { t } from "@/lib/utils";
import type { Locale, HeroContent, GeneralSettings } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function Hero({
  locale,
  dict,
  hero,
  general,
}: {
  locale: Locale;
  dict: Dict;
  hero: HeroContent;
  general: GeneralSettings;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-enactus-black text-white">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,199,44,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(255,199,44,0.12),transparent_50%)]" />
        <motion.svg
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 0.16, rotate: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          viewBox="0 0 100 100"
          className="absolute -right-10 top-1/4 h-[60vw] max-h-[520px] w-[60vw] max-w-[520px] sm:top-10"
        >
          <polygon points="10,10 90,50 10,50" fill="#FFC72C" />
          <polygon points="10,50 50,50 10,90" fill="#FFC72C" />
        </motion.svg>
      </div>

      <Container className="relative z-[1] pt-28 sm:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-bold uppercase tracking-[0.3em] text-enactus-yellow"
        >
          {t(hero.subheadline, locale)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          {t(hero.headline, locale)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-7 max-w-xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {t(hero.description, locale)}
        </motion.p>

        <motion.div
          id="join"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44 }}
          className="mt-10 flex scroll-mt-28 flex-wrap items-center gap-4"
        >
          <Button href={`/${locale}#about`} variant="primary">
            {t(hero.primaryCtaLabel, locale)}
          </Button>
          <MemberCta
            recruitmentUrl={hero.recruitmentUrl}
            label={t(hero.secondaryCtaLabel, locale)}
            locale={locale}
            variant="ghost"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 pb-12 text-xs text-white/40"
        >
          {general.location}
        </motion.div>
      </Container>

      <Link
        href={`/${locale}#about`}
        aria-label="Scroll down"
        className="focus-ring absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:flex"
      >
        <span className="h-10 w-px animate-pulse bg-white/40" />
      </Link>
    </section>
  );
}
