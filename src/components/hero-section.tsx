"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Leaf, ShieldCheck } from "lucide-react";

import { HeroTradeCardGate } from "@/components/hero-trade-card";
import type { MarketRates } from "@/lib/conversion";

type HeroSectionProps = {
  readonly rates: MarketRates | null;
  readonly ratesLoading: boolean;
  readonly ratesError: string | null;
};

export const HeroSection = ({
  rates,
  ratesLoading,
  ratesError,
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="max-w-xl lg:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="bank-badge">
              <Building2 size={12} aria-hidden className="text-[color:var(--green)]" />
              Peer desk
            </span>
            <span className="bank-badge">
              <ShieldCheck size={12} aria-hidden className="text-[color:var(--green)]" />
              WalletConnect
            </span>
            <span className="bank-badge">
              <Leaf size={12} aria-hidden className="text-[color:var(--gold-deep)]" />
              Second economy
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-8 font-[family-name:var(--font-display)] text-5xl leading-[0.96] tracking-tight text-[color:var(--ink)] sm:text-6xl lg:text-7xl"
          >
            v0peer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-md text-xl font-medium leading-snug tracking-tight text-[color:var(--ink)] sm:text-2xl"
          >
            Peer APU markets for Agent Play — convert SOL with bank-grade clarity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--ink-muted)]"
          >
            A peer desk where liquidity circulates through creators, merchants, and
            neighborhoods — financing social development inside a living digital city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#trade" className="btn-fluid btn-primary px-5 py-3 text-sm">
              Open buy desk
            </a>
            <Link
              href="/get-started"
              className="btn-fluid btn-secondary px-5 py-3 text-sm"
            >
              Create account
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-[color:var(--line)] pt-8"
          >
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Rails
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">
                Solana settle
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Book
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">
                Econext live
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Custody
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">
                Your wallet
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14 }}
          className="lg:sticky lg:top-28"
        >
          <HeroTradeCardGate
            rates={rates}
            ratesLoading={ratesLoading}
            ratesError={ratesError}
          />
        </motion.div>
      </div>
    </section>
  );
};
