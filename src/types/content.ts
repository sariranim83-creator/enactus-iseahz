/**
 * Shared content types for the Enactus ISEAHZ site.
 * Bilingual fields use `LocalizedText` so EN/FR are always edited/stored together.
 */

export type Locale = "en" | "fr";

export interface LocalizedText {
  en: string;
  fr: string;
}

export interface GeneralSettings {
  clubName: string;
  institutionName: LocalizedText;
  location: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  siteTitle: LocalizedText;
  siteDescription: LocalizedText;
}

export interface HeroContent {
  headline: LocalizedText;
  subheadline: LocalizedText; // "ENACTUS ISEAHZ"
  description: LocalizedText;
  primaryCtaLabel: LocalizedText;
  secondaryCtaLabel: LocalizedText;
  recruitmentUrl: string | null;
}

export interface VisionContent {
  year: string; // e.g. "2026-2027"
  ambitionStatement: LocalizedText; // "Build boldly. Lead responsibly. Create impact that lasts."
  annualVision: LocalizedText; // long-form vision paragraph
}

export interface AboutContent {
  intro: LocalizedText;
  mission: LocalizedText;
  values: LocalizedText;
  actionWords: string[]; // LEARN, BUILD, LEAD, CONNECT, COMPETE, CREATE IMPACT
}

export interface EnactusExplainerContent {
  entrepreneurial: LocalizedText;
  action: LocalizedText;
  us: LocalizedText;
  globalPurpose: LocalizedText;
  referenceUrl: string;
}

export interface WhyJoinItem {
  order: number;
  number: string; // "01"
  title: LocalizedText;
  description: LocalizedText;
}

export interface CultureContent {
  headline: LocalizedText;
  description: LocalizedText;
  ritualPlaceholders: LocalizedText[];
}

export type StatCategory = "club" | "network";

export interface StatItem {
  id: string;
  category: StatCategory;
  value: string; // "100+", "33"
  label: LocalizedText;
  visible: boolean;
  order: number;
}

export type SdgSlot = "primary" | "supporting";

export interface SdgItem {
  id: string;
  number: number;
  name: LocalizedText;
  description: LocalizedText;
  whyItMatters: LocalizedText;
  iconUrl: string | null;
  slot: SdgSlot;
  order: number;
}

export interface LocalImpactContent {
  headline: LocalizedText;
  description: LocalizedText;
}

export interface CompetitionContent {
  headline: LocalizedText;
  intro: LocalizedText;
  ambitionStatement: LocalizedText;
  referenceUrl: string;
}

export interface CompetitionPhoto {
  id: string;
  imageUrl: string;
  caption: LocalizedText;
  eventName: string;
  date: string | null;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: LocalizedText;
  photoUrl: string | null;
  bio: LocalizedText;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
  order: number;
  active: boolean;
}

export type EventStatus = "upcoming" | "past" | "cancelled";
export type EventCategory = "workshop" | "competition" | "community" | "meeting" | "other";

export interface EventItem {
  id: string;
  title: LocalizedText;
  date: string; // ISO date
  time: string | null;
  location: string;
  description: LocalizedText;
  imageUrl: string | null;
  category: EventCategory;
  registrationUrl: string | null;
  status: EventStatus;
  featured: boolean;
}

export type GalleryCategory = "events" | "workshops" | "team" | "competition" | "community" | "campus";

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  caption: LocalizedText;
  date: string | null;
  category: GalleryCategory;
  order: number;
}

export interface SocialLinks {
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  linkedin: string | null;
}

export interface ContactContent {
  email: string;
  location: string;
}

export type PartnershipType = "sponsor" | "academic" | "community" | "media" | "other";

export interface Partner {
  id: string;
  logoUrl: string;
  organizationName: string;
  website: string | null;
  description: LocalizedText;
  partnershipType: PartnershipType;
  active: boolean;
}

export interface SeoSettings {
  pageTitle: LocalizedText;
  metaDescription: LocalizedText;
  socialImageUrl: string | null;
}

/** Full aggregated content payload used to render the homepage. */
export interface SiteContent {
  general: GeneralSettings;
  hero: HeroContent;
  vision: VisionContent;
  about: AboutContent;
  enactusExplainer: EnactusExplainerContent;
  whyJoin: WhyJoinItem[];
  culture: CultureContent;
  stats: StatItem[];
  sdgs: SdgItem[];
  localImpact: LocalImpactContent;
  competition: CompetitionContent;
  competitionPhotos: CompetitionPhoto[];
  team: TeamMember[];
  events: EventItem[];
  gallery: GalleryPhoto[];
  social: SocialLinks;
  contact: ContactContent;
  partners: Partner[];
  seo: SeoSettings;
}
