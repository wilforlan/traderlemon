"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import clsx from "clsx";

import { CommunityCta } from "@/components/community-cta";
import { siteNav } from "@/lib/site-links";

export const SiteHeader = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)]/80 bg-[color:var(--surface)]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)]">
          v0peer
        </Link>

        <nav className="hidden items-center gap-1 md:flex md:gap-1.5">
          <DesktopLinks pathname={pathname} />
          <div className="ml-1">
            <CommunityCta compact />
          </div>
        </nav>

        <button
          type="button"
          className="btn-fluid btn-secondary inline-flex h-10 w-10 items-center justify-center p-0 md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          className="border-t border-[color:var(--line)] bg-[color:var(--surface)] md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            <MobileLink href="/" active={pathname === "/"} onNavigate={() => setMenuOpen(false)}>
              Home
            </MobileLink>
            {siteNav.map((link) => {
              if (link.kind === "external") {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-fluid btn-ghost justify-between px-4 py-3 text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={14} aria-hidden className="opacity-60" />
                  </a>
                );
              }

              return (
                <MobileLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                  onNavigate={() => setMenuOpen(false)}
                >
                  {link.label}
                </MobileLink>
              );
            })}
            <div className="mt-3 border-t border-[color:var(--line)] pt-4">
              <CommunityCta />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

const DesktopLinks = ({ pathname }: { readonly pathname: string }) => {
  return (
    <>
      <Link
        href="/"
        className={clsx(
          "btn-fluid px-3 py-1.5 text-sm",
          pathname === "/"
            ? "bg-[color:var(--ink)] text-white shadow-[var(--shadow-sm)]"
            : "btn-ghost",
        )}
      >
        Home
      </Link>
      {siteNav.map((link) => {
        if (link.kind === "external") {
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fluid btn-ghost px-3 py-1.5 text-sm"
            >
              {link.label}
              <ExternalLink size={12} aria-hidden className="opacity-60" />
            </a>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "btn-fluid px-3 py-1.5 text-sm",
              pathname === link.href
                ? "bg-[color:var(--ink)] text-white shadow-[var(--shadow-sm)]"
                : "btn-ghost",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

const MobileLink = ({
  href,
  active,
  onNavigate,
  children,
}: {
  readonly href: string;
  readonly active: boolean;
  readonly onNavigate: () => void;
  readonly children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={clsx(
        "btn-fluid justify-start px-4 py-3 text-base",
        active
          ? "bg-[color:var(--ink)] text-white shadow-[var(--shadow-sm)]"
          : "btn-ghost",
      )}
    >
      {children}
    </Link>
  );
};
