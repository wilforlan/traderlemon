import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/app",
}));

import { WORLD_SERVER_URL } from "@/lib/site-links";
import { storeListing } from "@/lib/store-listing";

import AppMarketingPage from "./page";

describe("App marketing page", () => {
  it("describes the official v0peer app and how to enter Origin", () => {
    const html = renderToStaticMarkup(<AppMarketingPage />);

    expect(html).toContain(storeListing.marketing.headline);
    expect(html).toContain("Load");
    expect(html).toContain("Origin");
    expect(html).toContain(WORLD_SERVER_URL);
    expect(html).toContain("/second-economy");
    expect(html).toContain("/support");
  });
});
