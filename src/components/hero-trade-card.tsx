"use client";

import { useMemo, useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  ArrowDownUp,
  BadgeCheck,
  LoaderCircle,
  Sparkles,
  Wallet,
} from "lucide-react";

import { resolveBuyDeskActions } from "@/lib/buy-desk";
import {
  quoteApuToSol,
  quoteSolToApu,
  type MarketRates,
} from "@/lib/conversion";
import { formatRateLabel } from "@/lib/market-series";
import {
  hasWalletConnectProjectId,
  shortenWalletAddress,
} from "@/lib/wallet-connect";

type Direction = "sol-to-apu" | "apu-to-sol";

type HeroTradeCardProps = {
  readonly rates: MarketRates | null;
  readonly ratesLoading: boolean;
  readonly ratesError: string | null;
};

export const HeroTradeCard = ({
  rates,
  ratesLoading,
  ratesError,
}: HeroTradeCardProps) => {
  const projectConfigured = hasWalletConnectProjectId(
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  );
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [direction, setDirection] = useState<Direction>("sol-to-apu");
  const [amount, setAmount] = useState("0.1");

  const walletConnected =
    isConnected && typeof address === "string" && address.length > 0;
  const parsedAmount = Number(amount);

  const quote = useMemo(() => {
    if (rates === null || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return null;
    }
    if (direction === "sol-to-apu") {
      return {
        outLabel: "APU" as const,
        outValue: quoteSolToApu({ solAmount: parsedAmount, rates }),
      };
    }
    return {
      outLabel: "SOL" as const,
      outValue: quoteApuToSol({ apuAmount: parsedAmount, rates }),
    };
  }, [direction, parsedAmount, rates]);

  const canQuote =
    quote !== null &&
    ratesError === null &&
    (quote.outLabel === "APU" ? quote.outValue > 0 : quote.outValue > 0);

  const actions = resolveBuyDeskActions({
    walletConnected,
    projectConfigured,
    canQuote,
  });

  const onBuy = () => {
    if (!actions.buyEnabled) {
      return;
    }
    document.getElementById("account")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="trade"
      className="bank-card relative overflow-hidden p-6 sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,rgba(15,107,69,0.08),transparent_70%)]"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bank-badge">
              <Sparkles size={12} aria-hidden className="text-[color:var(--green)]" />
              Spot desk
            </span>
            <span className="bank-badge">
              <BadgeCheck size={12} aria-hidden className="text-[color:var(--green)]" />
              Econext rates
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)] sm:text-3xl">
            Buy APU
          </h2>
          <p className="mt-1 text-sm text-[color:var(--ink-muted)]">
            Quote SOL to APU with published bank spreads.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setDirection((current) =>
              current === "sol-to-apu" ? "apu-to-sol" : "sol-to-apu",
            )
          }
          className="btn-fluid btn-secondary px-3.5 py-2 text-xs"
        >
          <ArrowDownUp size={14} aria-hidden />
          {direction === "sol-to-apu" ? "SOL → APU" : "APU → SOL"}
        </button>
      </div>

      {walletConnected ? (
        <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--mint)] px-3 py-1.5 text-xs font-medium text-[color:var(--ink)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" />
          {shortenWalletAddress(address)}
        </div>
      ) : null}

      {ratesLoading ? (
        <p className="relative mt-8 flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
          <LoaderCircle className="animate-spin" size={16} aria-hidden />
          Loading live rates…
        </p>
      ) : null}

      {ratesError !== null ? (
        <p className="relative mt-8 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-800">
          {ratesError}
        </p>
      ) : null}

      {rates !== null && ratesError === null ? (
        <div className="relative mt-6 space-y-5">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
              You pay · {direction === "sol-to-apu" ? "SOL" : "APU"}
            </span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 text-2xl font-semibold tabular-nums tracking-tight text-[color:var(--ink)] outline-none transition-[box-shadow,border-color] focus:border-[color:var(--green)] focus:shadow-[0_0_0_4px_rgba(15,107,69,0.1)]"
            />
          </label>

          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--mint)]/55 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
              You receive · {quote?.outLabel ?? "—"}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl tabular-nums tracking-tight text-[color:var(--ink)]">
              {quote === null
                ? "—"
                : quote.outLabel === "APU"
                  ? quote.outValue.toLocaleString("en-US")
                  : formatRateLabel(quote.outValue)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bank-badge normal-case tracking-normal">
              Spread {rates.conversionSpreadBps} bps
            </span>
            <span className="bank-badge normal-case tracking-normal">
              Net {formatRateLabel(rates.netSolToApuRate)} APU / SOL
            </span>
            <span className="bank-badge normal-case tracking-normal">
              APW$ {formatRateLabel(rates.apwPerApu)}
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            {actions.showConnectWallet ? (
              <button
                type="button"
                disabled={!projectConfigured}
                onClick={() => {
                  void open({ view: "Connect" });
                }}
                className="btn-fluid btn-secondary min-h-12 flex-1 px-5 text-sm"
              >
                <Wallet size={16} aria-hidden />
                {actions.connectLabel}
              </button>
            ) : null}
            <button
              type="button"
              disabled={!actions.buyEnabled}
              onClick={onBuy}
              className="btn-fluid btn-primary min-h-12 flex-1 px-5 text-sm"
            >
              {actions.buyLabel}
            </button>
          </div>

          {!projectConfigured ? (
            <p className="text-xs text-red-700">
              Add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to enable WalletConnect.
            </p>
          ) : null}

          <p className="text-xs leading-relaxed text-[color:var(--ink-muted)]">
            {walletConnected
              ? "Wallet connected. Confirm your Agent Play credentials below to settle through Econext."
              : "Connect a Solana wallet to unlock Buy. No browser extension required — WalletConnect supports mobile and desktop wallets."}
          </p>
        </div>
      ) : null}
    </div>
  );
};

