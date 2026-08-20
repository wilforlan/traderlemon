import { Download } from "lucide-react";

import { landingCopy } from "@/lib/landing-copy";

export const DownloadAppCta = () => {
  return (
    <button
      type="button"
      disabled
      className="btn-fluid btn-primary px-5 py-3 text-sm"
    >
      <Download size={16} aria-hidden />
      {landingCopy.downloadApp.label}
      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
        {landingCopy.downloadApp.status}
      </span>
    </button>
  );
};
