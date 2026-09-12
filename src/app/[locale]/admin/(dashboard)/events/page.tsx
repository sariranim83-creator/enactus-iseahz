import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { EventsEditor } from "@/components/admin/EventsEditor";
import type { EventRow } from "@/types/database";

export default async function EventsAdminPage() {
  let events: Omit<EventRow, "created_at">[] = [];

  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
      events = (data as EventRow[] | null) ?? [];
    }
  }

  return <EventsEditor initialEvents={events} />;
}
