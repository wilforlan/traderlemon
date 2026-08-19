import { describe, expect, it } from "vitest";

import { secondEconomyCopy } from "./second-economy-copy";

describe("Second Economy picture copy", () => {
  it("uses an original civic picture instead of SimCity or city-builder games", () => {
    const blob = JSON.stringify(secondEconomyCopy);

    expect(blob).not.toMatch(/SimCity/i);
    expect(blob).not.toMatch(/city-builder/i);
    expect(blob).not.toMatch(/City builder/i);
    expect(secondEconomyCopy.picture.headline).toMatch(/neighborhood|street|square|commons/i);
    expect(secondEconomyCopy.picture.headline).toMatch(/earn|trade|fund/i);
    expect(secondEconomyCopy.picture.body.length).toBeGreaterThan(40);
  });
});
