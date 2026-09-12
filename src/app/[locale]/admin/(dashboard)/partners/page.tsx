import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { PartnersEditor } from "@/components/admin/PartnersEditor";
import type { PartnerRow } from "@/types/database";

export default async function PartnersAdminPage() {
  let partners: Omit<PartnerRow, "created_at">[] = [];

  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from("partners").select("*").order("created_at");
      partners = (data as PartnerRow[] | null) ?? [];
    }
  }

  return <PartnersEditor initialPartners={partners} />;
}
