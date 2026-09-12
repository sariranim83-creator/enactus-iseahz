import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function SdgsAdminPage() {
  const data = await getBlock("sdgs");
  return (
    <ContentBlockEditor
      blockKey="sdgs"
      title="Sustainable Development Goals"
      description={'Keep "Slot" as primary for exactly one SDG (SDG 4) and supporting for the others.'}
      initialData={data}
    />
  );
}
