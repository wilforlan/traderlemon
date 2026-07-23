import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Coins,
  Globe2,
  Leaf,
  Map,
  Sparkles,
  Users,
} from "lucide-react";

import { CommunityCta } from "@/components/community-cta";
import { EARN_URL, resolveAgentPlayUrl } from "@/lib/site-links";

const beliefs = [
  {
    title: "A city you can feel",
    body: "Agent Play is not a leaderboard with cosmetics. It is a living digital city — streets, stalls, studios, and civic spaces where people and agents share one economy.",
    icon: Building2,
    tag: "World",
  },
  {
    title: "APW$ is the in-world dollar",
    body: "APW$ is the Second Economy's nominal dollar: the unit neighbors price in, earn in, and plan with — a calm reference for value inside the city.",
    icon: Coins,
    tag: "APW$",
  },
  {
    title: "Growth that stays local",
    body: "When creators, merchants, and players circulate value, the loop funds social development where the city actually lives — not extractive churn.",
    icon: Leaf,
    tag: "Impact",
  },
] as const;

const invitations = [
  {
    title: "Learn the Second Economy",
    body: "Understand APW$, neighborhoods, and the city-builder analogy behind Agent Play.",
    href: "/second-economy",
    external: false,
    cta: "Read the story",
  },
  {
    title: "Earn with Econext",
    body: "Open the banking rails of the Second Economy — balances, conversion, and settlement.",
    href: EARN_URL,
    external: true,
    cta: "Go to Econext",
  },
  {
    title: "Enter Agent Play World",
    body: "Step into the play surface where accounts, nodes, and neighborhoods begin.",
    href: "agent-play",
    external: true,
    cta: "Open Agent Play",
  },
] as const;

export const LandingPage = () => {
  const agentPlayUrl = resolveAgentPlayUrl(process.env.NEXT_PUBLIC_AGENT_PLAY_URL);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <Globe2 size={12} aria-hidden className="text-[color:var(--green)]" />
                Agent Play
              </span>
              <span className="bank-badge">
                <Sparkles size={12} aria-hidden className="text-[color:var(--gold-deep)]" />
                Second Economy
              </span>
              <span className="bank-badge">Virtual world</span>
            </div>

            <p className="mt-8 font-[family-name:var(--font-display)] text-5xl leading-[0.96] tracking-tight text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
              v0peer
            </p>

            <h1 className="mt-6 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-[color:var(--ink)] sm:text-3xl">
              Believe in a digital city with a real second economy.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              Agent Play is building a living world where APW$ is the in-world dollar,
              neighborhoods compound shared prosperity, and visitors become builders —
              not just spectators.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CommunityCta />
              <Link
                href="/second-economy"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Explore Second Economy
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-[color:var(--line)] pt-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Unit
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">APW$</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Shape
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">
                Digital city
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                Next
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[color:var(--ink)]">
                Join Slack
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-12 max-w-xl">
          <span className="bank-badge">
            <Map size={12} aria-hidden className="text-[color:var(--green)]" />
            Why it matters
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
            A world worth joining — not just watching
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base">
            The Second Economy is the belief layer of Agent Play: prices, places, and
            people bound together in one city-scale loop.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {beliefs.map((belief) => {
            const Icon = belief.icon;
            return (
              <article key={belief.title} className="bank-card p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--green)] shadow-[var(--shadow-sm)]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <span className="bank-badge normal-case tracking-normal">
                    {belief.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[color:var(--ink)]">
                  {belief.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {belief.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="bank-card grid gap-8 overflow-hidden p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <div className="max-w-lg">
            <span className="bank-badge">
              <Users size={12} aria-hidden className="text-[color:var(--green)]" />
              Community first
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
              The city grows in Slack before it grows on-chain
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base">
              Builders, storytellers, merchants, and curious visitors meet in one room.
              If you believe a virtual world can carry real social and economic weight —
              start there.
            </p>
            <div className="mt-8">
              <CommunityCta />
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--mint)]/50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
              What you will find
            </p>
            <ul className="mt-5 space-y-4">
              {[
                "Early worldbuilding conversations and neighborhood ideas",
                "APW$ and Second Economy design walkthroughs",
                "Calls for creators, merchants, and civic experiments",
                "A human pace — less hype, more shared construction",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-[color:var(--ink)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--green)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">Paths in</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Three doors into the Second Economy
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {invitations.map((item) => {
            const href =
              item.href === "agent-play"
                ? agentPlayUrl
                : item.href;
            const className =
              "bank-card group flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-7";

            const inner = (
              <>
                <h3 className="text-lg font-semibold tracking-tight text-[color:var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {item.body}
                </p>
                <span className="btn-fluid btn-secondary mt-6 self-start px-4 py-2 text-sm">
                  {item.cta}
                  <ArrowRight size={14} aria-hidden />
                </span>
              </>
            );

            if (item.external) {
              return (
                <a
                  key={item.title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={item.title} href={href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};
