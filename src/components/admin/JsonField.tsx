"use client";

import { setPath, blankLike, isLocalizedText, type JsonValue, type PathSegment } from "@/lib/admin/jsonPath";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const IMAGE_KEYS = ["logourl", "faviconurl", "photourl", "imageurl", "iconurl", "socialimageurl", "logo_url", "photo_url", "image_url"];
function isImageField(key: string) {
  return IMAGE_KEYS.some((k) => key.toLowerCase().replace(/_/g, "") === k.replace(/_/g, ""));
}

function humanize(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

const LONG_TEXT_KEYS = ["description", "bio", "intro", "mission", "values", "text", "note", "statement", "vision", "purpose", "ambition"];

function isLongText(key: string, value: string) {
  return value.length > 70 || LONG_TEXT_KEYS.some((k) => key.toLowerCase().includes(k));
}

const URL_KEYS = ["url", "link", "website"];
function isUrlField(key: string) {
  return URL_KEYS.some((k) => key.toLowerCase().includes(k));
}

export function JsonField({
  value,
  path,
  fieldKey,
  onChange,
}: {
  value: JsonValue;
  path: PathSegment[];
  fieldKey: string;
  onChange: (path: PathSegment[], value: JsonValue) => void;
}) {
  const label = humanize(fieldKey);

  // LocalizedText { en, fr }
  if (isLocalizedText(value)) {
    return (
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</label>
        <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
          {(["en", "fr"] as const).map((lang) => (
            <div key={lang}>
              <span className="text-[10px] font-bold uppercase text-enactus-gray-400">{lang}</span>
              <textarea
                value={value[lang]}
                onChange={(e) => onChange([...path, lang], e.target.value)}
                rows={isLongText(fieldKey, value[lang]) ? 3 : 1}
                className="focus-ring mt-1 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Nullable string (url-like / image) fields
  if (value === null) {
    if (isImageField(fieldKey)) {
      return (
        <ImageUploadField label={label} value={null} onChange={(url) => onChange(path, url)} />
      );
    }
    return (
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</label>
        <input
          type="text"
          placeholder={isUrlField(fieldKey) ? "https://…" : "—"}
          defaultValue=""
          onChange={(e) => onChange(path, e.target.value === "" ? null : e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium text-enactus-black">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(path, e.target.checked)}
          className="h-4 w-4 rounded border-enactus-gray-300 accent-enactus-yellow"
        />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(path, Number(e.target.value))}
          className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  if (typeof value === "string") {
    if (isImageField(fieldKey)) {
      return (
        <ImageUploadField label={label} value={value} onChange={(url) => onChange(path, url)} />
      );
    }
    return (
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</label>
        {isLongText(fieldKey, value) ? (
          <textarea
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            rows={3}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        ) : (
          <input
            type={isUrlField(fieldKey) ? "url" : "text"}
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-lg border border-enactus-gray-200 px-3 py-2 text-sm"
          />
        )}
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</label>
          <button
            type="button"
            onClick={() => onChange(path, [...value, blankLike(value[value.length - 1] ?? "")])}
            className="focus-ring rounded-full border border-enactus-gray-300 px-3 py-1 text-[11px] font-bold uppercase text-enactus-gray-600 hover:border-enactus-black"
          >
            + Add
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {value.map((item, i) => (
            <div key={i} className="relative rounded-xl border border-enactus-gray-200 bg-enactus-gray-50 p-4">
              <button
                type="button"
                onClick={() => onChange(path, value.filter((_, idx) => idx !== i))}
                aria-label="Remove"
                className="focus-ring absolute right-3 top-3 text-xs font-bold text-enactus-gray-400 hover:text-red-600"
              >
                ✕
              </button>
              {typeof item === "object" && item !== null && !Array.isArray(item) ? (
                <div className="grid gap-3 pr-6 sm:grid-cols-2">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className={isLocalizedText(v) ? "sm:col-span-2" : ""}>
                      <JsonField
                        value={v}
                        path={[...path, i, k]}
                        fieldKey={k}
                        onChange={onChange}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <JsonField value={item} path={[...path, i]} fieldKey={`${label} ${i + 1}`} onChange={onChange} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Plain nested object
  return (
    <fieldset className="rounded-xl border border-enactus-gray-200 p-4">
      <legend className="px-1 text-xs font-bold uppercase tracking-wide text-enactus-gray-500">{label}</legend>
      <div className="grid gap-4">
        {Object.entries(value).map(([k, v]) => (
          <JsonField key={k} value={v} path={[...path, k]} fieldKey={k} onChange={onChange} />
        ))}
      </div>
    </fieldset>
  );
}

export { setPath };
