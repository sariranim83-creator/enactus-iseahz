import type { Locale, LocalizedText } from "@/types/content";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Picks the right language out of a LocalizedText field. */
export function t(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}

export function formatDate(iso: string, locale: Locale) {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-TN" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
