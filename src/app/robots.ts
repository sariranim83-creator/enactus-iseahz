import type { MetadataRoute } from "next";
import { safeUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = safeUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://enactusiseahz.tn").origin;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/admin", "/fr/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
