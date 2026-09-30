import { describe, expect, it } from "vitest";

import { SUPPORT_EMAIL, WORLD_SERVER_URL } from "./site-links";
import { siteSeo } from "./site-seo";
import { storeListing } from "./store-listing";

describe("App Store listing pages", () => {
  it("publishes a support route with a reachable contact email", () => {
    expect(storeListing.support.path).toBe("/support");
    expect(storeListing.support.email).toBe(SUPPORT_EMAIL);
    expect(storeListing.support.email).toBe("williams@viroke.com");
    expect(storeListing.support.headline).toMatch(/support/i);
    expect(storeListing.support.body).toMatch(/v0peer/i);
    expect(storeListing.support.topics.length).toBeGreaterThanOrEqual(3);
    expect(siteSeo.pages.support.path).toBe("/support");
  });

  it("publishes a marketing route that describes the official v0peer app", () => {
    expect(storeListing.marketing.path).toBe("/app");
    expect(storeListing.marketing.headline).toMatch(/v0peer/i);
    expect(storeListing.marketing.body).toMatch(/Origin/i);
    expect(storeListing.marketing.body).toContain(WORLD_SERVER_URL);
    expect(storeListing.marketing.features.length).toBeGreaterThanOrEqual(3);
    expect(storeListing.marketing.screenshots).toHaveLength(4);
    storeListing.marketing.screenshots.forEach((screenshot) => {
      expect(screenshot.src).toMatch(/^\/app-screenshots\/iphone-\d{2}-.+\.jpg$/);
      expect(screenshot.alt.length).toBeGreaterThan(8);
      expect(screenshot.label.length).toBeGreaterThan(2);
    });
    expect(siteSeo.pages.app.path).toBe("/app");
  });
});
