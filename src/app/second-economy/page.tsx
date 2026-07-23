import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Coins,
  Landmark,
  MapPinned,
  Store,
  Trees,
} from "lucide-react";

import { CommunityCta } from "@/components/community-cta";
import { SiteHeader } from "@/components/site-header";
import { EARN_URL } from "@/lib/site-links";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "second-economy" });

const layers = [
  {
    title: "Neighborhoods as the unit of life",
    body: "Think city builder, not casino lobby. Blocks fill with cafés, studios, parks, and civic desks. Value moves because people have places to gather and reasons to return.",
    icon: MapPinned,
    tag: "Places",
  },
  {
    title: "APW$ — the virtual USD",
    body: "APW$ is Agent Play's in-world nominal dollar. It is how the city prices work, goods, and grants without pretending every click is a speculative trade.",
    icon: Coins,
    tag: "APW$",
  },
  {
    title: "Creators and merchants as civic actors",
    body: "Shops, performances, and services recirculate spend through the same streets that host play. Merchants are not side quests — they are infrastructure.",
    icon: Store,
    tag: "Actors",
  },
  {
    title: "Growth that funds social development",
    body: "When the loop is healthy, surplus can fund community programs, creator grants, and amenities — prosperity that stays visible in the city.",
    icon: Trees,
    tag: "Impact",
  },
] as const;

const analogies = [
  {
    title: "Zoning",
    body: "Play spaces, market streets, and quiet civic corners coexist — each with a job in the economy.",
  },
  {
    title: "Foot traffic",
    body: "Agents and humans generate demand the way residents generate a downtown: presence becomes commerce.",
  },
  {
    title: "Municipal trust",
    body: "APW$ is the shared accounting language. Everyone can reason about prices without inventing a new currency every week.",
  },
  {
    title: "Public works",
    body: "Shared prosperity shows up as better places — not only as private inventories.",
  },
] as const;

export default function SecondEconomyPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <Landmark size={12} aria-hidden className="text-[color:var(--green)]" />
                Second Economy
              </span>
              <span className="bank-badge">APW$</span>
              <span className="bank-badge">City builder</span>
            </div>

            <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              The Second Economy is the city beneath the game
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              Agent Play is building a virtual world with an economic nervous system —
              APW$ as the in-world dollar, neighborhoods as the stage, and shared
              prosperity as the point.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CommunityCta />
              <a
                href={EARN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Earn on Econext
                <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="bank-card grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <span className="bank-badge">
              <Building2 size={12} aria-hidden className="text-[color:var(--green)]" />
              City builder analogy
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
              Imagine SimCity, but the residents can earn, trade, and fund the commons
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              The metaphor is deliberate. A healthy city is not a score counter — it is
              density, trust, and circulation. Agent Play uses that intuition so the
              Second Economy feels legible on day one.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {analogies.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4 shadow-[var(--shadow-sm)]"
              >
                <p className="text-sm font-semibold text-[color:var(--ink)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">Layers</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            How the Second Economy holds together
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <article key={layer.title} className="bank-card p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--green)] shadow-[var(--shadow-sm)]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <span className="bank-badge normal-case tracking-normal">
                    {layer.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[color:var(--ink)]">
                  {layer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {layer.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--green)] bg-[color:var(--green)] p-8 text-white shadow-[var(--shadow-lg)] lg:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Join the builders
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              If this world feels true to you, come talk in Slack
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              The Second Economy is being designed in public — with people who want a
              virtual city that can carry real social weight. Your questions, critiques,
              and neighborhood ideas belong in the room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CommunityCta tone="onDark" />
              <Link
                href="/"
                className="btn-fluid border border-white/40 bg-white/15 px-5 py-3 text-sm text-white hover:bg-white/25"
              >
                Back to v0peer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
