import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { TeamEditor } from "@/components/admin/TeamEditor";
import type { TeamMemberRow } from "@/types/database";

export default async function TeamAdminPage() {
  let members: Omit<TeamMemberRow, "created_at">[] = [];

  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from("team_members").select("*").order("order");
      members = (data as TeamMemberRow[] | null) ?? [];
    }
  }

  return <TeamEditor initialMembers={members} />;
}
