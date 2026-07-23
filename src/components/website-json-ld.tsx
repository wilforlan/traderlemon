import { buildWebsiteJsonLd, resolveAppUrl } from "@/lib/site-seo";

export const WebsiteJsonLd = () => {
  const jsonLd = buildWebsiteJsonLd({
    appUrl: resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
