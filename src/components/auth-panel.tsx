"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FileJson, KeyRound, Upload } from "lucide-react";

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
      router.push("/#trade");
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
      id="account"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-28 sm:px-6"
    >
      <div className="bank-card grid gap-10 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div className="max-w-md">
          <span className="bank-badge">
            <KeyRound size={12} aria-hidden className="text-[color:var(--green)]" />
            Account
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[color:var(--ink)] sm:text-4xl">
            Authenticate with credentials
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)]">
            Upload the Agent Play World credentials.json you saved when you created your
            account. v0peer never stores passwords in its own database.
          </p>
          <Link
            href="/get-started"
            className="btn-fluid btn-primary mt-8 px-5 py-3 text-sm"
          >
            Create Agent Play World Account
          </Link>
        </div>

        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
          {loaded === null ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-dashed border-[color:var(--line)] bg-white px-6 py-12 text-center transition-[border-color,box-shadow] hover:border-[color:var(--green)] hover:shadow-[var(--shadow-md)]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--mint)] text-[color:var(--green)] shadow-[var(--shadow-sm)]">
                <Upload size={20} aria-hidden />
              </span>
              <span className="text-sm font-semibold text-[color:var(--ink)]">
                Upload credentials.json
              </span>
              <span className="max-w-sm text-xs leading-relaxed text-[color:var(--ink-muted)]">
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
              <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 shadow-[var(--shadow-sm)]">
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
                  className="btn-fluid btn-primary px-4 py-2.5 text-sm"
                >
                  {busy ? "Connecting…" : "Connect account"}
                </button>
                <button
                  type="button"
                  onClick={() => setLoaded(null)}
                  className="btn-fluid btn-secondary px-4 py-2.5 text-sm"
                >
                  Choose another file
                </button>
              </div>
            </div>
          )}
          {error !== null ? (
            <p className="mt-4 rounded-xl border border-red-100 bg-red-50/90 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};
