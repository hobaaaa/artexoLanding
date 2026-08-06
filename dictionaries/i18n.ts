export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedPath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function getAlternateLanguages(path = "") {
  return {
    tr: getLocalizedPath("tr", path),
    en: getLocalizedPath("en", path),
    "x-default": getLocalizedPath(defaultLocale, path),
  };
}

