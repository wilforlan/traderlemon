import type { MetadataRoute } from "next";

import { resolveAppUrl, siteSeo } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL);
  const lastModified = new Date();

  return [
    {
      url: `${appUrl}${siteSeo.pages.home.path}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${appUrl}${siteSeo.pages["get-started"].path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${appUrl}${siteSeo.pages.merchant.path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
