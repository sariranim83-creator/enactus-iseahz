/** Raw row shapes as stored in Supabase (snake_case), before mapping to src/types/content.ts. */

export interface ContentBlockRow {
  key: string;
  data: unknown;
  updated_at: string;
}

export interface TeamMemberRow {
  id: string;
  name: string;
  position_en: string;
  position_fr: string;
  photo_url: string | null;
  bio_en: string;
  bio_fr: string;
  social_links: { linkedin?: string; instagram?: string; email?: string };
  order: number;
  active: boolean;
  created_at: string;
}

export interface EventRow {
  id: string;
  title_en: string;
  title_fr: string;
  date: string;
  time: string | null;
  location: string;
  description_en: string;
  description_fr: string;
  image_url: string | null;
  category: "workshop" | "competition" | "community" | "meeting" | "other";
  registration_url: string | null;
  status: "upcoming" | "past" | "cancelled";
  featured: boolean;
  created_at: string;
}

export interface GalleryPhotoRow {
  id: string;
  image_url: string;
  caption_en: string;
  caption_fr: string;
  date: string | null;
  category: "events" | "workshops" | "team" | "competition" | "community" | "campus";
  order: number;
  created_at: string;
}

export interface CompetitionPhotoRow {
  id: string;
  image_url: string;
  caption_en: string;
  caption_fr: string;
  event_name: string;
  date: string | null;
  order: number;
  created_at: string;
}

export interface PartnerRow {
  id: string;
  logo_url: string;
  organization_name: string;
  website: string | null;
  description_en: string;
  description_fr: string;
  partnership_type: "sponsor" | "academic" | "community" | "media" | "other";
  active: boolean;
  created_at: string;
}
