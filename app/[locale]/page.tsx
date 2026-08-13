import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LandingPage from "../../components/landing-page";
import { siteConfig } from "../../config/site";
import { getAlternateLanguages, getLocalizedPath, isLocale, type Locale,locales } from "../../dictionaries/i18n";
import { landingDictionary } from "../../dictionaries/landing";
import { getBlogPosts } from "../../sanity/fetch";

interface LocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = landingDictionary[locale];
  const path = getLocalizedPath(locale);

  return {
    title: t.seo.title,
    description: t.seo.description,
    keywords: t.seo.keywords,
    alternates: {
      canonical: path,
      languages: getAlternateLanguages(),
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `${siteConfig.url}${path}`,
      title: t.seo.title,
      description: t.seo.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1536,
          height: 1024,
          alt: t.hero.logoAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const latestPosts = await getBlogPosts(locale, 2);

  return (
    <LandingPage
      locale={locale}
      t={landingDictionary[locale]}
      latestPosts={latestPosts}
    />
  );
}
