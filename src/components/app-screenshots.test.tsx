import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { storeListing } from "@/lib/store-listing";

import { AppScreenshots } from "./app-screenshots";

describe("App screenshots", () => {
  it("renders every iPhone screenshot with its label", () => {
    const html = renderToStaticMarkup(<AppScreenshots />);

    storeListing.marketing.screenshots.forEach((screenshot) => {
      expect(html).toContain(`src="${screenshot.src}"`);
      expect(html).toContain(`alt="${screenshot.alt}"`);
      expect(html).toContain(screenshot.label);
    });
  });
});
