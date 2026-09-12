import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getSiteContent } from "@/lib/content/getContent";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/types/content";

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const content = await getSiteContent();
  const isFr = locale === "fr";

  return (
    <div className="bg-white pb-24 pt-32 sm:pt-36">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-enactus-black sm:text-4xl">
          {isFr ? "Politique de confidentialité" : "Privacy Policy"}
        </h1>
        <p className="mt-6 leading-relaxed text-enactus-gray-600">
          {isFr
            ? `${content.general.clubName} respecte votre vie privée. Ce site ne collecte pas de données personnelles au-delà de ce qui est nécessaire pour répondre à vos demandes envoyées par e-mail. Une politique de confidentialité complète sera publiée ici prochainement.`
            : `${content.general.clubName} respects your privacy. This site does not collect personal data beyond what is needed to respond to enquiries sent by email. A full privacy policy will be published here soon.`}
        </p>
        <p className="mt-4 leading-relaxed text-enactus-gray-600">
          {isFr ? "Pour toute question, contactez-nous à" : "For any questions, contact us at"}{" "}
          <a className="font-semibold text-enactus-black underline" href={`mailto:${content.contact.email}`}>
            {content.contact.email}
          </a>
          .
        </p>
      </Container>
    </div>
  );
}
