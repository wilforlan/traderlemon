import { Download } from "lucide-react";

import { landingCopy } from "@/lib/landing-copy";
import Link from "next/link";

export const DownloadAppCta = () => {
  return (
    <Link
      href={landingCopy.downloadApp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-fluid btn-primary px-5 py-3 text-sm"
    >
      <Download size={16} aria-hidden />
      {landingCopy.downloadApp.label}
      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
        {landingCopy.downloadApp.status}
      </span>
    </Link>
  );
};
