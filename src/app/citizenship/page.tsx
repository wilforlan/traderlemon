import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileKey2,
  Landmark,
  ShieldCheck,
  Store,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import {
  CITIZENSHIP_BROCHURE_PATH,
  EARN_URL,
  WORLD2_URL,
  WORLD_SERVER_URL,
} from "@/lib/site-links";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "citizenship" });

const monies = [
  {
    name: "APW$",
    role: "Pocket money",
    body: "A new wallet opens with $10. These world dollars pay for the grounds: a shop, time with an agent, a message, a call. They stay inside the scene.",
  },
  {
    name: "APU",
    role: "The measure",
    body: "Play, a purchase, billed talk with an agent, and a real invite pay you APU. You can save it, give it, burn it for more pocket money, take it to the bank, or sell it to a peer.",
  },
  {
    name: "SOL",
    role: "Outside money",
    body: "Solana money this office does not mint. You bring it, a peer pays it, or Econext pays it after a cash-out completes.",
  },
] as const;

const acts = [
  "Walk the public street and be seen in the same room as everyone else.",
  "Play a finished arcade round. The first round pays at least 5 APU. A day stops at 100.",
  "Buy from a shop. You pay the price in APW$ and receive 3 APU for each whole dollar.",
  "Talk with an agent. Voice bills at $1.50 a minute and can pay up to 5 APU in that sitting.",
  "Reach another person. A message is $0.50. A second of voice is $0.85.",
  "Invite someone who actually opens an account. That pays 25 APU, inside 1,000 a month.",
  "Give at least 10 APU, lock an envelope, or burn a bundle for more world dollars.",
  "Cash out at Econext, or agree a different price with one other person at the stall.",
] as const;

const bundles = [
  ["150 APU", "$10"],
  ["300 APU", "$20"],
  ["500 APU", "$50"],
  ["900 APU", "$100"],
] as const;

