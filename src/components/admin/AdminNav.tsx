"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

const sections = [
  { slug: "", label: { en: "Dashboard", fr: "Tableau de bord" } },
  { slug: "general", label: { en: "General", fr: "Général" } },
  { slug: "hero", label: { en: "Hero", fr: "Accueil" } },
  { slug: "vision", label: { en: "Vision & Ambition", fr: "Vision & Ambition" } },
  { slug: "about", label: { en: "About & Culture", fr: "À propos & Culture" } },
  { slug: "enactus", label: { en: "What is Enactus", fr: "Qu'est-ce qu'Enactus" } },
  { slug: "stats", label: { en: "Statistics", fr: "Statistiques" } },
  { slug: "sdgs", label: { en: "SDGs", fr: "ODD" } },
  { slug: "team", label: { en: "Team", fr: "Équipe" } },
  { slug: "events", label: { en: "Events & Calendar", fr: "Événements & Calendrier" } },
  { slug: "gallery", label: { en: "Gallery", fr: "Galerie" } },
  { slug: "competition", label: { en: "Competition", fr: "Compétition" } },
  { slug: "partners", label: { en: "Partners", fr: "Partenaires" } },
  { slug: "social", label: { en: "Social Media", fr: "Réseaux sociaux" } },
  { slug: "contact", label: { en: "Contact", fr: "Contact" } },
  { slug: "seo", label: { en: "SEO", fr: "SEO" } },
];

export function AdminNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 px-3 pb-6">
      {sections.map((section) => {
        const href = `/${locale}/admin${section.slug ? `/${section.slug}` : ""}`;
        const active = pathname === href;
        return (
          <Link
            key={section.slug}
            href={href}
            className={cn(
              "focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-enactus-yellow text-enactus-black" : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {section.label[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
