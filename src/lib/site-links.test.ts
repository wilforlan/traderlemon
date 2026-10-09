import { describe, expect, it } from "vitest";

import {
  EARN_URL,
  SUPPORT_EMAIL,
  WORLD2_URL,
  WORLD_SERVER_HOST,
  WORLD_SERVER_URL,
  resolveAgentPlayUrl,
  resolveSlackCommunityUrl,
  siteNav,
  storeFooterLinks,
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
    expect(resolveAgentPlayUrl(undefined)).toBe("https://agent-play.com");
  });

  it("publishes the canonical world server URL", () => {
    expect(WORLD_SERVER_HOST).toBe("world1.v0peer.org");
    expect(WORLD_SERVER_URL).toBe("https://world1.v0peer.org");
  });

  it("publishes World 2 as its own page origin", () => {
    expect(WORLD2_URL).toBe("https://world2.v0peer.org");
  });

  it("publishes App Store support contact and listing routes", () => {
    expect(SUPPORT_EMAIL).toBe("williams@viroke.com");
    expect(storeFooterLinks).toEqual(
      expect.arrayContaining([
        { href: "/app", label: "The app" },
        { href: "/support", label: "Support" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ]),
    );
  });

});
