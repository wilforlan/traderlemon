import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { storeListing } from "./store-listing";

const publicRoot = join(__dirname, "../../public");

describe("Landing app screenshots", () => {
  it("ships a web-sized JPEG for each iPhone screenshot", () => {
    storeListing.marketing.screenshots.forEach((screenshot) => {
      expect(existsSync(join(publicRoot, screenshot.src))).toBe(true);
    });
  });
});
