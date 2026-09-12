import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function VisionAdminPage() {
  const data = await getBlock("vision");
  return (
    <ContentBlockEditor
      blockKey="vision"
      title="Vision & Ambition"
      description="The annual vision paragraph and short ambition statement shown in the “Our Ambition” section. Update “Year” each academic year."
      initialData={data}
    />
  );
}
