import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getSiteContent } from "@/lib/content/getContent";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/types/content";

export default async function TermsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const content = await getSiteContent();
  const isFr = locale === "fr";

  return (
    <div className="bg-white pb-24 pt-32 sm:pt-36">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-enactus-black sm:text-4xl">
          {isFr ? "Conditions d'utilisation" : "Terms of Use"}
        </h1>
        <p className="mt-6 leading-relaxed text-enactus-gray-600">
          {isFr
            ? `Ce site est édité par ${content.general.clubName}, une communauté étudiante de l'ISEAHZ. Le contenu est fourni à titre informatif. Des conditions d'utilisation complètes seront publiées ici prochainement.`
            : `This site is published by ${content.general.clubName}, a student-led community at ISEAHZ. Content is provided for informational purposes. Full terms of use will be published here soon.`}
        </p>
      </Container>
    </div>
  );
}
