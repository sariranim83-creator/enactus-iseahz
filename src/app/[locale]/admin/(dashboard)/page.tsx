import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Locale } from "@/types/content";
import { isLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

const cards = [
  { slug: "general", en: "General Settings", fr: "Paramètres généraux", desc: { en: "Club name, institution, logo, favicon.", fr: "Nom du club, institution, logo, favicon." } },
  { slug: "hero", en: "Hero", fr: "Accueil", desc: { en: "Homepage headline and CTAs.", fr: "Titre principal et boutons d'action." } },
  { slug: "vision", en: "Vision & Ambition", fr: "Vision & Ambition", desc: { en: "Annual vision and ambition statement.", fr: "Vision annuelle et ambition." } },
  { slug: "about", en: "About & Culture", fr: "À propos & Culture", desc: { en: "Mission, values, why join, club culture.", fr: "Mission, valeurs, pourquoi rejoindre, culture." } },
  { slug: "enactus", en: "What is Enactus", fr: "Qu'est-ce qu'Enactus", desc: { en: "E-A-US explainer.", fr: "Explication E-A-US." } },
  { slug: "stats", en: "Statistics", fr: "Statistiques", desc: { en: "Club and network numbers.", fr: "Chiffres du club et du réseau." } },
  { slug: "sdgs", en: "SDGs", fr: "ODD", desc: { en: "Sustainability focus cards.", fr: "Cartes de durabilité." } },
  { slug: "team", en: "Team", fr: "Équipe", desc: { en: "Team members.", fr: "Membres de l'équipe." } },
  { slug: "events", en: "Events & Calendar", fr: "Événements & Calendrier", desc: { en: "Upcoming and past events.", fr: "Événements à venir et passés." } },
  { slug: "gallery", en: "Gallery", fr: "Galerie", desc: { en: "Photo gallery.", fr: "Galerie photo." } },
  { slug: "competition", en: "Competition", fr: "Compétition", desc: { en: "Competition text and photos.", fr: "Texte et photos de compétition." } },
  { slug: "partners", en: "Partners", fr: "Partenaires", desc: { en: "Sponsors and partners.", fr: "Sponsors et partenaires." } },
  { slug: "social", en: "Social Media", fr: "Réseaux sociaux", desc: { en: "Instagram, Facebook, TikTok.", fr: "Instagram, Facebook, TikTok." } },
  { slug: "contact", en: "Contact", fr: "Contact", desc: { en: "Professional email and location.", fr: "E-mail professionnel et emplacement." } },
  { slug: "seo", en: "SEO", fr: "SEO", desc: { en: "Page title, meta description, social image.", fr: "Titre de page, meta description, image sociale." } },
];

export default function AdminDashboardPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-enactus-black">
        {locale === "fr" ? "Tableau de bord" : "Dashboard"}
      </h1>
      <p className="mt-1 text-sm text-enactus-gray-500">
        {locale === "fr"
          ? "Modifiez le contenu du site Enactus ISEAHZ. Chaque section peut être éditée en anglais et en français."
          : "Edit the Enactus ISEAHZ site content. Every section can be edited in English and French."}
      </p>

      {!isSupabaseConfigured && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          {locale === "fr"
            ? "Supabase n'est pas encore connecté — les modifications ne peuvent pas être enregistrées tant que les identifiants ne sont pas ajoutés à .env.local."
            : "Supabase isn't connected yet — changes can't be saved until credentials are added to .env.local."}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.slug}
            href={`/${locale}/admin/${card.slug}`}
            className="focus-ring rounded-2xl border border-enactus-gray-200 bg-white p-5 transition-colors hover:border-enactus-yellow"
          >
            <h2 className="font-bold text-enactus-black">{locale === "fr" ? card.fr : card.en}</h2>
            <p className="mt-1.5 text-sm text-enactus-gray-500">
              {locale === "fr" ? card.desc.fr : card.desc.en}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
