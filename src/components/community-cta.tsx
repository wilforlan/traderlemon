import { MessagesSquare } from "lucide-react";
import clsx from "clsx";

import { resolveSlackCommunityUrl } from "@/lib/site-links";

type CommunityCtaProps = {
  readonly compact?: boolean;
  readonly tone?: "primary" | "onDark";
};

export const CommunityCta = ({
  compact = false,
  tone = "primary",
}: CommunityCtaProps) => {
  const slackUrl = resolveSlackCommunityUrl(
    process.env.NEXT_PUBLIC_SLACK_COMMUNITY_URL,
  );

  const className = clsx(
    "btn-fluid text-sm",
    compact ? "px-3.5 py-1.5" : "px-5 py-3",
    tone === "onDark"
      ? "bg-white text-[color:var(--ink)] shadow-[0_10px_28px_rgba(0,0,0,0.18)] hover:bg-white/95"
      : "btn-primary",
    slackUrl === null && "opacity-60",
  );

  if (slackUrl === null) {
    return (
      <span
        className={className}
        title="Set NEXT_PUBLIC_SLACK_COMMUNITY_URL to enable"
      >
        <MessagesSquare size={compact ? 14 : 16} aria-hidden />
        Join Slack
      </span>
    );
  }

  return (
    <a
      href={slackUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MessagesSquare size={compact ? 14 : 16} aria-hidden />
      Join Slack
    </a>
  );
};
