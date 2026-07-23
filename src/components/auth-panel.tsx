"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FileJson, Upload } from "lucide-react";

import { connectWithCredentials } from "@/lib/econext-client";
import { parseCredentialsUpload } from "@/lib/credentials";

type LoadedCredentials = {
  readonly fileName: string;
  readonly rawJson: string;
  readonly nodeId: string;
};

export const AuthPanel = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState<LoadedCredentials | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined) {
      return;
    }
    setBusy(true);
    setError(null);
    setLoaded(null);
    try {
      const text = await file.text();
      const parsed = parseCredentialsUpload(text);
      if (!parsed.ok) {
        setError(parsed.error);
        return;
      }
      setLoaded({
        fileName: file.name,
        rawJson: parsed.rawJson,
        nodeId: parsed.fields.nodeId,
      });
    } catch {
      setError("Could not read credentials.json.");
    } finally {
      setBusy(false);
      if (inputRef.current !== null) {
        inputRef.current.value = "";
      }
    }
  };

  const onConnect = async () => {
    if (loaded === null) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await connectWithCredentials({ json: loaded.rawJson });
      router.push("/#convert");
      router.refresh();
    } catch (connectError) {
      setError(
        connectError instanceof Error ? connectError.message : "Connection failed",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="connect"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 sm:px-6"
    >
      <div className="grid gap-6 rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(244,251,246,0.95),rgba(255,250,230,0.9))] p-6 lg:grid-cols-[1fr_1.1fr] lg:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-deep)]">
            Account
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--ink)]">
            Authenticate with your credentials file
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            Traderlemon uses your Agent Play World credentials.json — never a database of
            its own. Upload the file you saved when you created your account.
          </p>
          <Link
            href="/get-started"
            className="mt-6 inline-flex rounded-full bg-[color:var(--green)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(27,122,78,0.22)]"
          >
            Create Agent Play World Account
          </Link>
        </div>

        <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/90 p-5">
          {loaded === null ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[color:var(--line)] bg-[color:var(--mint)]/35 px-6 py-10 text-center transition-colors hover:border-[color:var(--green)]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Upload size={20} className="text-[color:var(--green)]" />
              </span>
              <span className="text-sm font-medium text-[color:var(--ink)]">
                Upload credentials.json
              </span>
              <span className="max-w-sm text-xs text-[color:var(--ink-muted)]">
                Your passphrase stays local until you confirm connect.
              </span>
              <input
                ref={inputRef}
                type="file"
                accept="application/json,.json"
                className="sr-only"
                onChange={onFile}
                disabled={busy}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--mint)]/30 px-4 py-3">
                <FileJson className="mt-0.5 text-[color:var(--green)]" size={18} />
                <div>
                  <p className="text-sm font-semibold text-[color:var(--ink)]">
                    {loaded.fileName}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--ink-muted)]">
                    Node {loaded.nodeId}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void onConnect()}
                  disabled={busy}
                  className="rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {busy ? "Connecting…" : "Connect account"}
                </button>
                <button
                  type="button"
                  onClick={() => setLoaded(null)}
                  className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-[color:var(--ink-muted)]"
                >
                  Choose another file
                </button>
              </div>
            </div>
          )}
          {error !== null ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};
