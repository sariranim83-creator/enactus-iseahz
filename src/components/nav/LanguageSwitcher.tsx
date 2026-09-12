"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  dark = false,
}: {
  locale: Locale;
  dark?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${next}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1 py-1 text-xs font-semibold",
        dark ? "border-white/25 text-white" : "border-enactus-black/15 text-enactus-black"
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={cn(
            "focus-ring rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            l === locale
              ? "bg-enactus-yellow text-enactus-black"
              : dark
                ? "text-white/70 hover:text-white"
                : "text-enactus-black/60 hover:text-enactus-black"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
