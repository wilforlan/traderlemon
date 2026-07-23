import { describe, expect, it } from "vitest";

import {
  buildWalletConnectMetadata,
  hasWalletConnectProjectId,
  resolveWalletConnectProjectId,
  shortenWalletAddress,
} from "./wallet-connect";

describe("WalletConnect project configuration", () => {
  it("treats missing or blank project IDs as unconfigured", () => {
    expect(hasWalletConnectProjectId(undefined)).toBe(false);
    expect(hasWalletConnectProjectId("")).toBe(false);
    expect(hasWalletConnectProjectId("   ")).toBe(false);
    expect(resolveWalletConnectProjectId("   ")).toBeNull();
  });

  it("resolves a trimmed WalletConnect project ID", () => {
    expect(hasWalletConnectProjectId("abc123")).toBe(true);
    expect(resolveWalletConnectProjectId("  abc123  ")).toBe("abc123");
  });
});

describe("WalletConnect display helpers", () => {
  it("shortens Solana addresses for UI chips", () => {
    expect(
      shortenWalletAddress("So11111111111111111111111111111111111111112"),
    ).toBe("So11…1112");
  });

  it("builds AppKit metadata from the v0peer site origin", () => {
    expect(
      buildWalletConnectMetadata({
        appUrl: "https://v0peer.example",
      }),
    ).toEqual({
      name: "v0peer",
      description: "Convert SOL to APU on v0peer, the Agent Play peer trading desk.",
      url: "https://v0peer.example",
      icons: ["https://v0peer.example/v0peer-icon.png"],
    });
  });
});
