import type { MetadataRoute } from "next";

import { siteConfig } from "../config/site";
import { getLocalizedPath, locales } from "../dictionaries/i18n";
import { getAllBlogSlugs } from "../sanity/fetch";

function fullUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogSlugs = await getAllBlogSlugs();

  const localizedPages = locales.flatMap((locale) => [
    {
      url: fullUrl(getLocalizedPath(locale)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: locale === "tr" ? 1 : 0.95,
    },
    {
      url: fullUrl(getLocalizedPath(locale, "/blog")),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]);

  const blogUrls = blogSlugs.map(({ language, slug }) => ({
    url: fullUrl(getLocalizedPath(language, `/blog/${slug}`)),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...localizedPages,
    ...blogUrls,
  ];
}
