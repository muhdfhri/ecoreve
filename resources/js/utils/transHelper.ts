/**
 * Helper utility to extract localized text from string or JSON object.
 * Resolves in order: active locale -> 'en' (default fallback) -> 'id' -> first available string value.
 */
export function getTrans(
  field: any,
  locale: string = "en",
  fallbackLocale: string = "en"
): string {
  if (field === null || field === undefined) {
    return "";
  }

  // If field is already a plain string, return it directly
  if (typeof field === "string") {
    let cleanStr = field.trim();
    
    // Strip leading/trailing quote characters if double-wrapped
    if (
      (cleanStr.startsWith('"') && cleanStr.endsWith('"')) ||
      (cleanStr.startsWith("'") && cleanStr.endsWith("'"))
    ) {
      cleanStr = cleanStr.substring(1, cleanStr.length - 1).trim();
    }

    // Attempt JSON parse in case backend sent stringified JSON or double-encoded JSON
    if (cleanStr.startsWith("{") && cleanStr.endsWith("}")) {
      try {
        const parsed = JSON.parse(cleanStr);
        return getTrans(parsed, locale, fallbackLocale);
      } catch (e) {
        // Fallback for double-escaped JSON strings
        try {
          const unescaped = JSON.parse(`"${cleanStr}"`);
          const parsed = JSON.parse(unescaped);
          return getTrans(parsed, locale, fallbackLocale);
        } catch (e2) {
          return cleanStr;
        }
      }
    }
    return cleanStr;
  }

  // If field is a number or boolean, convert to string
  if (typeof field === "number" || typeof field === "boolean") {
    return String(field);
  }

  // If field is a JSON object map: { en: "...", id: "...", ms: "...", th: "...", zh: "..." }
  if (typeof field === "object") {
    const locLower = (locale || "").toLowerCase();
    const fallbackLower = (fallbackLocale || "").toLowerCase();

    // Check exact case and lowercase keys
    for (const key of Object.keys(field)) {
      if (key.toLowerCase() === locLower && typeof field[key] === "string" && field[key].trim() !== "") {
        return field[key];
      }
    }

    for (const key of Object.keys(field)) {
      if (key.toLowerCase() === fallbackLower && typeof field[key] === "string" && field[key].trim() !== "") {
        return field[key];
      }
    }

    for (const key of Object.keys(field)) {
      if (key.toLowerCase() === "en" && typeof field[key] === "string" && field[key].trim() !== "") {
        return field[key];
      }
    }

    for (const key of Object.keys(field)) {
      if (key.toLowerCase() === "id" && typeof field[key] === "string" && field[key].trim() !== "") {
        return field[key];
      }
    }

    // Fallback to first non-empty string entry in object
    const values = Object.values(field);
    for (const val of values) {
      if (typeof val === "string" && val.trim() !== "") {
        return val;
      }
    }
  }

  return "";
}

/**
 * Supported locale keys and metadata for Admin UI Forms
 */
export const SUPPORTED_LOCALES = [
  { code: "en", label: "English (Default)", flag: "🇬🇧" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Melayu", flag: "🇲🇾" },
  { code: "th", label: "ไทย (Thai)", flag: "🇹🇭" },
  { code: "zh", label: "中文 (Chinese)", flag: "🇨🇳" },
] as const;
