import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { defaultContent } from "./defaults";
import type { JsonValue } from "@/lib/admin/jsonPath";

/** Fetches one content_blocks row for the admin editors, falling back to the bundled default. */
export async function getBlock(key: keyof typeof defaultBlockMap): Promise<JsonValue> {
  const fallback = defaultBlockMap[key] as unknown as JsonValue;

  if (!isSupabaseConfigured) return fallback;
  const supabase = createClient();
  if (!supabase) return fallback;

  const { data } = await supabase.from("content_blocks").select("data").eq("key", key).maybeSingle();
  return (data?.data as JsonValue | undefined) ?? fallback;
}

const defaultBlockMap = {
  general: defaultContent.general,
  hero: defaultContent.hero,
  vision: defaultContent.vision,
  about: defaultContent.about,
  enactus_explainer: defaultContent.enactusExplainer,
  why_join: defaultContent.whyJoin,
  culture: defaultContent.culture,
  stats: defaultContent.stats,
  sdgs: defaultContent.sdgs,
  local_impact: defaultContent.localImpact,
  competition: defaultContent.competition,
  social: defaultContent.social,
  contact: defaultContent.contact,
  seo: defaultContent.seo,
};
