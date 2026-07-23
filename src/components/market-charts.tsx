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
import { Activity, ChartColumn } from "lucide-react";

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
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-lg">
          <span className="bank-badge">
            <Activity size={12} aria-hidden className="text-[color:var(--green)]" />
            Markets
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
            Pricing & flow
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            Live mid from Econext, with a calm session tape for the desk view.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="bank-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[color:var(--ink)]">
                APU → SOL mid
              </p>
              <p className="mt-1 text-xs text-[color:var(--ink-muted)]">
                Around {formatRateLabel(props.rates.netApuToSolRate)} SOL
              </p>
            </div>
            <span className="bank-badge">
              <ChartColumn size={12} aria-hidden />
              Live
            </span>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="apuSolFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#178556" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#178556" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e5ece8" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#667870" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 11, fill: "#667870" }}
                  width={64}
                  axisLine={false}
                  tickLine={false}
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
                  stroke="#0f6b45"
                  fill="url(#apuSolFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="bank-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[color:var(--ink)]">Desk volume</p>
              <p className="mt-1 text-xs text-[color:var(--ink-muted)]">
                Illustrative APU notional per hour
              </p>
            </div>
            <span className="bank-badge normal-case tracking-normal">Session</span>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid stroke="#e5ece8" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#667870" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#667870" }}
                  width={48}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="volume" fill="#c4a035" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
};
