"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { Unplug, Wallet } from "lucide-react";
import clsx from "clsx";

import {
  hasWalletConnectProjectId,
  shortenWalletAddress,
} from "@/lib/wallet-connect";

const links = [
  { href: "/", label: "Trade" },
  { href: "/merchant", label: "Merchants" },
  { href: "/get-started", label: "Get started" },
] as const;

const HeaderWalletControls = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const connected =
    isConnected && typeof address === "string" && address.length > 0;

  if (connected) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <span className="bank-badge normal-case tracking-normal">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" />
          {shortenWalletAddress(address)}
        </span>
        <button
          type="button"
          onClick={() => {
            void disconnect();
          }}
          className="btn-fluid btn-ghost px-3 py-1.5 text-sm"
        >
          <Unplug size={14} aria-hidden />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        void open({ view: "Connect" });
      }}
      className="btn-fluid btn-secondary hidden px-3.5 py-1.5 text-sm sm:inline-flex"
    >
      <Wallet size={14} aria-hidden />
      Connect
    </button>
  );
};

export const SiteHeader = () => {
  const pathname = usePathname();
  const projectConfigured = hasWalletConnectProjectId(
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  );

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)]/80 bg-[color:var(--surface)]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)]">
            v0peer
          </span>
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-muted)] sm:inline">
            Peer desk
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "btn-fluid px-3 py-1.5 text-sm",
                pathname === link.href
                  ? "bg-[color:var(--ink)] text-white shadow-[var(--shadow-sm)]"
                  : "btn-ghost",
              )}
            >
              {link.label}
            </Link>
          ))}
          {projectConfigured ? <HeaderWalletControls /> : null}
        </nav>
      </div>
    </header>
  );
};
