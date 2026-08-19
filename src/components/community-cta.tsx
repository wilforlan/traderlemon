import { Landmark } from "lucide-react";
import clsx from "clsx";

import { WORLD_SERVER_URL } from "@/lib/site-links";

type CommunityCtaProps = {
  readonly compact?: boolean;
  readonly tone?: "primary" | "onDark";
};

export const CommunityCta = ({
  compact = false,
  tone = "primary",
}: CommunityCtaProps) => {
  const className = clsx(
    "btn-fluid text-sm",
    compact ? "px-3.5 py-1.5" : "px-5 py-3",
    tone === "onDark"
      ? "bg-white text-[color:var(--ink)] shadow-[0_10px_28px_rgba(0,0,0,0.18)] hover:bg-white/95"
      : "btn-primary",
  );

  return (
    <a
      href={WORLD_SERVER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Landmark size={compact ? 14 : 16} aria-hidden />
      Start citizenship
    </a>
  );
};