export default function CitizenshipPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bank-badge">
                <Landmark size={12} aria-hidden className="text-[color:var(--green)]" />
                Citizenship
              </span>
              <span className="bank-badge">Second Economy</span>
              <span className="bank-badge">Visa file</span>
            </div>
            <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              What is Citizenship
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
              Citizenship is how a person enters the Second Economy. You get one
              passport for the street, the bank, and the stall. You are given pocket
              money. Events that really happened can pay you a measure you can keep,
              give, or take home.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={CITIZENSHIP_BROCHURE_PATH}
                download
                className="btn-fluid btn-primary px-5 py-3 text-sm"
              >
                <Download size={16} aria-hidden />
                Download the brochure
              </a>
              <a
                href={CITIZENSHIP_BROCHURE_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid btn-secondary px-5 py-3 text-sm"
              >
                Open brochure
                <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 max-w-lg">
          <span className="bank-badge">Three desks</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            One night, three places
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            The street is where you walk, talk, and spend. Econext is the bank.
            The stall is the other table, where two people can refuse the bank&apos;s
            price. Citizenship uses the same identity at all three.
          </p>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Street", "Agent Play World. Play, buy, talk, and reach someone who is close."],
            ["2", "Bank", "Econext. Save, give, buy more pocket money, or cash out."],
            ["3", "Stall", "A peer trade. Both sides settle, or nobody is paid."],
          ].map(([step, title, body]) => (
            <li key={title} className="bank-card p-6">
              <span className="bank-badge">Step {step}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-[color:var(--ink)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 max-w-lg">
          <span className="bank-badge">Three monies</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Learn the money before the prices
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {monies.map((money) => (
            <article key={money.name} className="bank-card p-6 sm:p-7">
              <span className="bank-badge">{money.role}</span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
                {money.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                {money.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="bank-card grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <span className="bank-badge">
              <FileKey2 size={12} aria-hidden className="text-[color:var(--green)]" />
              Your visa
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
              credentials.json is the visa
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              When the immigration desk stamps your papers, it asks you to download
              credentials.json. That file is your visa. It carries the server, your
              node id, and the recovery key. Anyone who holds the file can act as
              you. v0peer does not keep a copy, and there is no reset.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              Keep it private. Do not share it with anyone else. Do not paste it
              into a chat, a ticket, or a shared drive. Store it offline, or in a
              password manager only you can open. Upload it only on a desk you
              trust: World 1, World 2, or Econext.
            </p>
            <a
              href={CITIZENSHIP_BROCHURE_PATH}
              download
              className="btn-fluid btn-secondary mt-8 px-5 py-3 text-sm"
            >
              <Download size={16} aria-hidden />
              Download the illustrated brochure
            </a>
          </div>
          <ol className="space-y-3">
            {[
              "Open the immigration desk on World 1 or World 2.",
              "Issue papers, or restore the credentials.json you already saved.",
              "Download the file before you walk onto the street.",
              "Keep the file private. Do not share the visa.",
              "Return with the same file when you want the bank or the stall.",
            ].map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4"
              >
                <span className="font-[family-name:var(--font-display)] text-lg text-[color:var(--green)]">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-[color:var(--ink)]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 max-w-lg">
          <span className="bank-badge">What you can do</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            The acts of a citizen
          </h2>
        </div>
        <ol className="grid gap-4 md:grid-cols-2">
          {acts.map((act, index) => (
            <li key={act} className="bank-card flex gap-4 p-6">
              <span className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--green)]">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
                {act}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <span className="bank-badge">Being with someone</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Agents and other people are different bills
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            An agent is another occupant, paid in APU, on the same measure as you.
            Another citizen is paid in world dollars, in the moment. Read the unit
            before you start the clock.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="bank-card p-6 sm:p-7">
            <span className="bank-badge">Agent</span>
            <h3 className="mt-4 text-xl font-semibold text-[color:var(--ink)]">
              $1.50 a minute
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              Ten billed seconds cost $0.25 and pay 1 APU. A full minute costs
              $1.50 and pays 5 APU. Further time in that sitting still costs
              dollars and pays no more APU for you. When the dollars run out, the
              talk stops.
            </p>
          </article>
          <article className="bank-card p-6 sm:p-7">
            <span className="bank-badge">Another person</span>
            <h3 className="mt-4 text-xl font-semibold text-[color:var(--ink)]">
              $0.50 a message, $0.85 a second
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">
              You pay the whole charge. The other person keeps 75 percent. The
              office keeps 25 percent. A minute of voice is $51. A declined call
              costs nothing. This transfer mints no APU.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="bank-card p-8 lg:p-12">
          <span className="bank-badge">
            <ShieldCheck size={12} aria-hidden className="text-[color:var(--green)]" />
            Charges
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Transaction charges work like a tax on the deal
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-muted)]">
            Two charges are taken when a transaction happens, at a published rate,
            and they go to the office. Holdings are left alone. Unbilled time is
            left alone. A refused transaction charges nobody.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--ink)]">
                25 percent of a human reach
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                On a $0.50 message the office keeps $0.125 and the other person
                keeps $0.375. On one second of voice the office keeps $0.2125.
                The charge stays in APW$.
              </p>
            </article>
            <article className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--ink)]">
                12.5 percent of a stall ticket
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                The buyer pays the SOL you agreed. The seller receives 87.5
                percent. The treasury receives 12.5 percent, in the same office
                that later pays cash-out.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <span className="bank-badge">Rates</span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)]">
            Several rates are published. Each one has a job.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            Cash-out at Econext uses 0.00029359 SOL per APU. The board also
            labels 150 APW$ per SOL and 0.0664875 APW$ per APU. Those three
            numbers are stored separately. A peer price is whatever two people
            accept. A bundle uses a fourth menu.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bundles.map(([burn, dollars]) => (
            <article key={burn} className="bank-card p-5">
              <p className="text-sm text-[color:var(--ink-muted)]">Burn {burn}</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--ink)]">
                {dollars}
              </p>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Pocket money from the bank menu.
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-muted)]">
          Cash-out starts at 50 APU and about $50 of world dollars. The day stops
          at 10 SOL of payouts. The wait is 7 to 14 business days. A seller at
          the stall beats that bank rate, after the fee, when the buyer pays
          above about 0.00033553 SOL per APU.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--green)] bg-[color:var(--green)] p-8 text-white shadow-[var(--shadow-lg)] lg:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Get started
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              Pick a desk. Bring the visa back with you.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              A specimen night starts at $10, talks for one billed minute, buys a
              $4.99 thing, and ends at $3.51 and 17 APU. That night is real. It
              is still short of a cash-out. The brochure draws the flows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WORLD_SERVER_URL}
                className="btn-fluid bg-white px-5 py-3 text-sm text-[color:var(--green)]"
              >
                World 1 immigration
              </a>
              <a
                href={WORLD2_URL}
                className="btn-fluid border border-white/40 bg-white/15 px-5 py-3 text-sm text-white hover:bg-white/25"
              >
                World 2 immigration
              </a>
              <Link
                href={EARN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid border border-white/40 bg-white/15 px-5 py-3 text-sm text-white hover:bg-white/25"
              >
                <Store size={16} aria-hidden />
                Econext
              </Link>
              <a
                href={CITIZENSHIP_BROCHURE_PATH}
                download
                className="btn-fluid border border-white/40 bg-white/15 px-5 py-3 text-sm text-white hover:bg-white/25"
              >
                <Download size={16} aria-hidden />
                Brochure PDF
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
