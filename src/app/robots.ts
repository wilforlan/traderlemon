import type { MetadataRoute } from "next";

import { resolveAppUrl } from "@/lib/site-seo";

export default function robots(): MetadataRoute.Robots {
  const appUrl = resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${appUrl}/sitemap.xml`,
    host: appUrl,
  };
}
