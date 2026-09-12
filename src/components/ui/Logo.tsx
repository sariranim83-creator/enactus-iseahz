import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/content";

/**
 * Official Enactus ISEAHZ logo slot. Purely presentational (safe in both
 * Server and Client Components) — the actual file lookup happens once,
 * server-side, in src/lib/content/resolveLogo.ts.
 *
 * The real logo file is never generated or redrawn here. Until a resolved
 * `logoUrl` is available, this renders a plain text wordmark so the site
 * still looks intentional rather than broken. Do NOT replace the source
 * asset with a generated/AI logo — only ever swap in the real, official file.
 */
export function Logo({
  locale,
  logoUrl,
  variant = "auto",
  className = "",
}: {
  locale: Locale;
  logoUrl?: string | null;
  variant?: "auto" | "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="Enactus ISEAHZ — home"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {logoUrl ? (
        // The source file carries its own black background (the official
        // asset, untouched) — a small rounded black mat keeps it legible
        // when the navbar/footer turns white, without cropping or recoloring it.
        <span
          className={`inline-flex items-center justify-center rounded-lg p-1 ${
            variant === "dark" ? "bg-enactus-black" : ""
          }`}
        >
          <Image
            src={logoUrl}
            alt="Enactus ISEAHZ"
            width={168}
            height={168}
            priority
            className="h-8 w-auto rounded sm:h-9"
          />
        </span>
      ) : (
        <span
          className={`font-display text-lg font-bold tracking-tight sm:text-xl ${
            variant === "dark" ? "text-enactus-black" : "text-white"
          }`}
        >
          ENACTUS<span className="text-enactus-yellow"> ISEAHZ</span>
        </span>
      )}
    </Link>
  );
}
