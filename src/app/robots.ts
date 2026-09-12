import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enactusiseahz.tn";

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
