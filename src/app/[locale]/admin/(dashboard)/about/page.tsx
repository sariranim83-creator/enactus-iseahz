import { getBlock } from "@/lib/content/getBlock";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";

export default async function AboutAdminPage() {
  const [about, whyJoin, culture, localImpact] = await Promise.all([
    getBlock("about"),
    getBlock("why_join"),
    getBlock("culture"),
    getBlock("local_impact"),
  ]);

  return (
    <div className="space-y-12">
      <ContentBlockEditor
        blockKey="about"
        title="About Enactus ISEAHZ"
        description="Intro, mission, values and the LEARN / BUILD / LEAD… action words."
        initialData={about}
      />
      <ContentBlockEditor
        blockKey="why_join"
        title="Why Join Enactus ISEAHZ"
        description="The 8 value-proposition cards (Professional Growth, Business English, …)."
        initialData={whyJoin}
      />
      <ContentBlockEditor
        blockKey="culture"
        title="Club Culture"
        description="Headline, description and the ritual placeholders shown as “coming soon” cards."
        initialData={culture}
      />
      <ContentBlockEditor
        blockKey="local_impact"
        title="Local Impact (Zaghouan)"
        description="Headline and description shown next to the Tunisia → Zaghouan map."
        initialData={localImpact}
      />
    </div>
  );
}
