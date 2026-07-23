"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, LoaderCircle } from "lucide-react";

import { MarketRatesSchema, quoteApuToSol, quoteSolToApu, type MarketRates } from "@/lib/conversion";
import { formatRateLabel } from "@/lib/market-series";

type Direction = "sol-to-apu" | "apu-to-sol";

export const SolApuConverter = () => {
  const [rates, setRates] = useState<MarketRates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<Direction>("sol-to-apu");
  const [amount, setAmount] = useState("0.1");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/market/rates", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Could not load Econext market rates.");
        }
        const parsed = MarketRatesSchema.parse(await response.json());
        if (!cancelled) {
          setRates(parsed);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load Econext market rates.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const parsedAmount = Number(amount);
  const quote = useMemo(() => {
    if (rates === null || !Number.isFinite(parsedAmount)) {
      return null;
    }
    if (direction === "sol-to-apu") {
      return {
        outLabel: "APU",
        outValue: quoteSolToApu({ solAmount: parsedAmount, rates }),
        inLabel: "SOL",
      };
    }
    return {
      outLabel: "SOL",
      outValue: quoteApuToSol({ apuAmount: parsedAmount, rates }),
      inLabel: "APU",
    };
  }, [direction, parsedAmount, rates]);

  return (
    <section
      id="convert"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-deep)]">
            Spot desk
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--ink)] sm:text-4xl">
            Direct SOL ↔ APU conversion
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--ink-muted)]">
            Quotes stream from Econext published rates — including the conversion spread —
            so Traderlemon never invents its own book.
          </p>
          {rates !== null ? (
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-[color:var(--line)] bg-white/70 p-3">
                <dt className="text-[color:var(--ink-muted)]">Net APU → SOL</dt>
                <dd className="mt-1 font-semibold tabular-nums text-[color:var(--ink)]">
                  {formatRateLabel(rates.netApuToSolRate)}
                </dd>
              </div>
              <div className="rounded-2xl border border-[color:var(--line)] bg-white/70 p-3">
                <dt className="text-[color:var(--ink-muted)]">Spread</dt>
                <dd className="mt-1 font-semibold tabular-nums text-[color:var(--ink)]">
                  {rates.conversionSpreadBps} bps
                </dd>
              </div>
              <div className="rounded-2xl border border-[color:var(--line)] bg-white/70 p-3">
                <dt className="text-[color:var(--ink-muted)]">APW$ / APU</dt>
                <dd className="mt-1 font-semibold tabular-nums text-[color:var(--ink)]">
                  {formatRateLabel(rates.apwPerApu)}
                </dd>
              </div>
              <div className="rounded-2xl border border-[color:var(--line)] bg-white/70 p-3">
                <dt className="text-[color:var(--ink-muted)]">Peg APW$ / SOL</dt>
                <dd className="mt-1 font-semibold tabular-nums text-[color:var(--ink)]">
                  {rates.solUsdReferenceRate}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 p-5 shadow-[0_20px_60px_rgba(27,122,78,0.08)] backdrop-blur sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[color:var(--ink)]">Convert</p>
            <button
              type="button"
              onClick={() =>
                setDirection((current) =>
                  current === "sol-to-apu" ? "apu-to-sol" : "sol-to-apu",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs font-medium text-[color:var(--ink-muted)] hover:bg-[color:var(--mint)]"
            >
              <ArrowDownUp size={14} aria-hidden />
              Flip
            </button>
          </div>

          {loading ? (
            <p className="mt-8 flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
              <LoaderCircle className="animate-spin" size={16} aria-hidden />
              Loading Econext rates…
            </p>
          ) : null}
          {error !== null ? (
            <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error} Start Econext on port 3001, or set <code>ECONEXT_API_URL</code>.
            </p>
          ) : null}

          {rates !== null && error === null ? (
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-wide text-[color:var(--ink-muted)]">
                  You pay ({direction === "sol-to-apu" ? "SOL" : "APU"})
                </span>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  className="mt-2 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--mint)]/40 px-4 py-3 text-lg font-semibold tabular-nums text-[color:var(--ink)] outline-none ring-[color:var(--gold)] focus:ring-2"
                />
              </label>
              <div className="rounded-2xl border border-dashed border-[color:var(--line)] bg-[color:var(--mint)]/30 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--ink-muted)]">
                  You receive ({quote?.outLabel ?? "—"})
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-3xl tabular-nums text-[color:var(--ink)]">
                  {quote === null
                    ? "—"
                    : quote.outLabel === "APU"
                      ? quote.outValue.toLocaleString("en-US")
                      : formatRateLabel(quote.outValue)}
                </p>
              </div>
              <p className="text-xs leading-relaxed text-[color:var(--ink-muted)]">
                Connect your Solana wallet and Agent Play credentials below to execute.
                Settlement APIs live only on Econext — Traderlemon never talks to a database.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
