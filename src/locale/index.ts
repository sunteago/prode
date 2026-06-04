import React from "react";
import data from "./locale.json";
import countries from "./countries.json";
import { LocaleData } from "./types";

// Supported UI locales. Only "es" is active today; the "en" tables already
// exist so the app can go bilingual without touching component code: flip
// ACTIVE_LOCALE (or wire it to a context/route) and the UI follows.
export type SupportedLocale = "es" | "en";
export const SUPPORTED_LOCALES: SupportedLocale[] = ["es", "en"];
export const ACTIVE_LOCALE: SupportedLocale = "es";

// Country display labels are keyed by the backend FIFA code (Country.code).
// `short` is the 3-letter label shown in the UI; `long` is the full name.
type CountryLabel = { short: string; long: string };
const countryTables = countries as Record<
  string,
  Record<string, CountryLabel>
>;

export function useLocalizedText() {
  return React.useMemo(() => {
    const _data: { [key: string]: LocaleData } = data;
    return {
      ..._data[ACTIVE_LOCALE],
      locale: ACTIVE_LOCALE,
    } as LocaleData & { locale: string };
  }, []);
}

// Localizes a country by its backend FIFA code for the active locale.
// `short(code)` -> 3-letter label, `long(code, fallback)` -> full name.
// Both fall back gracefully when a code is missing from the table.
export function useLocalizedCountries() {
  return React.useMemo(() => {
    const table = countryTables[ACTIVE_LOCALE] ?? {};
    return {
      short: (code: string) => table[code]?.short ?? code,
      long: (code: string, fallback?: string) =>
        table[code]?.long ?? fallback ?? code,
    };
  }, []);
}
