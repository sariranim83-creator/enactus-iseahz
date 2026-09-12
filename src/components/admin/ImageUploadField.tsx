"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

/** Uploads to the Supabase Storage "media" bucket and returns its public URL, or lets the admin paste a URL manually. */
export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "uploads",
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }
    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</label>
      <div className="mt-1.5 flex items-center gap-4">
        {value ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-enactus-gray-200 bg-enactus-gray-50">
            <Image src={value} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-enactus-gray-300 text-[10px] text-enactus-gray-400">
            No image
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="block w-full text-xs text-enactus-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-enactus-black file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
          />
          <input
            type="text"
            placeholder="or paste an image URL"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
            className="focus-ring w-full rounded-lg border border-enactus-gray-200 px-3 py-1.5 text-xs"
          />
        </div>
      </div>
      {uploading && <p className="mt-1 text-xs text-enactus-gray-500">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
