import type { Locale } from "@/types/content";

export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
