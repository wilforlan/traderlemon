import type { MetadataRoute } from "next";

import { resolveAppUrl, siteSeo } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL);
  const lastModified = new Date();

  return [
    {
      url: `${appUrl}${siteSeo.pages.home.path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${appUrl}${siteSeo.pages["second-economy"].path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${appUrl}${siteSeo.pages.app.path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${appUrl}${siteSeo.pages.support.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${appUrl}${siteSeo.pages.privacy.path}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${appUrl}${siteSeo.pages.terms.path}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
