import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { defaultContent } from "./defaults";
import type {
  SiteContent,
  TeamMember,
  EventItem,
  GalleryPhoto,
  CompetitionPhoto,
  Partner,
} from "@/types/content";
import type {
  ContentBlockRow,
  TeamMemberRow,
  EventRow,
  GalleryPhotoRow,
  CompetitionPhotoRow,
  PartnerRow,
} from "@/types/database";

function mapTeamMember(row: TeamMemberRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    position: { en: row.position_en, fr: row.position_fr },
    photoUrl: row.photo_url,
    bio: { en: row.bio_en, fr: row.bio_fr },
    socialLinks: row.social_links ?? {},
    order: row.order,
    active: row.active,
  };
}

function mapEvent(row: EventRow): EventItem {
  return {
    id: row.id,
    title: { en: row.title_en, fr: row.title_fr },
    date: row.date,
    time: row.time,
    location: row.location,
    description: { en: row.description_en, fr: row.description_fr },
    imageUrl: row.image_url,
    category: row.category,
    registrationUrl: row.registration_url,
    status: row.status,
    featured: row.featured,
  };
}

function mapGalleryPhoto(row: GalleryPhotoRow): GalleryPhoto {
  return {
    id: row.id,
    imageUrl: row.image_url,
    caption: { en: row.caption_en, fr: row.caption_fr },
    date: row.date,
    category: row.category,
    order: row.order,
  };
}

function mapCompetitionPhoto(row: CompetitionPhotoRow): CompetitionPhoto {
  return {
    id: row.id,
    imageUrl: row.image_url,
    caption: { en: row.caption_en, fr: row.caption_fr },
    eventName: row.event_name,
    date: row.date,
    order: row.order,
  };
}

function mapPartner(row: PartnerRow): Partner {
  return {
    id: row.id,
    logoUrl: row.logo_url,
    organizationName: row.organization_name,
    website: row.website,
    description: { en: row.description_en, fr: row.description_fr },
    partnershipType: row.partnership_type,
    active: row.active,
  };
}

/**
 * Fetches the full site content from Supabase, merged over the bundled
 * defaults so any missing block/table (fresh project, not seeded yet) still
 * renders sensible content instead of breaking the page.
 *
 * Cached per-request (Next.js fetch/data cache is not used here since this
 * hits Supabase directly; callers should call this once per request and
 * pass the result down rather than re-fetching per section).
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return defaultContent;

  const supabase = createClient();
  if (!supabase) return defaultContent;

  const [blocksRes, teamRes, eventsRes, galleryRes, competitionPhotosRes, partnersRes] =
    await Promise.all([
      supabase.from("content_blocks").select("key, data, updated_at"),
      supabase.from("team_members").select("*").eq("active", true).order("order"),
      supabase.from("events").select("*").order("date", { ascending: false }),
      supabase.from("gallery_photos").select("*").order("order"),
      supabase.from("competition_photos").select("*").order("order"),
      supabase.from("partners").select("*").eq("active", true).order("created_at"),
    ]);

  const blocks = new Map<string, unknown>();
  (blocksRes.data as ContentBlockRow[] | null)?.forEach((row) => blocks.set(row.key, row.data));

  const merged: SiteContent = {
    general: (blocks.get("general") as SiteContent["general"]) ?? defaultContent.general,
    hero: (blocks.get("hero") as SiteContent["hero"]) ?? defaultContent.hero,
    vision: (blocks.get("vision") as SiteContent["vision"]) ?? defaultContent.vision,
    about: (blocks.get("about") as SiteContent["about"]) ?? defaultContent.about,
    enactusExplainer:
      (blocks.get("enactus_explainer") as SiteContent["enactusExplainer"]) ??
      defaultContent.enactusExplainer,
    whyJoin: (blocks.get("why_join") as SiteContent["whyJoin"]) ?? defaultContent.whyJoin,
    culture: (blocks.get("culture") as SiteContent["culture"]) ?? defaultContent.culture,
    stats: (blocks.get("stats") as SiteContent["stats"]) ?? defaultContent.stats,
    sdgs: (blocks.get("sdgs") as SiteContent["sdgs"]) ?? defaultContent.sdgs,
    localImpact:
      (blocks.get("local_impact") as SiteContent["localImpact"]) ?? defaultContent.localImpact,
    competition:
      (blocks.get("competition") as SiteContent["competition"]) ?? defaultContent.competition,
    competitionPhotos: competitionPhotosRes.data
      ? (competitionPhotosRes.data as CompetitionPhotoRow[]).map(mapCompetitionPhoto)
      : defaultContent.competitionPhotos,
    team: teamRes.data
      ? (teamRes.data as TeamMemberRow[]).map(mapTeamMember)
      : defaultContent.team,
    events: eventsRes.data ? (eventsRes.data as EventRow[]).map(mapEvent) : defaultContent.events,
    gallery: galleryRes.data
      ? (galleryRes.data as GalleryPhotoRow[]).map(mapGalleryPhoto)
      : defaultContent.gallery,
    social: (blocks.get("social") as SiteContent["social"]) ?? defaultContent.social,
    contact: (blocks.get("contact") as SiteContent["contact"]) ?? defaultContent.contact,
    partners: partnersRes.data
      ? (partnersRes.data as PartnerRow[]).map(mapPartner)
      : defaultContent.partners,
    seo: (blocks.get("seo") as SiteContent["seo"]) ?? defaultContent.seo,
  };

  return merged;
}
