import Link from "next/link";

import { LEGAL_OPERATOR } from "@/lib/legal";
import { EARN_URL, storeFooterLinks } from "@/lib/site-links";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--surface)]/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-[color:var(--ink-muted)]">
          © {new Date().getFullYear()} {LEGAL_OPERATOR}. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {storeFooterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={EARN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
          >
            Earn
          </a>
        </nav>
      </div>
    </footer>
  );
};
