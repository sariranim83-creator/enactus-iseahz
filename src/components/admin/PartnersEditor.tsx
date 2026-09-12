"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { PartnerRow } from "@/types/database";

type Draft = Omit<PartnerRow, "created_at">;

const TYPES: PartnerRow["partnership_type"][] = ["sponsor", "academic", "community", "media", "other"];

function blankPartner(): Draft {
  return {
    id: crypto.randomUUID(),
    logo_url: "",
    organization_name: "",
    website: null,
    description_en: "",
    description_fr: "",
    partnership_type: "sponsor",
    active: true,
  };
}

function PartnerRowCard({
  partner,
  onChange,
  onSave,
  onDelete,
  isNew,
}: {
  partner: Draft;
  onChange: (next: Draft) => void;
  onSave: () => Promise<void>;
  onDelete: () => void;
  isNew: boolean;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="rounded-2xl border border-enactus-gray-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
        <ImageUploadField
          label="Logo"
          value={partner.logo_url || null}
          onChange={(url) => onChange({ ...partner, logo_url: url ?? "" })}
          folder="partners"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Organization name
            </label>
            <input
              value={partner.organization_name}
              onChange={(e) => onChange({ ...partner, organization_name: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Website</label>
            <input
              value={partner.website ?? ""}
              onChange={(e) => onChange({ ...partner, website: e.target.value || null })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Partnership type
            </label>
            <select
              value={partner.partnership_type}
              onChange={(e) =>
                onChange({ ...partner, partnership_type: e.target.value as PartnerRow["partnership_type"] })
              }
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <label className="mt-6 flex items-center gap-2 text-sm font-medium text-enactus-black">
            <input
              type="checkbox"
              checked={partner.active}
              onChange={(e) => onChange({ ...partner, active: e.target.checked })}
              className="h-4 w-4 accent-enactus-yellow"
            />
            Active (visible on site)
          </label>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Description (EN)
            </label>
            <textarea
              rows={2}
              value={partner.description_en}
              onChange={(e) => onChange({ ...partner, description_en: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Description (FR)
            </label>
            <textarea
              rows={2}
              value={partner.description_fr}
              onChange={(e) => onChange({ ...partner, description_fr: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3 border-t border-enactus-gray-100 pt-4">
        {saved && <span className="text-xs font-semibold text-green-600">Saved ✓</span>}
        <button
          type="button"
          onClick={onDelete}
          className="focus-ring rounded-full border border-enactus-gray-300 px-4 py-2 text-xs font-bold uppercase text-enactus-gray-600 hover:border-red-400 hover:text-red-600"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !partner.logo_url || !partner.organization_name}
          className="focus-ring rounded-full bg-enactus-black px-5 py-2 text-xs font-bold uppercase text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : isNew ? "Add partner" : "Save"}
        </button>
      </div>
    </div>
  );
}

export function PartnersEditor({ initialPartners }: { initialPartners: Draft[] }) {
  const [partners, setPartners] = useState<Draft[]>(initialPartners);
  const [error, setError] = useState<string | null>(null);

  function update(id: string, next: Draft) {
    setPartners((prev) => prev.map((p) => (p.id === id ? next : p)));
  }

  async function save(partner: Draft) {
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const { error: saveError } = await supabase.from("partners").upsert(partner);
    if (saveError) setError(saveError.message);
  }

  async function remove(id: string) {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("partners").delete().eq("id", id);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-enactus-black">Partners</h1>
          <p className="mt-1 text-sm text-enactus-gray-500">
            No fake partners — only add real, confirmed partners. The site shows an elegant &ldquo;partnership
            opportunities&rdquo; message while this list is empty.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPartners((prev) => [blankPartner(), ...prev])}
          className="focus-ring rounded-full bg-enactus-yellow px-5 py-2.5 text-sm font-bold text-enactus-black"
        >
          + Add partner
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-5">
        {partners.map((partner) => (
          <PartnerRowCard
            key={partner.id}
            partner={partner}
            onChange={(next) => update(partner.id, next)}
            onSave={() => save(partner)}
            onDelete={() => remove(partner.id)}
            isNew={!initialPartners.some((p) => p.id === partner.id)}
          />
        ))}
      </div>
    </div>
  );
}
