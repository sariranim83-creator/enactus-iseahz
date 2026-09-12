"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { JsonField } from "@/components/admin/JsonField";
import { setPath, type JsonValue, type PathSegment } from "@/lib/admin/jsonPath";

export function ContentBlockEditor({
  blockKey,
  title,
  description,
  initialData,
}: {
  blockKey: string;
  title: string;
  description?: string;
  initialData: JsonValue;
}) {
  const [data, setData] = useState<JsonValue>(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(path: PathSegment[], value: JsonValue) {
    setData((prev) => setPath(prev, path, value));
    setStatus("idle");
  }

  async function handleSave() {
    const supabase = createClient();
    if (!supabase) {
      setStatus("error");
      setErrorMessage("Supabase is not configured.");
      return;
    }
    setStatus("saving");
    const { error } = await supabase
      .from("content_blocks")
      .upsert({ key: blockKey, data, updated_at: new Date().toISOString() });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("saved");
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return <p className="text-sm text-red-600">Unexpected content shape for &ldquo;{blockKey}&rdquo;.</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-enactus-black">{title}</h1>
        {description && <p className="mt-1 text-sm text-enactus-gray-500">{description}</p>}
      </div>

      <div className="space-y-6 rounded-2xl border border-enactus-gray-200 bg-white p-6">
        {Object.entries(data).map(([key, value]) => (
          <JsonField key={key} value={value} path={[key]} fieldKey={key} onChange={handleChange} />
        ))}
      </div>

      <div className="sticky bottom-0 mt-6 flex items-center gap-4 rounded-2xl border border-enactus-gray-200 bg-white/95 p-4 backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="focus-ring rounded-full bg-enactus-black px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        {status === "saved" && <span className="text-sm font-semibold text-green-600">Saved ✓</span>}
        {status === "error" && <span className="text-sm font-semibold text-red-600">{errorMessage}</span>}
      </div>
    </div>
  );
}
