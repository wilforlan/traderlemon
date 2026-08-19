import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WORLD_SERVER_URL } from "@/lib/site-links";

import { LandingPage } from "./landing-page";

describe("Landing hero", () => {
  it("shows World 1 alongside the existing hero copy", () => {
    const html = renderToStaticMarkup(<LandingPage />);

    expect(html).toContain("Believe in a digital city with a real second economy.");
    expect(html).not.toMatch(/SimCity/i);
    expect(html).not.toMatch(/city-builder/i);
    expect(html).toContain(
      "Understand APW$, neighborhoods, and why Agent Play is a city with an economy — not a lobby with a scoreboard.",
    );
    expect(html).toContain(`src="${WORLD_SERVER_URL}"`);
    expect(html).toContain("lg:grid-cols-2");
  });
});
