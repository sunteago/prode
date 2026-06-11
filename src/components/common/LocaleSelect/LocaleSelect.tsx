"use client";

import { useLocale, useSetLocale } from "@/locale";
import { SUPPORTED_LOCALES } from "@/locale/shared";
import { className } from "@/utils/classname";
import styles from "./LocaleSelect.module.scss";

interface LocaleSelectProps {}

// Cookie-based locale switcher. Writes the locale cookie via the LocaleProvider
// and refreshes so server-rendered parts follow. URLs are unchanged.
export function LocaleSelect(props: LocaleSelectProps) {
  const current = useLocale();
  const setLocale = useSetLocale();

  return (
    <div className={styles.localeSelect}>
      {SUPPORTED_LOCALES.map((locale, i, arr) => (
        <div key={locale}>
          <a
            role="button"
            className={className(locale === current ? styles.active : "")}
            onClick={() => setLocale(locale)}
          >
            {locale.toLocaleUpperCase()}
          </a>
          <span>{arr.length > i + 1 ? "|" : ""}</span>
        </div>
      ))}
    </div>
  );
}
