import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function SeoAdminPage() {
  const data = await getBlock("seo");
  return (
    <ContentBlockEditor
      blockKey="seo"
      title="SEO"
      description="Page title, meta description and the social sharing image used for Open Graph / Twitter cards."
      initialData={data}
    />
  );
}
