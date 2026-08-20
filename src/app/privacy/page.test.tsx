import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/privacy",
}));

import { SUPPORT_EMAIL } from "@/lib/site-links";
import { LEGAL_OPERATOR, privacyPolicy } from "@/lib/legal";

import PrivacyPage from "./page";

describe("Privacy Policy page", () => {
  it("publishes Viroke Technologies Inc. privacy terms for the v0peer app and site", () => {
    const html = renderToStaticMarkup(<PrivacyPage />);

    expect(html).toContain(privacyPolicy.title);
    expect(html).toContain(LEGAL_OPERATOR);
    expect(html).toContain("Delaware");
    expect(html).toContain(`mailto:${SUPPORT_EMAIL}`);
    expect(html).toContain("/terms");
    expect(html).toMatch(/do not sell/i);
  });
});
