import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  EyeOff,
  FileKey2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "get-started" });

const steps = [
  {
    title: "Open Agent Play World",
    body: "Create or enter your Agent Play World account from the official play surface. That account is your node identity across the second economy.",
    tag: "Identity",
    icon: Download,
  },
  {
    title: "Save credentials.json",
    body: "When prompted, download your credentials file. It binds serverUrl, nodeId, and your passphrase — the only key v0peer and Econext accept for session auth.",
    tag: "Key file",
    icon: KeyRound,
  },
  {
    title: "Treat the file like a private key",
    body: "Anyone with credentials.json can act as you on banking and peer trade rails. Store it offline or in a password manager. Never paste it into chats, tickets, or shared drives.",
    tag: "Custody",
    icon: EyeOff,
  },
  {
    title: "Upload only on trusted desks",
    body: "On v0peer, return to the account panel and upload credentials. Econext verifies the file; v0peer never stores it in a database.",
    tag: "Connect",
    icon: ShieldCheck,
  },
] as const;

const reminders = [
  "Proves control of your node without v0peer holding passwords",
  "Loss of the file can lock you out of banking and trade confirmations",
  "Sharing it is equivalent to handing someone your wallet keys",
  "Only upload on pages you trust — v0peer proxies auth to Econext",
] as const;

export default function GetStartedPage() {
  const agentPlayUrl =
    process.env.NEXT_PUBLIC_AGENT_PLAY_URL ?? "http://localhost:3000";

  return (
    <main className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <FileKey2 size={12} aria-hidden className="text-[color:var(--green)]" />
                Onboarding
              </span>
              <span className="bank-badge">Credentials</span>
              <span className="bank-badge">No password reset</span>
            </div>

            <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Create your Agent Play World account
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              Authentication on v0peer is credentials-file based. There is no password
              reset email and no social login — the file is the account.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={agentPlayUrl}
                className="btn-fluid btn-primary px-5 py-3 text-sm"
              >
                Open Agent Play World
                <ArrowRight size={16} aria-hidden />
              </a>
              <Link
                href="/#account"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                I already have credentials
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">Steps</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Four calm moves to a peer desk session
          </h2>
        </div>

        <ol className="grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="bank-card flex gap-4 p-6 sm:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--green)] shadow-[var(--shadow-sm)]">
                  <Icon size={20} aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bank-badge">Step {index + 1}</span>
                    <span className="bank-badge normal-case tracking-normal">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="bank-card grid gap-10 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="max-w-md">
            <span className="bank-badge">
              <ShieldCheck size={12} aria-hidden className="text-[color:var(--green)]" />
              Security
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
              Why the credentials file matters
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              Treat it like a private key for the peer desk. v0peer never invents a
              password database of its own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={agentPlayUrl}
                className="btn-fluid btn-primary px-5 py-3 text-sm"
              >
                Open Agent Play World
              </a>
              <Link
                href="/#account"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Upload on v0peer
              </Link>
            </div>
          </div>

          <ul className="space-y-3">
            {reminders.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 shadow-[var(--shadow-sm)]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--green)]" />
                <span className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
