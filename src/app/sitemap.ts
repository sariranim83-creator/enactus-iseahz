import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { safeUrl } from "@/lib/utils";

const staticPaths = ["", "/events", "/gallery", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = safeUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://enactusiseahz.com").origin;

  return locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.6,
    }))
  );
}
