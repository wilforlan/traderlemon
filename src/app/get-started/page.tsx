import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, KeyRound, Download, EyeOff } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "get-started" });

const steps = [
  {
    title: "Open Agent Play World",
    body: "Create or enter your Agent Play World account from the official play surface. That account is your node identity across the second economy.",
    icon: Download,
  },
  {
    title: "Save credentials.json",
    body: "When prompted, download your credentials file. It binds serverUrl, nodeId, and your passphrase — the only key Traderlemon and Econext accept for session auth.",
    icon: KeyRound,
  },
  {
    title: "Treat the file like a private key",
    body: "Anyone with credentials.json can act as you on banking and trade rails. Store it offline or in a password manager. Never paste it into chats, tickets, or shared drives.",
    icon: EyeOff,
  },
  {
    title: "Upload only on trusted desks",
    body: "On Traderlemon, use Create Agent Play World Account → return here → upload credentials on the Connect panel. Econext verifies the file; Traderlemon never stores it in a database.",
    icon: ShieldCheck,
  },
] as const;

export default function GetStartedPage() {
  return (
    <main className="min-h-dvh bg-[color:var(--bg)]">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[color:var(--line)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,197,71,0.28),transparent_40%),linear-gradient(180deg,#f4fbf6,rgba(255,255,255,0.4))]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-deep)]">
            Get started
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[color:var(--ink)] sm:text-5xl">
            Create your Agent Play World account
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--ink-muted)]">
            Authentication on Traderlemon is credentials-file based. There is no password
            reset email and no social login — the file is the account. Understanding how
            to create it and keep it safe is the whole onboarding.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={step.title}
              className="flex gap-4 rounded-[1.35rem] border border-[color:var(--line)] bg-white/85 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--mint)] text-[color:var(--green)]">
                <Icon size={18} aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--gold-deep)]">
                  Step {index + 1}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[color:var(--ink)]">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {step.body}
                </p>
              </div>
            </article>
          );
        })}

        <div className="rounded-[1.35rem] border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/15 p-5">
          <h2 className="text-lg font-semibold text-[color:var(--ink)]">
            Why the credentials file matters
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            <li>It proves control of your node without Traderlemon holding passwords.</li>
            <li>Loss of the file can lock you out of banking and trade confirmations.</li>
            <li>Sharing it is equivalent to handing someone your wallet keys.</li>
            <li>Only upload on pages you trust — Traderlemon proxies auth to Econext APIs.</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={process.env.NEXT_PUBLIC_AGENT_PLAY_URL ?? "http://localhost:3000"}
            className="rounded-full bg-[color:var(--green)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Open Agent Play World
          </a>
          <Link
            href="/#connect"
            className="rounded-full border border-[color:var(--line)] bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)]"
          >
            I already have credentials
          </Link>
        </div>
      </section>
    </main>
  );
}
