"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { t, cn, formatDate } from "@/lib/utils";
import type { Locale, GalleryPhoto, GalleryCategory } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

const CATEGORIES: GalleryCategory[] = ["events", "workshops", "team", "competition", "community", "campus"];

export function GalleryGrid({
  locale,
  dict,
  photos,
}: {
  locale: Locale;
  dict: Dict;
  photos: GalleryPhoto[];
}) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sorted = useMemo(() => [...photos].sort((a, b) => a.order - b.order), [photos]);
  const filtered = filter === "all" ? sorted : sorted.filter((p) => p.category === filter);
  const active = activeIndex !== null ? filtered[activeIndex] : null;

  function close() {
    setActiveIndex(null);
  }
  function next() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % filtered.length);
  }
  function prev() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length);
  }

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-enactus-gray-300 p-16 text-center">
        <p className="text-sm text-enactus-gray-500">{dict.gallery.empty}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "focus-ring rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
            filter === "all" ? "bg-enactus-black text-white" : "bg-enactus-gray-100 text-enactus-gray-600 hover:bg-enactus-gray-200"
          )}
        >
          {dict.gallery.all}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
              filter === cat ? "bg-enactus-black text-white" : "bg-enactus-gray-100 text-enactus-gray-600 hover:bg-enactus-gray-200"
            )}
          >
            {dict.gallery[cat]}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="focus-ring group relative block w-full overflow-hidden rounded-xl"
          >
            <Image
              src={photo.imageUrl}
              alt={t(photo.caption, locale)}
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, 25vw"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="focus-ring absolute right-5 top-5 text-3xl text-white/70 hover:text-white"
            >
              ×
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="focus-ring absolute left-3 top-1/2 -translate-y-1/2 text-3xl text-white/60 hover:text-white sm:left-6"
            >
              ‹
            </button>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-3xl"
            >
              <Image
                src={active.imageUrl}
                alt={t(active.caption, locale)}
                width={1200}
                height={1200}
                className="max-h-[75vh] w-auto rounded-lg object-contain"
              />
              <div className="mt-3 text-center text-white/80">
                <p className="text-sm">{t(active.caption, locale)}</p>
                {active.date && <p className="text-xs text-white/50">{formatDate(active.date, locale)}</p>}
              </div>
            </motion.div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-3xl text-white/60 hover:text-white sm:right-6"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
