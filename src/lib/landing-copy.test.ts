import { describe, expect, it } from "vitest";

import { WORLD_SERVER_URL } from "./site-links";
import { landingCopy } from "./landing-copy";

describe("Landing paths into the city", () => {
  it("offers the App Store download as coming soon and a live web continuation", () => {
    expect(landingCopy.heroHeadline).toMatch(/city/i);
    expect(landingCopy.heroHeadline).toMatch(/mobile|iPhone/i);
    expect(landingCopy.heroBody).toBe(
      "Origin of Second Economy, now accessible on iPhone and iPad. Earn money in a living city — continue on the web or Download from the App Store.",
    );
    expect(landingCopy.downloadApp.label).toMatch(/download/i);
    expect(landingCopy.downloadApp.status).toBe("Available on iOS");
    expect(landingCopy.readOurStory.label).toBe("Read our story");
    expect(landingCopy.readOurStory.href).toBe("https://vzeropeer.substack.com/");
    expect(landingCopy.heroNext).toBe("Join Us");
    expect(landingCopy.continueOnWeb.label).toBe("Continue on the web");
    expect(landingCopy.continueOnWeb.href).toBe(WORLD_SERVER_URL);
    expect(landingCopy.screenshotSection.headline.length).toBeGreaterThan(8);
    expect(landingCopy.screenshotSection.body).toMatch(/available/i);
    expect(landingCopy.world2Section.headline.length).toBeGreaterThan(8);
    expect(landingCopy.world2Section.body).toMatch(/Maple Ave/i);
    expect(landingCopy.world2Section.body).toMatch(/citizenship/i);
    expect(landingCopy.world2Section.expectations).toHaveLength(3);
    expect(landingCopy.world2Section.ctaHref).toBe("https://world2.v0peer.org");
    expect(landingCopy.world2Section.ctaLabel).toBe("Try World 2");
    expect(landingCopy.world2Section.betaLabel).toBe("Beta");
    expect(landingCopy.world2Section.betaNote).toMatch(/beta/i);
    expect(landingCopy.world2Section.betaNote).toMatch(/feedback|tell us/i);
    expect(landingCopy.world2Section.betaNote).toMatch(/World 1 is stable/i);
    expect(landingCopy.world2Section.betaNote).toMatch(/in the works/i);
  });
});
