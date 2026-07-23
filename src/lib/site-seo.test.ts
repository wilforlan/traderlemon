import { describe, expect, it } from "vitest";

import {
  SitePageKeySchema,
  buildPageMetadata,
  buildRootMetadata,
  buildWebsiteJsonLd,
  siteSeo,
} from "./site-seo";

describe("Traderlemon SEO content", () => {
  it("keeps the brand as the primary document title signal", () => {
    expect(siteSeo.brandName).toBe("Traderlemon");
    expect(siteSeo.defaultTitle.startsWith("Traderlemon")).toBe(true);
    expect(siteSeo.defaultTitle.length).toBeLessThanOrEqual(70);
  });

  it("describes SOL to APU trade for Agent Play without exceeding meta description length", () => {
    expect(siteSeo.defaultDescription).toMatch(/SOL/i);
    expect(siteSeo.defaultDescription).toMatch(/APU/);
    expect(siteSeo.defaultDescription).toMatch(/Agent Play/);
    expect(siteSeo.defaultDescription.length).toBeGreaterThanOrEqual(110);
    expect(siteSeo.defaultDescription.length).toBeLessThanOrEqual(170);
  });

  it("provides social card copy distinct from the HTML description when needed", () => {
    expect(siteSeo.openGraphDescription.length).toBeGreaterThan(40);
    expect(siteSeo.twitterDescription.length).toBeGreaterThan(40);
    expect(siteSeo.openGraphTitle).toContain("Traderlemon");
    expect(siteSeo.twitterTitle).toContain("Traderlemon");
  });

  it("points share images at the Traderlemon OG asset", () => {
    expect(siteSeo.ogImage.path).toBe("/traderlemon-og.png");
    expect(siteSeo.ogImage.width).toBe(1200);
    expect(siteSeo.ogImage.height).toBe(630);
    expect(siteSeo.ogImage.alt).toMatch(/Traderlemon/);
  });

  it("builds root metadata with open graph, twitter, icons, and robots defaults", () => {
    const metadata = buildRootMetadata({
      appUrl: "https://traderlemon.example",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://traderlemon.example/");
    expect(metadata.title).toEqual({
      default: siteSeo.defaultTitle,
      template: "%s · Traderlemon",
    });
    expect(metadata.description).toBe(siteSeo.defaultDescription);
    expect(metadata.openGraph?.images).toEqual([
      {
        url: siteSeo.ogImage.path,
        width: 1200,
        height: 630,
        alt: siteSeo.ogImage.alt,
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: siteSeo.twitterTitle,
      images: [siteSeo.ogImage.path],
    });
    expect(metadata.icons).toMatchObject({
      icon: [{ url: "/traderlemon-icon.png", type: "image/png" }],
      apple: [{ url: "/traderlemon-icon.png", type: "image/png" }],
    });
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(["APU", "Solana", "Agent Play", "Traderlemon"]),
    );
  });

  it("builds page metadata for get-started and merchant routes", () => {
    const getStarted = buildPageMetadata({ page: "get-started" });
    const merchant = buildPageMetadata({ page: "merchant" });

    expect(SitePageKeySchema.parse("get-started")).toBe("get-started");
    expect(getStarted.title).toBe(siteSeo.pages["get-started"].title);
    expect(getStarted.description).toMatch(/credentials/i);
    expect(getStarted.openGraph?.url).toBe("/get-started");
    expect(merchant.title).toBe(siteSeo.pages.merchant.title);
    expect(merchant.description).toMatch(/merchant/i);
    expect(merchant.openGraph?.url).toBe("/merchant");
  });

  it("emits website JSON-LD with brand, description, and canonical URL", () => {
    const jsonLd = buildWebsiteJsonLd({
      appUrl: "https://traderlemon.example",
    });

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("WebSite");
    expect(jsonLd.name).toBe("Traderlemon");
    expect(jsonLd.url).toBe("https://traderlemon.example");
    expect(jsonLd.description).toBe(siteSeo.defaultDescription);
  });
});
