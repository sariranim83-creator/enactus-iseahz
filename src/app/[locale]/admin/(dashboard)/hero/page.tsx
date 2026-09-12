import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function HeroAdminPage() {
  const data = await getBlock("hero");
  return (
    <ContentBlockEditor
      blockKey="hero"
      title="Hero"
      description="The homepage headline, description and CTA buttons. Leave “Recruitment url” empty to show a clean placeholder instead of the Become a Member button linking anywhere."
      initialData={data}
    />
  );
}
