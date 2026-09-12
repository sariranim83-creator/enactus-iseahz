import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function ContactAdminPage() {
  const data = await getBlock("contact");
  return (
    <ContentBlockEditor
      blockKey="contact"
      title="Professional Contact"
      description="The email and location shown in the contact section and footer."
      initialData={data}
    />
  );
}
