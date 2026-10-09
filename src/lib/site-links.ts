export const EARN_URL = "https://econext.llc" as const;

export const WORLD_SERVER_HOST = "world1.v0peer.org" as const;

export const WORLD_SERVER_URL = `https://${WORLD_SERVER_HOST}` as const;

export const WORLD2_URL = "https://world2.v0peer.org" as const;

export const SUPPORT_EMAIL = "williams@viroke.com" as const;

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

export const storeFooterLinks = [
  { href: "/app", label: "The app" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
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
    return "https://agent-play.com";
  }
  return trimmed;
};
