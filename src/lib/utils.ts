import type { Locale, LocalizedText } from "@/types/content";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Picks the right language out of a LocalizedText field. */
export function t(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}

/** Parses a URL from an env var, falling back safely if it's unset or malformed (never throws). */
export function safeUrl(value: string | undefined, fallback: string): URL {
  try {
    return new URL(value || fallback);
  } catch {
    return new URL(fallback);
  }
}

export function formatDate(iso: string, locale: Locale) {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-TN" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
