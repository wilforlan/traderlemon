import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/terms",
}));

import { SUPPORT_EMAIL } from "@/lib/site-links";
import { LEGAL_OPERATOR, termsOfUse } from "@/lib/legal";

import TermsPage from "./page";

describe("Terms of Use page", () => {
  it("publishes Viroke Technologies Inc. terms for the v0peer app and site", () => {
    const html = renderToStaticMarkup(<TermsPage />);

    expect(html).toContain(termsOfUse.title);
    expect(html).toContain(LEGAL_OPERATOR);
    expect(html).toContain("Delaware");
    expect(html).toContain(`mailto:${SUPPORT_EMAIL}`);
    expect(html).toContain("/privacy");
    expect(html).toMatch(/as is/i);
  });
});
