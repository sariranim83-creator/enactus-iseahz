"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { TeamMemberRow } from "@/types/database";

type Draft = Omit<TeamMemberRow, "created_at">;

function blankMember(order: number): Draft {
  return {
    id: crypto.randomUUID(),
    name: "",
    position_en: "",
    position_fr: "",
    photo_url: null,
    bio_en: "",
    bio_fr: "",
    social_links: {},
    order,
    active: true,
  };
}

function MemberCard({
  member,
  onChange,
  onSave,
  onDelete,
  isNew,
}: {
  member: Draft;
  onChange: (next: Draft) => void;
  onSave: () => void;
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
    <div className="rounded-2xl border border-enactus-gray-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <ImageUploadField
          label="Photo"
          value={member.photo_url}
          onChange={(url) => onChange({ ...member, photo_url: url })}
          folder="team"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Name</label>
            <input
              value={member.name}
              onChange={(e) => onChange({ ...member, name: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Order</label>
            <input
              type="number"
              value={member.order}
              onChange={(e) => onChange({ ...member, order: Number(e.target.value) })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Position (EN)
            </label>
            <input
              value={member.position_en}
              onChange={(e) => onChange({ ...member, position_en: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Position (FR)
            </label>
            <input
              value={member.position_fr}
              onChange={(e) => onChange({ ...member, position_fr: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Bio (EN)</label>
          <textarea
            rows={4}
            value={member.bio_en}
            onChange={(e) => onChange({ ...member, bio_en: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Bio (FR)</label>
          <textarea
            rows={4}
            value={member.bio_fr}
            onChange={(e) => onChange({ ...member, bio_fr: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {(["linkedin", "instagram", "email"] as const).map((field) => (
          <div key={field}>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              {field}
            </label>
            <input
              value={member.social_links[field] ?? ""}
              onChange={(e) =>
                onChange({ ...member, social_links: { ...member.social_links, [field]: e.target.value } })
              }
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-enactus-gray-100 pt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-enactus-black">
          <input
            type="checkbox"
            checked={member.active}
            onChange={(e) => onChange({ ...member, active: e.target.checked })}
            className="h-4 w-4 accent-enactus-yellow"
          />
          Active (visible on site)
        </label>
        <div className="flex items-center gap-3">
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
            disabled={saving}
            className="focus-ring rounded-full bg-enactus-black px-5 py-2 text-xs font-bold uppercase text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : isNew ? "Add member" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TeamEditor({ initialMembers }: { initialMembers: Draft[] }) {
  const [members, setMembers] = useState<Draft[]>(initialMembers);
  const [error, setError] = useState<string | null>(null);

  function updateMember(id: string, next: Draft) {
    setMembers((prev) => prev.map((m) => (m.id === id ? next : m)));
  }

  async function saveMember(member: Draft) {
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const { error: saveError } = await supabase.from("team_members").upsert({
      id: member.id,
      name: member.name,
      position_en: member.position_en,
      position_fr: member.position_fr,
      photo_url: member.photo_url,
      bio_en: member.bio_en,
      bio_fr: member.bio_fr,
      social_links: member.social_links,
      order: member.order,
      active: member.active,
    });
    if (saveError) setError(saveError.message);
  }

  async function deleteMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("team_members").delete().eq("id", id);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-enactus-black">Team</h1>
          <p className="mt-1 text-sm text-enactus-gray-500">Add, edit or remove team members.</p>
        </div>
        <button
          type="button"
          onClick={() => setMembers((prev) => [...prev, blankMember(prev.length + 1)])}
          className="focus-ring rounded-full bg-enactus-yellow px-5 py-2.5 text-sm font-bold text-enactus-black"
        >
          + Add member
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onChange={(next) => updateMember(member.id, next)}
            onSave={() => saveMember(member)}
            onDelete={() => deleteMember(member.id)}
            isNew={!initialMembers.some((m) => m.id === member.id)}
          />
        ))}
      </div>
    </div>
  );
}
