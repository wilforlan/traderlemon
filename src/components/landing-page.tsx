import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Coins,
  Globe2,
  Leaf,
  Map,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

import { AppScreenshots } from "@/components/app-screenshots";
import { DownloadAppCta } from "@/components/download-app-cta";
import { ConnectToServer } from "@/components/connect-to-server";
import { SiteLogo } from "@/components/site-logo";
import { World1 } from "@/components/world1";
import { landingCopy } from "@/lib/landing-copy";
import { EARN_URL } from "@/lib/site-links";

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
    title: landingCopy.downloadApp.label,
    body: "The official v0peer iPhone and iPad app is available on the App Store.",
    href: "https://apps.apple.com/us/app/v0peer/id6803333696",
    cta: landingCopy.downloadApp.status,
  },
  {
    title: landingCopy.continueOnWeb.label,
    body: "Open Origin in the browser today. Same world, same city — no wait for the store.",
    href: landingCopy.continueOnWeb.href,
    cta: landingCopy.continueOnWeb.label,
  },
  {
    title: "Learn the Second Economy",
    body: "Understand APW$, neighborhoods, and why Agent Play is a city with an economy — not a lobby with a scoreboard.",
    href: "/second-economy",
    cta: "Read the story",
  },
] as const;

export const LandingPage = () => {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bank-badge">
                  <Globe2 size={12} aria-hidden className="text-[color:var(--green)]" />
                  Agent Play
                </span>
                <span className="bank-badge">
                  <Sparkles size={12} aria-hidden className="text-[color:var(--gold-deep)]" />
                  Second Economy
                </span>
                <span className="bank-badge">Download on iOS</span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <SiteLogo size={72} />
                <p className="font-[family-name:var(--font-display)] text-5xl leading-[0.96] tracking-tight text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
                  v0peer
                </p>
              </div>

              <h1 className="mt-6 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-[color:var(--ink)] sm:text-3xl">
                {landingCopy.heroHeadline}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
                {landingCopy.heroBody}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <DownloadAppCta />
                <a
                  href={landingCopy.continueOnWeb.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fluid btn-secondary px-5 py-3 text-sm"
                >
                  {landingCopy.continueOnWeb.label}
                  <ArrowRight size={16} aria-hidden />
                </a>
              </div>
            </div>

            <AppScreenshots variant="hero" />
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
                {landingCopy.continueOnWeb.label}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="bank-badge">
              <Smartphone size={12} aria-hidden className="text-[color:var(--green)]" />
              {landingCopy.screenshotSection.badge}
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
              {landingCopy.screenshotSection.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base">
              {landingCopy.screenshotSection.body}
            </p>
          </div>
          <DownloadAppCta />
        </div>
        <AppScreenshots />
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
              Continue on the web
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
              The city is already running in the browser.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base">
              Until the App Store listing ships, open Origin on the web. Same
              streets, same APW$, same invitation to build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={landingCopy.continueOnWeb.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid btn-primary px-5 py-3 text-sm"
              >
                {landingCopy.continueOnWeb.label}
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href="https://econext.llc/cash-out"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Cash Out
              </a>
            </div>
          </div>
          <World1 />
        </div>
      </section>

      <ConnectToServer />

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">Paths in</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Download the app, or continue on the web
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {invitations.map((item) => {
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
                  {item.href ? <ArrowRight size={14} aria-hidden /> : null}
                </span>
              </>
            );

            if (item.href === null) {
              return (
                <article key={item.title} className={className}>
                  {inner}
                </article>
              );
            }

            if (item.href.startsWith("http")) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={item.title} href={item.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};
