"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--line)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(232,197,71,0.35),transparent_45%),radial-gradient(ellipse_at_80%_0%,rgba(45,155,106,0.28),transparent_40%),linear-gradient(160deg,#f4fbf6_0%,#eaf6ef_42%,#f7f1d8_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(255,255,255,0.65),transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-20 lg:pt-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[color:var(--ink)] sm:text-6xl lg:text-7xl"
          >
            Traderlemon
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 max-w-xl text-xl font-medium leading-snug text-[color:var(--ink)] sm:text-2xl"
          >
            APU is the growth engine of Agent Play&apos;s second economy — liquidity that
            turns play into shared prosperity.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 max-w-lg text-base leading-relaxed text-[color:var(--ink-muted)]"
          >
            Convert SOL to APU on a desk built for real settlement rails. Every unit
            circulates through creators, merchants, and neighborhoods — financing social
            development inside a living digital city.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#convert"
              className="rounded-full bg-[color:var(--green)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(27,122,78,0.28)] transition-transform hover:-translate-y-0.5"
            >
              Convert SOL to APU
            </a>
            <Link
              href="/get-started"
              className="rounded-full border border-[color:var(--line)] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] backdrop-blur"
            >
              Create Agent Play World Account
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative min-h-[220px] overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(145deg,rgba(27,122,78,0.92),rgba(201,162,39,0.88))] p-6 text-white shadow-[0_30px_80px_rgba(27,122,78,0.25)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Second economy
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight">
            Growth that compounds into community.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/90">
            <li>Play-world demand → bankable APU float</li>
            <li>Merchant rails recycle spend locally</li>
            <li>Settlement stays on Solana when you cash out</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
