import type { Metadata } from "next";
import { Scale } from "lucide-react";

import { LegalDocumentView } from "@/components/legal-document-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SUPPORT_EMAIL } from "@/lib/site-links";
import { privacyPolicy } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({ page: "privacy" });

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4 pb-8 pt-16 sm:px-6 lg:pt-24">
          <span className="bank-badge">
            <Scale size={12} aria-hidden className="text-[color:var(--green)]" />
            Legal
          </span>
          <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-5xl">
            {privacyPolicy.title}
          </h1>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-6 inline-flex text-sm font-semibold text-[color:var(--green)]"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </section>
      <LegalDocumentView
        document={privacyPolicy}
        companion={{ href: "/terms", label: "Read the Terms of Use" }}
      />
      <SiteFooter />
    </main>
  );
}
