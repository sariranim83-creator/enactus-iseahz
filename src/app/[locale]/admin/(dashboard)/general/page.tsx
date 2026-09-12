import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function GeneralAdminPage() {
  const data = await getBlock("general");
  return (
    <ContentBlockEditor
      blockKey="general"
      title="General Settings"
      description="Club name, institution name, location and site metadata. Logo and favicon: upload the files to Supabase Storage (bucket “media”) and paste the public URL here."
      initialData={data}
    />
  );
}
