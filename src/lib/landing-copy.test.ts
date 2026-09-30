import { describe, expect, it } from "vitest";

import { WORLD_SERVER_URL } from "./site-links";
import { landingCopy } from "./landing-copy";

describe("Landing paths into the city", () => {
  it("offers the App Store download as coming soon and a live web continuation", () => {
    expect(landingCopy.heroHeadline).toMatch(/city/i);
    expect(landingCopy.heroHeadline).toMatch(/mobile|iPhone/i);
    expect(landingCopy.heroBody).toMatch(/Second Economy/i);
    expect(landingCopy.heroBody).toMatch(/earn/i);
    expect(landingCopy.heroBody).toMatch(/\+APU|APU/);
    expect(landingCopy.heroBody).toMatch(/available/i);
    expect(landingCopy.heroBody).toMatch(/browser|web/i);
    expect(landingCopy.downloadApp.label).toMatch(/download/i);
    expect(landingCopy.downloadApp.status).toBe("Available on iOS");
    expect(landingCopy.continueOnWeb.label).toBe("Continue on the web");
    expect(landingCopy.continueOnWeb.href).toBe(WORLD_SERVER_URL);
    expect(landingCopy.screenshotSection.headline.length).toBeGreaterThan(8);
    expect(landingCopy.screenshotSection.body).toMatch(/available/i);
  });
});
