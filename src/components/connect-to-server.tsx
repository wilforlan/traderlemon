import { ArrowRight, Server } from "lucide-react";

import { WORLD_SERVER_HOST, WORLD_SERVER_URL } from "@/lib/site-links";

export const ConnectToServer = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="bank-card grid gap-8 overflow-hidden p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <div className="max-w-lg">
          <span className="bank-badge">
            <Server size={12} aria-hidden className="text-[color:var(--green)]" />
            Connect to server
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
            Point your node at World 1
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base">
            Use this server URL in the Agent Play CLI, in credentials.json as
            serverUrl, and when initializing a host. It is the live world
            endpoint for v0peer.
          </p>
          <div className="mt-8">
            <a
              href={WORLD_SERVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fluid btn-primary px-5 py-3 text-sm"
            >
              Open world server
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--mint)]/50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
            Server URL
          </p>
          <p className="mt-4 break-all font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)] sm:text-3xl">
            {WORLD_SERVER_HOST}
          </p>
          <code className="mt-4 block break-all rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--ink)]">
            {WORLD_SERVER_URL}
          </code>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            npx agent-play initialize --server-url {WORLD_SERVER_URL}
          </p>
        </div>
      </div>
    </section>
  );
};
