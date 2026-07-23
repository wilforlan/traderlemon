import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MapPinned,
  Receipt,
  Store,
  Users,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "merchant" });

const pillars = [
  {
    title: "List on the second economy",
    body: "Merchants accept APU for goods and services that recycle spend through Agent Play neighborhoods — cafés, studios, civic stalls, and creator desks.",
    tag: "Neighborhoods",
    icon: MapPinned,
  },
  {
    title: "Settle with transparent rails",
    body: "Pricing and conversion still settle through Econext APIs. You never run your own ledger in v0peer; you plug into the published bank.",
    tag: "Econext",
    icon: Receipt,
  },
  {
    title: "Grow social development",
    body: "Local APU loops fund community programs, creator grants, and civic amenities — the growth story behind APU is shared prosperity, not extractive churn.",
    tag: "Impact",
    icon: Users,
  },
  {
    title: "Earn trust with credentials",
    body: "Merchant onboarding uses the same Agent Play World credentials model. Prove your node, keep the file safe, and operate under one identity.",
    tag: "Identity",
    icon: BadgeCheck,
  },
] as const;

const howTo = [
  {
    title: "Create your Agent Play account",
    body: "Create or recover your Agent Play World account and save credentials.json.",
  },
  {
    title: "Connect on v0peer",
    body: "Upload the file on the peer desk and link the Solana wallet that will settle.",
  },
  {
    title: "Describe your storefront",
    body: "Share your merchant category, settlement preference, and neighborhood.",
  },
  {
    title: "Accept APU, cash out when ready",
    body: "Accept APU at your listed rate; cash out bankable APU through Econext.",
  },
] as const;

export default function MerchantPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <Store size={12} aria-hidden className="text-[color:var(--green)]" />
                Merchants
              </span>
              <span className="bank-badge">APU accept</span>
              <span className="bank-badge">Peer rails</span>
            </div>

            <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Become a merchant on the peer APU desk
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              Turn storefronts, creator shops, and civic services into APU-accepting
              merchants. Help liquidity circulate where players actually live.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/get-started"
                className="btn-fluid btn-primary px-5 py-3 text-sm"
              >
                Start with an Agent Play account
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/#account"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Connect credentials
              </Link>
            </div>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-[color:var(--line)] pt-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Accept
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">APU</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Settle
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">
                Econext
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Surface
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">v0peer</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">Pillars</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Why merchants join the peer desk
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            One calm surface for listing, settlement, and community circulation — without
            running your own ledger.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="bank-card p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--green)] shadow-[var(--shadow-sm)]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <span className="bank-badge normal-case tracking-normal">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[color:var(--ink)]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {pillar.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="bank-card overflow-hidden p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-md">
              <span className="bank-badge">Playbook</span>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
                How to become a merchant
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                Merchant application APIs live in Econext. v0peer remains the peer trading
                and onboarding surface — no direct database access.
              </p>
              <Link
                href="/get-started"
                className="btn-fluid btn-primary mt-8 px-5 py-3 text-sm"
              >
                Begin onboarding
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <ol className="space-y-3">
              {howTo.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 shadow-[var(--shadow-sm)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--green)] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--ink)]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
