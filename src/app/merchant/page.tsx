import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, MapPinned, Receipt, Users } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "merchant" });

const pillars = [
  {
    title: "List on the second economy",
    body: "Merchants accept APU for goods and services that recycle spend through Agent Play neighborhoods — cafés, studios, civic stalls, and creator desks.",
    icon: MapPinned,
  },
  {
    title: "Settle with transparent rails",
    body: "Pricing and conversion still settle through Econext APIs. You never run your own ledger in Traderlemon; you plug into the published bank.",
    icon: Receipt,
  },
  {
    title: "Grow social development",
    body: "Local APU loops fund community programs, creator grants, and civic amenities — the growth story behind APU is shared prosperity, not extractive churn.",
    icon: Users,
  },
  {
    title: "Earn trust with credentials",
    body: "Merchant onboarding uses the same Agent Play World credentials model. Prove your node, keep the file safe, and operate under one identity.",
    icon: BadgeCheck,
  },
] as const;

export default function MerchantPage() {
  return (
    <main className="min-h-dvh bg-[color:var(--bg)]">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[color:var(--line)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(45,155,106,0.25),transparent_45%),radial-gradient(ellipse_at_10%_20%,rgba(232,197,71,0.3),transparent_40%),linear-gradient(180deg,#f7fbf8,#fff8e8)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-deep)]">
            Merchants
          </p>
          <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight text-[color:var(--ink)] sm:text-5xl">
            Become a merchant on the APU desk
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--ink-muted)]">
            Turn storefronts, creator shops, and civic services into APU-accepting
            merchants. You help APU circulate — and you help the second economy fund
            social development where players actually live.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] shadow-[0_12px_30px_rgba(201,162,39,0.28)]"
            >
              Start with an Agent Play account
            </Link>
            <Link
              href="/#connect"
              className="rounded-full border border-[color:var(--line)] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)]"
            >
              Connect credentials
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article
              key={pillar.title}
              className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/85 p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--mint)] text-[color:var(--green)]">
                <Icon size={18} aria-hidden />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[color:var(--ink)]">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                {pillar.body}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--green)] px-6 py-8 text-white">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            How to become a merchant
          </h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-white/90">
            <li>Create or recover your Agent Play World account and save credentials.json.</li>
            <li>Connect the file on Traderlemon and link the Solana wallet that will settle.</li>
            <li>Describe your merchant category, settlement preference, and neighborhood.</li>
            <li>Accept APU at your listed rate; cash out bankable APU through Econext when ready.</li>
          </ol>
          <p className="mt-6 text-sm text-white/80">
            Merchant application APIs will continue to live in Econext. Traderlemon remains
            the trading and onboarding surface — no direct database access.
          </p>
        </div>
      </section>
    </main>
  );
}
