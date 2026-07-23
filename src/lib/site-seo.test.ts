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
    expect(siteSeo.defaultTitle).toMatch(/Second Economy/);
    expect(siteSeo.defaultTitle.length).toBeLessThanOrEqual(70);
  });

  it("describes the Second Economy vision without trading-desk framing", () => {
    expect(siteSeo.defaultDescription).toMatch(/Second Economy/);
    expect(siteSeo.defaultDescription).toMatch(/APW\$/);
    expect(siteSeo.defaultDescription).toMatch(/Agent Play/);
    expect(siteSeo.defaultDescription).not.toMatch(/WalletConnect/i);
    expect(siteSeo.defaultDescription.length).toBeGreaterThanOrEqual(110);
    expect(siteSeo.defaultDescription.length).toBeLessThanOrEqual(170);
  });

  it("provides social card copy about the virtual world and community", () => {
    expect(siteSeo.openGraphTitle).toContain("v0peer");
    expect(siteSeo.openGraphDescription).toMatch(/community|Slack|Second Economy/i);
    expect(siteSeo.twitterTitle).toContain("v0peer");
  });

  it("points share images at the v0peer OG asset", () => {
    expect(siteSeo.ogImage.path).toBe("/v0peer-og.png");
    expect(siteSeo.ogImage.alt).toMatch(/v0peer/);
  });

  it("builds root metadata with open graph, twitter, icons, and robots defaults", () => {
    const metadata = buildRootMetadata({
      appUrl: "https://v0peer.example",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://v0peer.example/");
    expect(metadata.title).toEqual({
      default: siteSeo.defaultTitle,
      template: "%s · v0peer",
    });
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(["Second Economy", "APW$", "Agent Play", "v0peer"]),
    );
  });

  it("builds page metadata for Second Economy", () => {
    const page = buildPageMetadata({ page: "second-economy" });

    expect(SitePageKeySchema.parse("second-economy")).toBe("second-economy");
    expect(page.title).toBe(siteSeo.pages["second-economy"].title);
    expect(page.description).toMatch(/APW\$/);
    expect(page.openGraph?.url).toBe("/second-economy");
  });

  it("emits website JSON-LD with brand, description, and canonical URL", () => {
    const jsonLd = buildWebsiteJsonLd({
      appUrl: "https://v0peer.example",
    });

    expect(jsonLd.name).toBe("v0peer");
    expect(jsonLd.description).toBe(siteSeo.defaultDescription);
  });
});
