import data from "./locale.json";
import countries from "./countries.json";
import { LocaleData } from "./types";

export function localizedText(locale: string) {
  //@ts-ignore
  return data[locale || "es"] as LocaleData;
}

export function localizedCountries(locale: string) {
  const table = (countries as Record<
    string,
    Record<string, { short: string; long: string }>
  >)[locale || "es"];
  return (code: string, name: string) => {
    return table?.[code]?.long ?? name;
  };
}
