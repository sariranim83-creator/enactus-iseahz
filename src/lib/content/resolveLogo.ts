import "server-only";
import fs from "node:fs";
import path from "node:path";

const LOCAL_LOGO_CANDIDATES = ["logo.jpg", "logo.png", "logo.svg", "logo.webp"];

/**
 * Server-only lookup for the bundled official logo at public/brand/*.
 * Call this once in a Server Component (the locale layout) and pass the
 * result down as a plain prop — never import this from a Client Component.
 */
export function getLocalLogoUrl(): string | null {
  for (const filename of LOCAL_LOGO_CANDIDATES) {
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", "brand", filename))) {
        return `/brand/${filename}`;
      }
    } catch {
      // ignore
    }
  }
  return null;
}
