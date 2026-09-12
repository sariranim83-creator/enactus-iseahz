import { getBlock } from "@/lib/content/getBlock";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";
import { CompetitionPhotosEditor } from "@/components/admin/CompetitionPhotosEditor";
import type { CompetitionPhotoRow } from "@/types/database";

export default async function CompetitionAdminPage() {
  const data = await getBlock("competition");

  let photos: Omit<CompetitionPhotoRow, "created_at">[] = [];
  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { data: rows } = await supabase.from("competition_photos").select("*").order("order");
      photos = (rows as CompetitionPhotoRow[] | null) ?? [];
    }
  }

  return (
    <div className="space-y-12">
      <ContentBlockEditor
        blockKey="competition"
        title="Competition"
        description="Headline, intro and this year's ambition statement for the competition section."
        initialData={data}
      />
      <CompetitionPhotosEditor initialPhotos={photos} />
    </div>
  );
}