type HeroTradeCardGateProps = HeroTradeCardProps;

export const HeroTradeCardGate = (props: HeroTradeCardGateProps) => {
  const projectConfigured = hasWalletConnectProjectId(
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  );

  if (!projectConfigured) {
    return (
      <HeroTradeCardFallback
        rates={props.rates}
        ratesLoading={props.ratesLoading}
        ratesError={props.ratesError}
      />
    );
  }

  return <HeroTradeCard {...props} />;
};

const HeroTradeCardFallback = ({
  rates,
  ratesLoading,
  ratesError,
}: HeroTradeCardProps) => {
  const [direction, setDirection] = useState<Direction>("sol-to-apu");
  const [amount, setAmount] = useState("0.1");
  const parsedAmount = Number(amount);
  const quote =
    rates !== null && Number.isFinite(parsedAmount) && parsedAmount > 0
      ? direction === "sol-to-apu"
        ? {
            outLabel: "APU" as const,
            outValue: quoteSolToApu({ solAmount: parsedAmount, rates }),
          }
        : {
            outLabel: "SOL" as const,
            outValue: quoteApuToSol({ apuAmount: parsedAmount, rates }),
          }
      : null;

  const actions = resolveBuyDeskActions({
    walletConnected: false,
    projectConfigured: false,
    canQuote: false,
  });

  return (
    <div id="trade" className="bank-card relative overflow-hidden p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="bank-badge">Spot desk</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)] sm:text-3xl">
            Buy APU
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            setDirection((current) =>
              current === "sol-to-apu" ? "apu-to-sol" : "sol-to-apu",
            )
          }
          className="btn-fluid btn-secondary px-3.5 py-2 text-xs"
        >
          <ArrowDownUp size={14} aria-hidden />
          Flip
        </button>
      </div>
      {ratesLoading ? (
        <p className="mt-8 text-sm text-[color:var(--ink-muted)]">Loading rates…</p>
      ) : null}
      {ratesError !== null ? (
        <p className="mt-8 text-sm text-red-700">{ratesError}</p>
      ) : null}
      {rates !== null && ratesError === null ? (
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
              You pay · {direction === "sol-to-apu" ? "SOL" : "APU"}
            </span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 text-2xl font-semibold tabular-nums text-[color:var(--ink)] outline-none"
            />
          </label>
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--mint)]/55 px-4 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
              You receive · {quote?.outLabel ?? "—"}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl tabular-nums text-[color:var(--ink)]">
              {quote === null
                ? "—"
                : quote.outLabel === "APU"
                  ? quote.outValue.toLocaleString("en-US")
                  : formatRateLabel(quote.outValue)}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled
              className="btn-fluid btn-secondary min-h-12 flex-1 px-5 text-sm"
            >
              <Wallet size={16} aria-hidden />
              {actions.connectLabel}
            </button>
            <button
              type="button"
              disabled
              className="btn-fluid btn-primary min-h-12 flex-1 px-5 text-sm"
            >
              {actions.buyLabel}
            </button>
          </div>
          <p className="text-xs text-red-700">
            Add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to enable WalletConnect.
          </p>
        </div>
      ) : null}
    </div>
  );
};
