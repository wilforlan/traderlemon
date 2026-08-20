import { describe, expect, it } from "vitest";

import { SUPPORT_EMAIL, WORLD_SERVER_URL } from "./site-links";
import { siteSeo } from "./site-seo";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_OPERATOR,
  privacyPolicy,
  termsOfUse,
} from "./legal";

describe("Viroke legal documents", () => {
  it("identifies Viroke Technologies Inc. as a Delaware operator", () => {
    expect(LEGAL_OPERATOR).toBe("Viroke Technologies Inc.");
    expect(privacyPolicy.operator).toBe(LEGAL_OPERATOR);
    expect(termsOfUse.operator).toBe(LEGAL_OPERATOR);
    expect(privacyPolicy.jurisdiction).toMatch(/Delaware/);
    expect(termsOfUse.jurisdiction).toMatch(/Delaware/);
    expect(privacyPolicy.effectiveDate).toBe(LEGAL_EFFECTIVE_DATE);
    expect(termsOfUse.effectiveDate).toBe(LEGAL_EFFECTIVE_DATE);
    expect(privacyPolicy.contactEmail).toBe(SUPPORT_EMAIL);
    expect(termsOfUse.contactEmail).toBe(SUPPORT_EMAIL);
  });

  it("discloses native app motion use and Origin as a third-party world", () => {
    const privacy = JSON.stringify(privacyPolicy);

    expect(privacy).toMatch(/motion|accelerometer/i);
    expect(privacy).toContain(WORLD_SERVER_URL);
    expect(privacy).toMatch(/WebView|web view|in-app browser/i);
    expect(privacy).toMatch(/do not sell/i);
    expect(privacy).toMatch(/under 13/i);
    expect(privacy).toMatch(/track/i);
  });

  it("binds use of v0peer to Delaware terms with Apple licensed-application language", () => {
    const terms = JSON.stringify(termsOfUse);

    expect(terms).toMatch(/as is/i);
    expect(terms).toMatch(/limitation of liability/i);
    expect(terms).toMatch(/Delaware/);
    expect(terms).toMatch(/arbitration/i);
    expect(terms).toMatch(/Licensed Application|App Store/i);
    expect(terms).toMatch(/APW\$|virtual/i);
    expect(terms).toMatch(/credentials/i);
    expect(termsOfUse.path).toBe("/terms");
    expect(privacyPolicy.path).toBe("/privacy");
    expect(siteSeo.pages.privacy.path).toBe("/privacy");
    expect(siteSeo.pages.terms.path).toBe("/terms");
  });
});
