import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSiteContent } from "@/lib/content/getContent";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import type { Locale } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return { title: dict.sections.gallery };
}

export default async function GalleryPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const content = await getSiteContent();

  return (
    <div className="bg-white pb-24 pt-32 sm:pt-36">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-enactus-yellow-dark">
          {dict.nav.gallery}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-enactus-black sm:text-5xl">
          {dict.sections.gallery}
        </h1>

        <div className="mt-12">
          <GalleryGrid locale={locale} dict={dict} photos={content.gallery} />
        </div>
      </Container>
    </div>
  );
}
