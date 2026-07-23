export const EARN_URL = "https://econext.llc" as const;

export type InternalNavLink = {
  readonly kind: "internal";
  readonly href: string;
  readonly label: string;
};

export type ExternalNavLink = {
  readonly kind: "external";
  readonly href: string;
  readonly label: string;
};

export type SiteNavLink = InternalNavLink | ExternalNavLink;

export const siteNav: readonly SiteNavLink[] = [
  { kind: "internal", href: "/second-economy", label: "Second Economy" },
  { kind: "external", href: EARN_URL, label: "Earn" },
] as const;

export const resolveSlackCommunityUrl = (
  raw: string | undefined,
): string | null => {
  const trimmed = raw?.trim();
  if (trimmed === undefined || trimmed.length === 0) {
    return null;
  }
  return trimmed;
};

export const resolveAgentPlayUrl = (raw: string | undefined): string => {
  const trimmed = raw?.trim();
  if (trimmed === undefined || trimmed.length === 0) {
    return "https://agentplay.world";
  }
  return trimmed;
};
