import { describe, expect, it } from "vitest";

import { resolveBuyDeskActions } from "./buy-desk";

describe("buy desk wallet actions", () => {
  it("shows connect wallet and keeps buy disabled when disconnected", () => {
    expect(
      resolveBuyDeskActions({
        walletConnected: false,
        projectConfigured: true,
        canQuote: true,
      }),
    ).toEqual({
      showConnectWallet: true,
      buyEnabled: false,
      buyLabel: "Buy APU",
      connectLabel: "Connect wallet",
    });
  });

  it("hides connect wallet and enables buy after the wallet is connected", () => {
    expect(
      resolveBuyDeskActions({
        walletConnected: true,
        projectConfigured: true,
        canQuote: true,
      }),
    ).toEqual({
      showConnectWallet: false,
      buyEnabled: true,
      buyLabel: "Buy APU",
      connectLabel: "Connect wallet",
    });
  });

  it("keeps buy disabled when rates cannot produce a quote", () => {
    expect(
      resolveBuyDeskActions({
        walletConnected: true,
        projectConfigured: true,
        canQuote: false,
      }).buyEnabled,
    ).toBe(false);
  });

  it("disables connect when WalletConnect is not configured", () => {
    const actions = resolveBuyDeskActions({
      walletConnected: false,
      projectConfigured: false,
      canQuote: true,
    });
    expect(actions.showConnectWallet).toBe(true);
    expect(actions.buyEnabled).toBe(false);
  });
});
