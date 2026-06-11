import React from "react";
import data from "./locale.json";
import countries from "./countries.json";
import { LocaleData } from "./types";
import { DEFAULT_LOCALE } from "./shared";
import { useLocale } from "./LocaleProvider";

export type { SupportedLocale } from "./shared";
export { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./shared";
export { LocaleProvider, useLocale, useSetLocale } from "./LocaleProvider";

// Country display labels are keyed by the backend FIFA code (Country.code).
// `short` is the 3-letter label shown in the UI; `long` is the full name.
type CountryLabel = { short: string; long: string };
const countryTables = countries as Record<
  string,
  Record<string, CountryLabel>
>;

export function useLocalizedText() {
  const locale = useLocale();
  return React.useMemo(() => {
    const _data: { [key: string]: LocaleData } = data;
    return {
      ...(_data[locale] ?? _data[DEFAULT_LOCALE]),
      locale,
    } as LocaleData & { locale: string };
  }, [locale]);
}

// Localizes a country by its backend FIFA code for the active locale.
// `short(code)` -> 3-letter label, `long(code, fallback)` -> full name.
// Both fall back gracefully when a code is missing from the table.
export function useLocalizedCountries() {
  const locale = useLocale();
  return React.useMemo(() => {
    const table = countryTables[locale] ?? countryTables[DEFAULT_LOCALE] ?? {};
    return {
      short: (code: string) => table[code]?.short ?? code,
      long: (code: string, fallback?: string) =>
        table[code]?.long ?? fallback ?? code,
    };
  }, [locale]);
}
