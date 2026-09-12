"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { cn } from "@/lib/utils";
import type { Locale, GeneralSettings } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

const links = (locale: Locale, dict: Dict) => [
  { href: `/${locale}#about`, label: dict.nav.about },
  { href: `/${locale}#enactus`, label: dict.nav.enactus },
  { href: `/${locale}#impact`, label: dict.nav.impact },
  { href: `/${locale}#sdgs`, label: dict.nav.sdgs },
  { href: `/${locale}#team`, label: dict.nav.team },
  { href: `/${locale}/events`, label: dict.nav.events },
  { href: `/${locale}/gallery`, label: dict.nav.gallery },
];

export function Navbar({
  locale,
  dict,
  general,
}: {
  locale: Locale;
  dict: Dict;
  general: GeneralSettings;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        dark ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-8xl items-center justify-between px-5 py-3 sm:px-8">
        <Logo locale={locale} logoUrl={general.logoUrl} variant={dark ? "dark" : "light"} />

        <nav className="hidden items-center gap-7 lg:flex">
          {links(locale, dict).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring rounded text-sm font-semibold uppercase tracking-wide transition-colors",
                dark ? "text-enactus-black/80 hover:text-enactus-black" : "text-white/85 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} dark={!dark} />
          <Link
            href={`/${locale}#join`}
            className="focus-ring rounded-full bg-enactus-yellow px-5 py-2 text-sm font-bold text-enactus-black transition-transform hover:scale-105"
          >
            {dict.nav.join}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "focus-ring flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden",
            dark ? "text-enactus-black" : "text-white"
          )}
        >
          <span
            className={cn(
              "block h-0.5 w-5 bg-current transition-transform",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span className={cn("block h-0.5 w-5 bg-current transition-opacity", open && "opacity-0")} />
          <span
            className={cn(
              "block h-0.5 w-5 bg-current transition-transform",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {links(locale, dict).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-lg px-2 py-3 text-base font-semibold text-enactus-black"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3 px-2">
                <LanguageSwitcher locale={locale} />
                <Link
                  href={`/${locale}#join`}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-full bg-enactus-yellow px-5 py-2 text-sm font-bold text-enactus-black"
                >
                  {dict.nav.join}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
