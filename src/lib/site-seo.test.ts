import { describe, expect, it } from "vitest";

import {
  SitePageKeySchema,
  buildPageMetadata,
  buildRootMetadata,
  buildWebsiteJsonLd,
  siteSeo,
} from "./site-seo";

describe("v0peer SEO content", () => {
  it("keeps the brand as the primary document title signal", () => {
    expect(siteSeo.brandName).toBe("v0peer");
    expect(siteSeo.defaultTitle.startsWith("v0peer")).toBe(true);
    expect(siteSeo.defaultTitle).toMatch(/on-chain/i);
    expect(siteSeo.defaultTitle.length).toBeLessThanOrEqual(70);
  });

  it("describes the Second Economy vision without trading-desk framing", () => {
    expect(siteSeo.defaultDescription).toMatch(/second economy/i);
    expect(siteSeo.defaultDescription).toMatch(/APW\$|digital city/i);
    expect(siteSeo.defaultDescription).toMatch(/on-chain/i);
    expect(siteSeo.defaultDescription).not.toMatch(/WalletConnect/i);
    expect(siteSeo.defaultDescription).not.toMatch(/Slack/i);
    expect(siteSeo.defaultDescription.length).toBeLessThanOrEqual(160);
  });

  it("centers Open Graph copy on the on-chain city and the v0peer logo", () => {
    expect(siteSeo.openGraphTitle).toMatch(/The city grows on-chain/i);
    expect(siteSeo.openGraphTitle).toContain("v0peer");
    expect(siteSeo.openGraphDescription.length).toBeLessThanOrEqual(125);
    expect(siteSeo.openGraphDescription).toMatch(/on-chain/i);
    expect(siteSeo.openGraphDescription).toMatch(/Second Economy|APW\$/i);
    expect(siteSeo.openGraphDescription).not.toMatch(/Slack/i);
    expect(siteSeo.twitterDescription.length).toBeLessThanOrEqual(125);
    expect(siteSeo.ogImage.alt).toMatch(/v0peer logo/i);
    expect(siteSeo.ogImage.alt).toMatch(/on-chain/i);
  });

  it("points share images and favicon at the v0peer logo assets", () => {
    expect(siteSeo.ogImage.path).toBe("/v0peer-og.png");
    expect(siteSeo.ogImage.width).toBe(1200);
    expect(siteSeo.ogImage.height).toBe(630);
    expect(siteSeo.logoPath).toBe("/v0peer-logo.png");
    expect(siteSeo.iconPath).toBe("/v0peer-icon.png");
  });

  it("builds root metadata with open graph, twitter, icons, and robots defaults", () => {
    const metadata = buildRootMetadata({
      appUrl: "https://v0peer.example",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://v0peer.example/");
    expect(metadata.openGraph?.title).toBe(siteSeo.openGraphTitle);
    expect(metadata.openGraph?.description).toBe(siteSeo.openGraphDescription);
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(["Second Economy", "APW$", "Agent Play", "v0peer"]),
    );
    expect(metadata.icons).toEqual(
      expect.objectContaining({
        icon: [{ url: siteSeo.iconPath, type: "image/png" }],
        apple: [{ url: siteSeo.iconPath, type: "image/png" }],
      }),
    );
  });

  it("builds page metadata for Second Economy", () => {
    const page = buildPageMetadata({ page: "second-economy" });

    expect(SitePageKeySchema.parse("second-economy")).toBe("second-economy");
    expect(page.title).toBe(siteSeo.pages["second-economy"].title);
    expect(page.description).toMatch(/APW\$/);
    expect(page.description).not.toMatch(/city-builder/i);
    expect(page.openGraph?.url).toBe("/second-economy");
  });

  it("emits website JSON-LD with brand, description, and canonical URL", () => {
    const jsonLd = buildWebsiteJsonLd({
      appUrl: "https://v0peer.example",
    });

    expect(jsonLd.name).toBe("v0peer");
    expect(jsonLd.description).toBe(siteSeo.defaultDescription);
    expect(jsonLd.image).toBe("https://v0peer.example/v0peer-og.png");
    expect(jsonLd.logo).toBe("https://v0peer.example/v0peer-logo.png");
  });
});
