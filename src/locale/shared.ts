// React-free locale primitives shared by the middleware (request-time browser
// detection), the server layout (cookie read), and the client provider. Keeping
// this module free of React and JSON imports lets the Edge middleware import it
// without pulling in the locale string tables.

// Supported UI locales. Both "es" and "en" string tables exist; the active one
// is chosen per-request from the locale cookie (seeded from the browser's
// Accept-Language header on first visit).
export type SupportedLocale = "es" | "en";
export const SUPPORTED_LOCALES: SupportedLocale[] = ["es", "en"];
export const DEFAULT_LOCALE: SupportedLocale = "es";

// Cookie that carries the active locale. Written by the middleware on first
// visit and by the LocaleSelect switcher thereafter.
export const LOCALE_COOKIE = "locale";

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return (
    typeof value === "string" &&
    (SUPPORTED_LOCALES as string[]).includes(value)
  );
}

// Picks the best supported locale from an Accept-Language header value,
// honoring quality-ordered language tags (e.g. "en-US,en;q=0.9,es;q=0.8").
// Falls back to DEFAULT_LOCALE when nothing matches.
export function pickLocale(acceptLanguage: string | null): SupportedLocale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const tags = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);
  for (const tag of tags) {
    const base = tag.split("-")[0];
    if (isSupportedLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
