"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { CompetitionPhotoRow } from "@/types/database";

type Draft = Omit<CompetitionPhotoRow, "created_at">;

function blankPhoto(order: number): Draft {
  return {
    id: crypto.randomUUID(),
    image_url: "",
    caption_en: "",
    caption_fr: "",
    event_name: "",
    date: null,
    order,
  };
}

function PhotoRow({
  photo,
  onChange,
  onSave,
  onDelete,
  isNew,
}: {
  photo: Draft;
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
    <div className="grid gap-4 rounded-2xl border border-enactus-gray-200 bg-white p-5 sm:grid-cols-[140px_1fr]">
      <div>
        {photo.image_url ? (
          <div className="relative aspect-square overflow-hidden rounded-lg bg-enactus-gray-50">
            <Image src={photo.image_url} alt="" fill className="object-cover" />
          </div>
        ) : null}
        <div className="mt-2">
          <ImageUploadField
            label="Upload"
            value={photo.image_url || null}
            onChange={(url) => onChange({ ...photo, image_url: url ?? "" })}
            folder="competition"
          />
        </div>
      </div>
      <div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Event name
            </label>
            <input
              value={photo.event_name}
              onChange={(e) => onChange({ ...photo, event_name: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Date</label>
            <input
              type="date"
              value={photo.date ?? ""}
              onChange={(e) => onChange({ ...photo, date: e.target.value || null })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Caption (EN)
            </label>
            <input
              value={photo.caption_en}
              onChange={(e) => onChange({ ...photo, caption_en: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
              Caption (FR)
            </label>
            <input
              value={photo.caption_fr}
              onChange={(e) => onChange({ ...photo, caption_fr: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Order</label>
            <input
              type="number"
              value={photo.order}
              onChange={(e) => onChange({ ...photo, order: Number(e.target.value) })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
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
            disabled={saving || !photo.image_url}
            className="focus-ring rounded-full bg-enactus-black px-5 py-2 text-xs font-bold uppercase text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : isNew ? "Add photo" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CompetitionPhotosEditor({ initialPhotos }: { initialPhotos: Draft[] }) {
  const [photos, setPhotos] = useState<Draft[]>(initialPhotos);
  const [error, setError] = useState<string | null>(null);

  function update(id: string, next: Draft) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? next : p)));
  }

  async function save(photo: Draft) {
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const { error: saveError } = await supabase.from("competition_photos").upsert(photo);
    if (saveError) setError(saveError.message);
  }

  async function remove(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("competition_photos").delete().eq("id", id);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-enactus-black">Competition Photos</h2>
        <button
          type="button"
          onClick={() => setPhotos((prev) => [blankPhoto(prev.length + 1), ...prev])}
          className="focus-ring rounded-full bg-enactus-yellow px-5 py-2.5 text-sm font-bold text-enactus-black"
        >
          + Add photo
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-5">
        {photos.map((photo) => (
          <PhotoRow
            key={photo.id}
            photo={photo}
            onChange={(next) => update(photo.id, next)}
            onSave={() => save(photo)}
            onDelete={() => remove(photo.id)}
            isNew={!initialPhotos.some((p) => p.id === photo.id)}
          />
        ))}
      </div>
    </div>
  );
}
