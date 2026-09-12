import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function StatsAdminPage() {
  const data = await getBlock("stats");
  return (
    <ContentBlockEditor
      blockKey="stats"
      title="Statistics"
      description="Club numbers (students, workshops, events) and network numbers (countries, teams across Tunisia). Uncheck “Visible” to hide a stat without deleting it. Keep “Category” as club or network exactly."
      initialData={data}
    />
  );
}
