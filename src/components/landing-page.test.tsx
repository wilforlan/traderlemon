import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { landingCopy } from "@/lib/landing-copy";
import { WORLD_SERVER_URL } from "@/lib/site-links";
import { storeListing } from "@/lib/store-listing";

import { LandingPage } from "./landing-page";

describe("Landing hero", () => {
  it("shows app screenshots with a coming-soon download and a web continuation", () => {
    const html = renderToStaticMarkup(<LandingPage />);

    expect(html).toContain(landingCopy.heroHeadline);
    expect(html).toContain(landingCopy.downloadApp.label);
    expect(html).toContain(landingCopy.downloadApp.status);
    expect(html).toContain(landingCopy.continueOnWeb.label);
    expect(html).toContain(`href="${WORLD_SERVER_URL}"`);
    expect(html).not.toMatch(/SimCity/i);
    expect(html).not.toMatch(/city-builder/i);

    storeListing.marketing.screenshots.forEach((screenshot) => {
      expect(html).toContain(`src="${screenshot.src}"`);
      expect(html).toContain(`alt="${screenshot.alt}"`);
    });

    expect(html).toContain("lg:grid-cols-2");
  });
});
