import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, GalleryPhoto } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

export function GalleryPreview({
  locale,
  dict,
  photos,
}: {
  locale: Locale;
  dict: Dict;
  photos: GalleryPhoto[];
}) {
  const preview = [...photos].sort((a, b) => a.order - b.order).slice(0, 6);

  return (
    <section id="gallery" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.nav.gallery} title={dict.sections.gallery} />
          <Link
            href={`/${locale}/gallery`}
            className="focus-ring rounded text-sm font-bold uppercase tracking-wide text-enactus-black underline decoration-enactus-yellow decoration-2 underline-offset-4"
          >
            {dict.cta.viewGallery} →
          </Link>
        </div>

        <div className="mt-12">
          {preview.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {preview.map((photo, i) => (
                <Reveal key={photo.id} delay={(i % 6) * 0.06}>
                  <Link
                    href={`/${locale}/gallery`}
                    className="focus-ring group relative block aspect-square overflow-hidden rounded-xl"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={t(photo.caption, locale)}
                      fill
                      sizes="(max-width: 640px) 33vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-enactus-gray-300 p-12 text-center">
              <p className="text-sm text-enactus-gray-500">{dict.gallery.empty}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
