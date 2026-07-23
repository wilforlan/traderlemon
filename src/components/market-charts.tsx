"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { MarketRates } from "@/lib/conversion";
import { buildSyntheticRateSeries, formatRateLabel } from "@/lib/market-series";

export const MarketCharts = (props: { readonly rates: MarketRates | null }) => {
  const series = useMemo(() => {
    if (props.rates === null) {
      return [];
    }
    return buildSyntheticRateSeries({
      netApuToSolRate: props.rates.netApuToSolRate,
    }).map((point) => ({
      ...point,
      label: new Date(point.t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  }, [props.rates]);

  if (props.rates === null) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-deep)]">
            Time series
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--ink)]">
            Pricing & flow analytics
          </h2>
        </div>
        <p className="max-w-sm text-sm text-[color:var(--ink-muted)]">
          Desk view of net APU/SOL mid and illustrative flow volume. Live mid is sourced
          from Econext; the path is a fintech-style session tape for the landing desk.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/85 p-4 shadow-sm">
          <p className="text-sm font-semibold text-[color:var(--ink)]">APU → SOL mid</p>
          <p className="mt-1 text-xs text-[color:var(--ink-muted)]">
            Session path around {formatRateLabel(props.rates.netApuToSolRate)} SOL
          </p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="apuSolFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D9B6A" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2D9B6A" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#d7e8dc" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5f7366" }} />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 11, fill: "#5f7366" }}
                  width={64}
                  tickFormatter={(value: number) => formatRateLabel(value)}
                />
                <Tooltip
                  formatter={(value) => [
                    typeof value === "number" ? formatRateLabel(value) : String(value),
                    "SOL / APU",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="apuSol"
                  stroke="#1B7A4E"
                  fill="url(#apuSolFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/85 p-4 shadow-sm">
          <p className="text-sm font-semibold text-[color:var(--ink)]">Desk volume</p>
          <p className="mt-1 text-xs text-[color:var(--ink-muted)]">
            Illustrative APU notional traded per hour
          </p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid stroke="#d7e8dc" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5f7366" }} />
                <YAxis tick={{ fontSize: 11, fill: "#5f7366" }} width={48} />
                <Tooltip />
                <Bar dataKey="volume" fill="#C9A227" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
