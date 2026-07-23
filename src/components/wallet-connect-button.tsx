"use client";

import { useCallback, useEffect, useState } from "react";
import { Link2, Unplug, Wallet } from "lucide-react";

import {
  readPhantomAddress,
  type PhantomProviderLike,
} from "@/lib/phantom-wallet";

type ConnectedWallet = {
  readonly address: string;
  readonly label: string;
};

const shorten = (address: string): string =>
  `${address.slice(0, 4)}…${address.slice(-4)}`;

type PhantomProvider = PhantomProviderLike & {
  readonly isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } | null }>;
  disconnect: () => Promise<void>;
  on?: (event: string, handler: () => void) => void;
  off?: (event: string, handler: () => void) => void;
};

const getPhantom = (): PhantomProvider | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const provider = (
    window as Window & { solana?: PhantomProvider; phantom?: { solana?: PhantomProvider } }
  ).solana;
  if (provider?.isPhantom === true) {
    return provider;
  }
  return (window as Window & { phantom?: { solana?: PhantomProvider } }).phantom
    ?.solana ?? null;
};

export const WalletConnectButton = () => {
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  const syncPhantom = useCallback(() => {
    const address = readPhantomAddress(getPhantom());
    if (address !== null) {
      setWallet({
        address,
        label: "Phantom",
      });
    }
  }, []);

  useEffect(() => {
    syncPhantom();
  }, [syncPhantom]);

  const connectPhantom = async () => {
    setBusy(true);
    setError(null);
    try {
      const phantom = getPhantom();
      if (phantom === null) {
        setError(
          "No Solana wallet detected. Install Phantom or configure WalletConnect project ID.",
        );
        return;
      }
      const connected = await phantom.connect();
      const address = readPhantomAddress(connected);
      if (address === null) {
        setError("Wallet connected without a public key.");
        return;
      }
      setWallet({
        address,
        label: "Phantom / WalletConnect-ready",
      });
    } catch (connectError) {
      setError(
        connectError instanceof Error
          ? connectError.message
          : "Wallet connection failed",
      );
    } finally {
      setBusy(false);
    }
  };

  const disconnect = async () => {
    const phantom = getPhantom();
    if (phantom !== null) {
      await phantom.disconnect().catch(() => undefined);
    }
    setWallet(null);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[color:var(--line)] bg-white/85 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-deep)]">
            WalletConnect
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[color:var(--ink)]">
            Connect the Solana wallet you want to fund from
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[color:var(--ink-muted)]">
            Use your preferred crypto wallet. WalletConnect project ID{" "}
            {projectId !== undefined && projectId.length > 0
              ? "is configured for multi-wallet sessions."
              : "can be set via NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID; Phantom works today."}
          </p>
        </div>
        {wallet === null ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void connectPhantom()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Wallet size={16} aria-hidden />
            {busy ? "Connecting…" : "Connect wallet"}
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--mint)]/40 px-3 py-2 text-sm font-medium text-[color:var(--ink)]">
              <Link2 size={14} aria-hidden />
              {wallet.label}: {shorten(wallet.address)}
            </span>
            <button
              type="button"
              onClick={() => void disconnect()}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-3 py-2 text-sm text-[color:var(--ink-muted)]"
            >
              <Unplug size={14} aria-hidden />
              Disconnect
            </button>
          </div>
        )}
      </div>
      {error !== null ? (
        <p className="mt-3 text-sm text-red-700">{error}</p>
      ) : null}
    </section>
  );
};
