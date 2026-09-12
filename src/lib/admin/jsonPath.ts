export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type PathSegment = string | number;

/** Immutable deep-set: returns a new object/array with `value` placed at `path`. */
export function setPath(root: JsonValue, path: PathSegment[], value: JsonValue): JsonValue {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (head === undefined) return value;

  if (typeof head === "number") {
    const arr = Array.isArray(root) ? [...root] : [];
    arr[head] = setPath(arr[head] ?? null, rest, value);
    return arr;
  }

  const obj: Record<string, JsonValue> =
    root && typeof root === "object" && !Array.isArray(root) ? { ...root } : {};
  obj[head] = setPath(obj[head] ?? null, rest, value);
  return obj;
}

export function isLocalizedText(value: JsonValue): value is { en: string; fr: string } {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as Record<string, JsonValue>).en === "string" &&
    typeof (value as Record<string, JsonValue>).fr === "string" &&
    Object.keys(value).length === 2
  );
}

/** Builds a blank template for a new array item by nulling out a shallow clone's leaf strings/numbers. */
export function blankLike(sample: JsonValue): JsonValue {
  if (sample === null) return null;
  if (Array.isArray(sample)) return [];
  if (typeof sample === "object") {
    const out: Record<string, JsonValue> = {};
    for (const [k, v] of Object.entries(sample)) {
      if (isLocalizedText(v)) out[k] = { en: "", fr: "" };
      else if (typeof v === "string") out[k] = "";
      else if (typeof v === "number") out[k] = 0;
      else if (typeof v === "boolean") out[k] = true;
      else out[k] = blankLike(v);
    }
    return out;
  }
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return true;
  return null;
}
