"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { EventRow } from "@/types/database";

type Draft = Omit<EventRow, "created_at">;

const CATEGORIES: EventRow["category"][] = ["workshop", "competition", "community", "meeting", "other"];
const STATUSES: EventRow["status"][] = ["upcoming", "past", "cancelled"];

function blankEvent(): Draft {
  return {
    id: crypto.randomUUID(),
    title_en: "",
    title_fr: "",
    date: new Date().toISOString().slice(0, 10),
    time: null,
    location: "",
    description_en: "",
    description_fr: "",
    image_url: null,
    category: "other",
    registration_url: null,
    status: "upcoming",
    featured: false,
  };
}

function EventCard({
  event,
  onChange,
  onSave,
  onDelete,
  isNew,
}: {
  event: Draft;
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
    <div className="rounded-2xl border border-enactus-gray-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Title (EN)</label>
          <input
            value={event.title_en}
            onChange={(e) => onChange({ ...event, title_en: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Title (FR)</label>
          <input
            value={event.title_fr}
            onChange={(e) => onChange({ ...event, title_fr: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Date</label>
          <input
            type="date"
            value={event.date}
            onChange={(e) => onChange({ ...event, date: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Time</label>
          <input
            placeholder="e.g. 14:00"
            value={event.time ?? ""}
            onChange={(e) => onChange({ ...event, time: e.target.value || null })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Location</label>
          <input
            value={event.location}
            onChange={(e) => onChange({ ...event, location: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
            Description (EN)
          </label>
          <textarea
            rows={3}
            value={event.description_en}
            onChange={(e) => onChange({ ...event, description_en: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
            Description (FR)
          </label>
          <textarea
            rows={3}
            value={event.description_fr}
            onChange={(e) => onChange({ ...event, description_fr: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <ImageUploadField
          label="Image"
          value={event.image_url}
          onChange={(url) => onChange({ ...event, image_url: url })}
          folder="events"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Category</label>
          <select
            value={event.category}
            onChange={(e) => onChange({ ...event, category: e.target.value as EventRow["category"] })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">Status</label>
          <select
            value={event.status}
            onChange={(e) => onChange({ ...event, status: e.target.value as EventRow["status"] })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">
            Registration URL
          </label>
          <input
            value={event.registration_url ?? ""}
            onChange={(e) => onChange({ ...event, registration_url: e.target.value || null })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-enactus-gray-100 pt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-enactus-black">
          <input
            type="checkbox"
            checked={event.featured}
            onChange={(e) => onChange({ ...event, featured: e.target.checked })}
            className="h-4 w-4 accent-enactus-yellow"
          />
          Featured on homepage (“Up Next”)
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
            {saving ? "Saving…" : isNew ? "Add event" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EventsEditor({ initialEvents }: { initialEvents: Draft[] }) {
  const [events, setEvents] = useState<Draft[]>(initialEvents);
  const [error, setError] = useState<string | null>(null);

  function update(id: string, next: Draft) {
    setEvents((prev) => prev.map((e) => (e.id === id ? next : e)));
  }

  async function save(event: Draft) {
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    const { error: saveError } = await supabase.from("events").upsert(event);
    if (saveError) setError(saveError.message);
  }

  async function remove(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("events").delete().eq("id", id);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-enactus-black">Events & Calendar</h1>
          <p className="mt-1 text-sm text-enactus-gray-500">
            Events appear automatically on the homepage (if featured/upcoming) and on the full calendar page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEvents((prev) => [blankEvent(), ...prev])}
          className="focus-ring rounded-full bg-enactus-yellow px-5 py-2.5 text-sm font-bold text-enactus-black"
        >
          + Add event
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onChange={(next) => update(event.id, next)}
            onSave={() => save(event)}
            onDelete={() => remove(event.id)}
            isNew={!initialEvents.some((e) => e.id === event.id)}
          />
        ))}
      </div>
    </div>
  );
}
