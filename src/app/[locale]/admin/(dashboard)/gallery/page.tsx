import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { GalleryEditor } from "@/components/admin/GalleryEditor";
import type { GalleryPhotoRow } from "@/types/database";

export default async function GalleryAdminPage() {
  let photos: Omit<GalleryPhotoRow, "created_at">[] = [];

  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from("gallery_photos").select("*").order("order");
      photos = (data as GalleryPhotoRow[] | null) ?? [];
    }
  }

  return <GalleryEditor initialPhotos={photos} />;
}
