import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { LandingPage } from "./landing-page";
import { SiteHeader } from "./site-header";
import { SiteLogo } from "./site-logo";

describe("v0peer logo", () => {
  it("renders the brand mark with an accessible name", () => {
    const html = renderToStaticMarkup(<SiteLogo />);

    expect(html).toContain('src="/v0peer-logo.png"');
    expect(html).toContain('alt="v0peer"');
  });

  it("appears in the site header wordmark", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain('src="/v0peer-logo.png"');
    expect(html).toContain("v0peer");
  });

  it("appears in the landing hero beside the brand name", () => {
    const html = renderToStaticMarkup(<LandingPage />);

    expect(html).toContain('src="/v0peer-logo.png"');
    expect(html).toContain("v0peer");
  });
});
