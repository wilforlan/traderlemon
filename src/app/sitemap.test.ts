import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("includes App Store support and marketing URLs", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls.some((url) => url.endsWith("/support"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/app"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/privacy"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/terms"))).toBe(true);
  });
});
