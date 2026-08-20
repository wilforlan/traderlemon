import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { storeFooterLinks } from "@/lib/site-links";

import { SiteFooter } from "./site-footer";

describe("Site footer", () => {
  it("links to App Store support and marketing pages", () => {
    const html = renderToStaticMarkup(<SiteFooter />);

    storeFooterLinks.forEach((link) => {
      expect(html).toContain(`href="${link.href}"`);
      expect(html).toContain(link.label);
    });
    expect(html).toContain("Viroke Technologies Inc.");
  });
});
