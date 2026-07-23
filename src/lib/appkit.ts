import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

import { resolveAppUrl } from "@/lib/site-seo";
import {
  buildWalletConnectMetadata,
  resolveWalletConnectProjectId,
} from "@/lib/wallet-connect";

let initialized = false;

export const initAppKit = (): boolean => {
  if (initialized) {
    return true;
  }

  const projectId = resolveWalletConnectProjectId(
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  );
  if (projectId === null) {
    return false;
  }

  const metadata = buildWalletConnectMetadata({
    appUrl: resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL),
  });

  createAppKit({
    adapters: [new SolanaAdapter()],
    networks: [solana],
    metadata,
    projectId,
    themeMode: "light",
    features: {
      analytics: true,
      email: false,
      socials: false,
    },
  });

  initialized = true;
  return true;
};
