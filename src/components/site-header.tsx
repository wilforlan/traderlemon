"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Wallet } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Trade" },
  { href: "/merchant", label: "Merchants" },
  { href: "/get-started", label: "Get started" },
] as const;

export const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <header className="relative z-20 border-b border-[color:var(--line)] bg-[color:var(--surface)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)]">
            Traderlemon
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--gold-deep)] sm:inline">
            APU desk
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                pathname === link.href
                  ? "bg-[color:var(--green)] text-white"
                  : "text-[color:var(--ink-muted)] hover:bg-[color:var(--mint)] hover:text-[color:var(--ink)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/merchant"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--gold)] px-3 py-1.5 text-sm font-semibold text-[color:var(--ink)] shadow-[0_8px_24px_rgba(201,162,39,0.28)] transition-transform hover:-translate-y-0.5"
          >
            <Store size={14} aria-hidden />
            Become a merchant
          </Link>
          <a
            href="#connect"
            className="hidden items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-sm text-[color:var(--ink)] sm:inline-flex"
          >
            <Wallet size={14} aria-hidden />
            Connect
          </a>
        </nav>
      </div>
    </header>
  );
};
