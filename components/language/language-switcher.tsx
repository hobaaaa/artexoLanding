"use client";

import { LanguagesIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { type Locale, locales } from "../../dictionaries/i18n";
import { Button } from "../ui/button";

const localeLabels: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
};

function getNextPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  const currentLocale = segments[1];

  if (locales.includes(currentLocale as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }

  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = locale === "tr" ? "en" : "tr";
  const href = getNextPath(pathname, nextLocale);

  return (
    <Button variant="outline" size="sm" asChild>
      <a
        href={href}
        aria-label={`Switch language to ${localeLabels[nextLocale]}`}
        onClick={() => {
          document.cookie = `artexo-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
        }}
      >
        <LanguagesIcon className="size-4" />
        {localeLabels[locale]}
      </a>
    </Button>
  );
}
