import type { MetadataRoute } from "next";

import { siteConfig } from "../config/site";
import { getBlogSlugs } from "../sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogUrls = (await getBlogSlugs()).map(({ slug }) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
