import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function SocialAdminPage() {
  const data = await getBlock("social");
  return (
    <ContentBlockEditor
      blockKey="social"
      title="Social Media"
      description="Instagram, Facebook, TikTok and LinkedIn URLs. Leave a field empty to hide that icon across the site."
      initialData={data}
    />
  );
}
