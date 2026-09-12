"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { t } from "@/lib/utils";
import type { Locale, GeneralSettings, CompetitionPhoto } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

const STORAGE_KEY = "enactus-iseahz-intro-seen";

const STEP_DURATIONS = [2200, 2000, 1700, 1900, 2600]; // ms per step, auto-advance

export function IntroSequence({
  locale,
  dict,
  general,
  competitionPhotos,
}: {
  locale: Locale;
  dict: Dict;
  general: GeneralSettings;
  competitionPhotos: CompetitionPhoto[];
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  const featuredPhoto = useMemo(() => competitionPhotos[0], [competitionPhotos]);
  const totalSteps = 5;

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduceMotion) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    if (step >= totalSteps - 1) {
      const finalTimer = setTimeout(finish, STEP_DURATIONS[step]);
      return () => clearTimeout(finalTimer);
    }
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_DURATIONS[step]);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, step]);

  function finish() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore (private browsing etc.)
    }
    setVisible(false);
  }

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Intro"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-enactus-black text-white"
    >
      <button
        type="button"
        onClick={finish}
        className="focus-ring absolute right-5 top-5 z-10 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-enactus-yellow hover:text-enactus-yellow sm:right-8 sm:top-8"
      >
        {dict.intro.skip} →
      </button>

      {/* ambient geometric yellow shapes, inspired by the logo's folded triangle */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, rotate: -25, scale: 0.6, x: -40 }}
        animate={{ opacity: 0.9, rotate: 0, scale: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -left-16 top-1/4 h-56 w-56 sm:h-72 sm:w-72"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="10,10 90,50 10,50" fill="#FFC72C" />
          <polygon points="10,50 50,50 10,90" fill="#E6AD00" />
        </svg>
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, rotate: 25, scale: 0.6, x: 40 }}
        animate={{ opacity: 0.5, rotate: 0, scale: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 sm:h-80 sm:w-80"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="90,10 90,90 10,50" fill="#FFC72C" />
        </svg>
      </motion.div>

      <div className="relative z-[1] flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
                {general.clubName.toUpperCase()}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-balance text-sm text-white/60 sm:text-base">
                {t(general.institutionName, locale)}
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                {dict.intro.statement1}
                <br />
                <span className="text-enactus-yellow">{dict.intro.statement2}</span>
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display text-3xl font-extrabold tracking-[0.02em] sm:text-6xl">
                {dict.intro.statement3}
              </p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              {featuredPhoto ? (
                <>
                  <Image
                    src={featuredPhoto.imageUrl}
                    alt={t(featuredPhoto.caption, locale)}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-enactus-black via-enactus-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 bg-enactus-yellow/95 px-5 py-3 text-left">
                    <p className="text-xs font-bold uppercase tracking-wide text-enactus-black">
                      {featuredPhoto.eventName}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-white/15 bg-enactus-off-black">
                  <p className="font-display text-2xl font-bold text-enactus-yellow sm:text-3xl">
                    {dict.sections.competition}
                  </p>
                  <p className="max-w-sm text-balance text-sm text-white/50">
                    {locale === "fr"
                      ? "Nos photos de compétition arriveront bientôt ici."
                      : "Our competition photos will land here soon."}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-enactus-yellow">
                {dict.intro.ambitionEyebrow}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-balance font-display text-2xl font-semibold leading-snug sm:text-4xl">
                {dict.intro.ambitionLine}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === step ? "w-8 bg-enactus-yellow" : "w-3 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
