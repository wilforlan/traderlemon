import Link from "next/link";

import type { LegalDocument } from "@/lib/legal";

export const LegalDocumentView = ({
  document,
  companion,
}: {
  readonly document: LegalDocument;
  readonly companion: { readonly href: string; readonly label: string };
}) => {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-28 sm:px-6">
      <p className="text-sm text-[color:var(--ink-muted)]">
        Effective {document.effectiveDate}. Operator: {document.operator}, a
        Delaware corporation.
      </p>
      <p className="mt-6 text-base leading-relaxed text-[color:var(--ink-muted)]">
        {document.intro}
      </p>
      <p className="mt-4 text-sm">
        <Link
          href={companion.href}
          className="font-semibold text-[color:var(--green)]"
        >
          {companion.label}
        </Link>
      </p>

      {document.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[color:var(--ink)]">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={`${section.heading}-${String(index)}`}
              className="mt-4 text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
};
