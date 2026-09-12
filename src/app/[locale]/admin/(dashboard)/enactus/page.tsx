import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function EnactusAdminPage() {
  const data = await getBlock("enactus_explainer");
  return (
    <ContentBlockEditor
      blockKey="enactus_explainer"
      title="What is Enactus?"
      description="The official Entrepreneurial / Action / Us explainer and the global-network purpose paragraph. Keep this aligned with enactus.org — do not invent an alternative definition."
      initialData={data}
    />
  );
}
