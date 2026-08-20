import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, Mail } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SUPPORT_EMAIL, WORLD_SERVER_URL } from "@/lib/site-links";
import { buildPageMetadata } from "@/lib/site-seo";
import { storeListing } from "@/lib/store-listing";

export const metadata: Metadata = buildPageMetadata({ page: "support" });

export default function SupportPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <LifeBuoy
                  size={12}
                  aria-hidden
                  className="text-[color:var(--green)]"
                />
                Support
              </span>
              <span className="bank-badge">v0peer app</span>
              <span className="bank-badge">Origin</span>
            </div>

            <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              {storeListing.support.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              {storeListing.support.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="btn-fluid btn-primary px-5 py-3 text-sm"
              >
                <Mail size={16} aria-hidden />
                {SUPPORT_EMAIL}
              </a>
              <Link href="/app" className="btn-fluid btn-secondary px-5 py-3 text-sm">
                About the app
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-10 max-w-lg">
          <span className="bank-badge">Help</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Common questions
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {storeListing.support.topics.map((topic) => (
            <article key={topic.title} className="bank-card p-6 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-[color:var(--ink)]">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                {topic.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="bank-card grid gap-8 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="max-w-md">
            <span className="bank-badge">Contact</span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
              Write to us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              Email {SUPPORT_EMAIL} with your device, iOS version, and what
              happened when you tried to load Origin. We read every note.
            </p>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 shadow-[var(--shadow-sm)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--green)]" />
              <span className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
                Origin lives at {WORLD_SERVER_URL}. Use that host in the app and
                in credentials.json as serverUrl.
              </span>
            </li>
            <li className="flex gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 shadow-[var(--shadow-sm)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--green)]" />
              <span className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
                New to Agent Play? Start with an account, then return to v0peer.{" "}
                <Link
                  href="/get-started"
                  className="font-semibold text-[color:var(--green)]"
                >
                  Create an Agent Play World account
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
