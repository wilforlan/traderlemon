import { describe, expect, it } from "vitest";

import {
  EARN_URL,
  resolveAgentPlayUrl,
  resolveSlackCommunityUrl,
  siteNav,
} from "./site-links";

describe("v0peer public links", () => {
  it("points Earn at Econext", () => {
    expect(EARN_URL).toBe("https://econext.llc");
  });

  it("exposes Second Economy as an internal route in primary nav", () => {
    expect(siteNav).toEqual(
      expect.arrayContaining([
        { kind: "internal", href: "/second-economy", label: "Second Economy" },
        { kind: "external", href: "https://econext.llc", label: "Earn" },
      ]),
    );
  });

  it("resolves Slack and Agent Play URLs from env with safe defaults", () => {
    expect(resolveSlackCommunityUrl(" https://join.slack.com/t/example ")).toBe(
      "https://join.slack.com/t/example",
    );
    expect(resolveSlackCommunityUrl(undefined)).toBeNull();
    expect(resolveAgentPlayUrl(" https://play.example ")).toBe(
      "https://play.example",
    );
    expect(resolveAgentPlayUrl(undefined)).toBe("https://agentplay.world");
  });
});
