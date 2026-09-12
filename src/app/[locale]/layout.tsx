import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSiteContent } from "@/lib/content/getContent";
import { getLocalLogoUrl } from "@/lib/content/resolveLogo";
import { t, safeUrl } from "@/lib/utils";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Locale } from "@/types/content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const content = await getSiteContent();
  const siteUrl = safeUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://enactusiseahz.tn");
  const title = t(content.seo.pageTitle, locale);
  const description = t(content.seo.metaDescription, locale);

  return {
    metadataBase: siteUrl,
    title: {
      default: title,
      template: `%s | ${content.general.clubName}`,
    },
    description,
    keywords: [
      "Enactus ISEAHZ",
      "Enactus ISEAH Zaghouan",
      "Enactus Zaghouan",
      "Enactus Tunisia",
      "ISEAHZ",
      "student entrepreneurship Zaghouan",
      "student club Zaghouan",
      "social entrepreneurship Tunisia",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl.origin}/${locale}`,
      siteName: content.general.clubName,
      locale: locale === "fr" ? "fr_TN" : "en_US",
      type: "website",
      images: content.seo.socialImageUrl ? [{ url: content.seo.socialImageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: content.seo.socialImageUrl ? [content.seo.socialImageUrl] : [],
    },
    icons: content.general.faviconUrl
      ? { icon: content.general.faviconUrl }
      : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const rawContent = await getSiteContent();
  const content = {
    ...rawContent,
    general: {
      ...rawContent.general,
      logoUrl: rawContent.general.logoUrl ?? getLocalLogoUrl(),
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.general.clubName,
    alternateName: "Enactus ISEAH Zaghouan",
    url: safeUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://enactusiseahz.tn").origin,
    logo: content.general.logoUrl ?? undefined,
    description: t(content.general.siteDescription, locale),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zaghouan",
      addressCountry: "TN",
    },
    sameAs: [content.social.facebook, content.social.instagram, content.social.tiktok].filter(
      Boolean
    ),
  };

  return (
    <html lang={locale} className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link focus-ring">
          {dict.nav.skip}
        </a>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar locale={locale} dict={dict} general={content.general} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} dict={dict} content={content} />
      </body>
    </html>
  );
}
