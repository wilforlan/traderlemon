import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

import { CommunityCta } from "@/components/community-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WORLD_SERVER_URL } from "@/lib/site-links";
import { buildPageMetadata } from "@/lib/site-seo";
import { storeListing } from "@/lib/store-listing";

export const metadata: Metadata = buildPageMetadata({ page: "app" });

export default function AppMarketingPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <Smartphone
                  size={12}
                  aria-hidden
                  className="text-[color:var(--green)]"
                />
                iPhone and iPad
              </span>
              <span className="bank-badge">Origin</span>
              <span className="bank-badge">Second Economy</span>
            </div>

            <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              {storeListing.marketing.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              {storeListing.marketing.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CommunityCta />
              <Link
                href="/second-economy"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Learn the Second Economy
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">In the app</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Load a live world into the full screen
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {storeListing.marketing.features.map((feature) => (
            <article key={feature.title} className="bank-card p-6 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-[color:var(--ink)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--green)] bg-[color:var(--green)] p-8 text-white shadow-[var(--shadow-lg)] lg:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Origin
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              The city is already running
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Origin is the default world. After the splash, tap Load and the
              live city at {WORLD_SERVER_URL} fills the screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CommunityCta tone="onDark" />
              <Link
                href="/support"
                className="btn-fluid border border-white/40 bg-white/15 px-5 py-3 text-sm text-white hover:bg-white/25"
              >
                Need help?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
