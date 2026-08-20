import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/support",
}));

import { SUPPORT_EMAIL, WORLD_SERVER_URL } from "@/lib/site-links";
import { storeListing } from "@/lib/store-listing";

import SupportPage from "./page";

describe("Support page", () => {
  it("offers email contact and help for the v0peer app", () => {
    const html = renderToStaticMarkup(<SupportPage />);

    expect(html).toContain(storeListing.support.headline);
    expect(html).toContain(`mailto:${SUPPORT_EMAIL}`);
    expect(html).toContain(SUPPORT_EMAIL);
    expect(html).toContain(WORLD_SERVER_URL);
    expect(html).toContain("Shake");
    expect(html).toContain("/get-started");
    expect(html).toContain("/app");
  });
});
