export type BuyDeskActions = {
  readonly showConnectWallet: boolean;
  readonly buyEnabled: boolean;
  readonly buyLabel: "Buy APU";
  readonly connectLabel: "Connect wallet";
};

type ResolveBuyDeskActionsOptions = {
  readonly walletConnected: boolean;
  readonly projectConfigured: boolean;
  readonly canQuote: boolean;
};

export const resolveBuyDeskActions = (
  options: ResolveBuyDeskActionsOptions,
): BuyDeskActions => {
  const { walletConnected, canQuote } = options;

  return {
    showConnectWallet: !walletConnected,
    buyEnabled: walletConnected && canQuote,
    buyLabel: "Buy APU",
    connectLabel: "Connect wallet",
  };
};
