import type { Locale } from "@/types/content";

/**
 * Static UI copy (navigation, labels, buttons) that isn't part of the
 * editable content model. Editable section copy lives in src/lib/content.
 * Keep French entries natural, not machine-translated.
 */
export const dictionaries = {
  en: {
    nav: {
      about: "About",
      enactus: "Enactus",
      impact: "Impact",
      sdgs: "SDGs",
      team: "Team",
      events: "Events",
      gallery: "Gallery",
      join: "Join Us",
      skip: "Skip to content",
    },
    intro: {
      skip: "Skip intro",
      ambitionEyebrow: "OUR AMBITION",
      ambitionLine:
        "We are building a team that learns together, grows together, competes with purpose, and creates impact that lasts.",
      statement1: "YOUNG LEADERS.",
      statement2: "SUSTAINABLE IMPACT.",
      statement3: "BUILD. LEAD. IMPACT.",
    },
    sections: {
      about: "About Enactus ISEAHZ",
      whatIsEnactus: "What is Enactus?",
      whyJoin: "Why Join Enactus ISEAHZ?",
      whyJoinHeadline: "More than a club. A place to grow.",
      culture: "Club Culture",
      statsClub: "Our Club",
      statsNetwork: "The Enactus Network",
      sdg: "Our Sustainability Focus",
      localImpact: "Local Impact",
      ambition: "Our Ambition",
      competition: "Competition",
      team: "Meet the Team",
      upNext: "Up Next",
      calendar: "Event Calendar",
      gallery: "Gallery",
      sponsor: "Partner With Us",
      contact: "Professional Contact",
      partners: "Our Partners",
    },
    cta: {
      discover: "Discover Enactus ISEAHZ",
      becomeMember: "Become a Member",
      partnerWithUs: "Partner With Us",
      startConversation: "Start a Conversation",
      learnMore: "Learn More",
      viewCalendar: "View Full Calendar",
      viewGallery: "View Gallery",
      backHome: "Back to homepage",
    },
    stats: {
      networkNote:
        "These figures describe the wider international Enactus network, not Enactus ISEAHZ specifically.",
    },
    map: {
      tunisia: "TUNISIA",
      zaghouan: "ZAGHOUAN",
    },
    gallery: {
      all: "All",
      events: "Events",
      workshops: "Workshops",
      team: "Team",
      competition: "Competition",
      community: "Community",
      campus: "Campus",
      empty: "Photos will appear here soon.",
    },
    events: {
      empty: "No events scheduled yet — check back soon.",
      pastEmpty: "No past events archived yet.",
      upcoming: "Upcoming",
      past: "Past",
      registration: "Register",
      noUpcoming: "No upcoming event right now — check the calendar for what's next.",
      categories: {
        workshop: "Workshop",
        competition: "Competition",
        community: "Community",
        meeting: "Meeting",
        other: "Event",
      },
    },
    partners: {
      empty: "We don't have partners yet — your organization could be part of what comes next.",
      opportunities: "Partnership opportunities",
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms",
      global: "Enactus Global",
      rights: "All rights reserved.",
    },
    admin: {
      login: "Admin Login",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
      signOut: "Sign out",
      dashboard: "Dashboard",
      save: "Save changes",
      saved: "Saved",
      saving: "Saving…",
      add: "Add",
      delete: "Delete",
      edit: "Edit",
      cancel: "Cancel",
      notConfigured:
        "Supabase isn't connected yet. Add your credentials to .env.local to enable the admin dashboard.",
    },
  },
  fr: {
    nav: {
      about: "À propos",
      enactus: "Enactus",
      impact: "Impact",
      sdgs: "ODD",
      team: "Équipe",
      events: "Événements",
      gallery: "Galerie",
      join: "Rejoindre",
      skip: "Aller au contenu",
    },
    intro: {
      skip: "Passer l'intro",
      ambitionEyebrow: "NOTRE AMBITION",
      ambitionLine:
        "Nous construisons une équipe qui apprend ensemble, grandit ensemble, concourt avec ambition et crée un impact durable.",
      statement1: "DE JEUNES LEADERS.",
      statement2: "UN IMPACT DURABLE.",
      statement3: "CONSTRUIRE. DIRIGER. IMPACTER.",
    },
    sections: {
      about: "À propos d'Enactus ISEAHZ",
      whatIsEnactus: "Qu'est-ce qu'Enactus ?",
      whyJoin: "Pourquoi rejoindre Enactus ISEAHZ ?",
      whyJoinHeadline: "Plus qu'un club. Un endroit pour grandir.",
      culture: "Culture du club",
      statsClub: "Notre club",
      statsNetwork: "Le réseau Enactus",
      sdg: "Notre engagement pour la durabilité",
      localImpact: "Impact local",
      ambition: "Notre ambition",
      competition: "Compétition",
      team: "Rencontrer l'équipe",
      upNext: "À venir",
      calendar: "Calendrier des événements",
      gallery: "Galerie",
      sponsor: "Devenir partenaire",
      partners: "Nos partenaires",
      contact: "Contact professionnel",
    },
    cta: {
      discover: "Découvrir Enactus ISEAHZ",
      becomeMember: "Devenir membre",
      partnerWithUs: "Devenir partenaire",
      startConversation: "Démarrer une conversation",
      learnMore: "En savoir plus",
      viewCalendar: "Voir le calendrier complet",
      viewGallery: "Voir la galerie",
      backHome: "Retour à l'accueil",
    },
    stats: {
      networkNote:
        "Ces chiffres décrivent le réseau international Enactus dans son ensemble, et non Enactus ISEAHZ spécifiquement.",
    },
    map: {
      tunisia: "TUNISIE",
      zaghouan: "ZAGHOUAN",
    },
    gallery: {
      all: "Tout",
      events: "Événements",
      workshops: "Ateliers",
      team: "Équipe",
      competition: "Compétition",
      community: "Communauté",
      campus: "Campus",
      empty: "Les photos seront bientôt disponibles ici.",
    },
    events: {
      empty: "Aucun événement programmé pour l'instant — revenez bientôt.",
      pastEmpty: "Aucun événement passé archivé pour l'instant.",
      upcoming: "À venir",
      past: "Passé",
      registration: "S'inscrire",
      noUpcoming: "Aucun événement à venir pour le moment — consultez le calendrier.",
      categories: {
        workshop: "Atelier",
        competition: "Compétition",
        community: "Communauté",
        meeting: "Réunion",
        other: "Événement",
      },
    },
    partners: {
      empty: "Nous n'avons pas encore de partenaires — votre organisation pourrait faire partie de la suite.",
      opportunities: "Opportunités de partenariat",
    },
    footer: {
      privacy: "Politique de confidentialité",
      terms: "Conditions",
      global: "Enactus Global",
      rights: "Tous droits réservés.",
    },
    admin: {
      login: "Connexion administrateur",
      email: "E-mail",
      password: "Mot de passe",
      signIn: "Se connecter",
      signOut: "Se déconnecter",
      dashboard: "Tableau de bord",
      save: "Enregistrer",
      saved: "Enregistré",
      saving: "Enregistrement…",
      add: "Ajouter",
      delete: "Supprimer",
      edit: "Modifier",
      cancel: "Annuler",
      notConfigured:
        "Supabase n'est pas encore connecté. Ajoutez vos identifiants dans .env.local pour activer le tableau de bord.",
    },
  },
};

export type Dictionary = typeof dictionaries["en"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
