import type { MetadataRoute } from "next";

import { siteSeo } from "@/lib/site-seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSeo.brandName,
    short_name: siteSeo.brandName,
    description: siteSeo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f3faf5",
    theme_color: "#1b7a4e",
    icons: [
      {
        src: siteSeo.iconPath,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
