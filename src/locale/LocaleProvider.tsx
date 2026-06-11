"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_COOKIE,
  SupportedLocale,
} from "./shared";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type LocaleContextValue = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
};

const LocaleContext = React.createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

// Holds the active locale for client components. Seeded from the cookie value
// the server layout resolved, so the first client render matches SSR (no flash
// of the wrong language). Switching writes the cookie and refreshes so any
// server-rendered parts (e.g. <html lang>) follow.
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = React.useState<SupportedLocale>(
    isSupportedLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE
  );

  const setLocale = React.useCallback(
    (next: SupportedLocale) => {
      document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${ONE_YEAR_SECONDS};samesite=lax`;
      setLocaleState(next);
      router.refresh();
    },
    [router]
  );

  const value = React.useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): SupportedLocale {
  return React.useContext(LocaleContext).locale;
}

export function useSetLocale(): (locale: SupportedLocale) => void {
  return React.useContext(LocaleContext).setLocale;
}
