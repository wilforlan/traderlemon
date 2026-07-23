import type { Metadata } from "next";
import { z } from "zod";

export const SitePageKeySchema = z.enum(["home", "get-started", "merchant"]);
export type SitePageKey = z.infer<typeof SitePageKeySchema>;

const SitePageSeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  path: z.string().min(1),
});

const SiteSeoSchema = z.object({
  brandName: z.literal("v0peer"),
  defaultTitle: z.string().min(1),
  defaultDescription: z.string().min(1),
  openGraphTitle: z.string().min(1),
  openGraphDescription: z.string().min(1),
  twitterTitle: z.string().min(1),
  twitterDescription: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(4),
  ogImage: z.object({
    path: z.literal("/v0peer-og.png"),
    width: z.literal(1200),
    height: z.literal(630),
    alt: z.string().min(1),
  }),
  iconPath: z.literal("/v0peer-icon.png"),
  pages: z.object({
    home: SitePageSeoSchema,
    "get-started": SitePageSeoSchema,
    merchant: SitePageSeoSchema,
  }),
});

export const siteSeo = SiteSeoSchema.parse({
  brandName: "v0peer",
  defaultTitle: "v0peer — Peer APU desk for Agent Play",
  defaultDescription:
    "Convert SOL to APU on v0peer, the peer trading desk for Agent Play. Connect a Solana wallet, settle through Econext rates, and circulate growth into community.",
  openGraphTitle: "v0peer — Peer APU desk for Agent Play",
  openGraphDescription:
    "Buy and sell Agent Play APU peer-to-peer with WalletConnect. SOL↔APU conversion on a calm desk built for the second economy.",
  twitterTitle: "v0peer — Trade APU with SOL",
  twitterDescription:
    "The Agent Play peer APU desk: convert SOL, connect credentials, and move liquidity through merchants and neighborhoods.",
  keywords: [
    "v0peer",
    "APU",
    "Agent Play",
    "Solana",
    "SOL to APU",
    "WalletConnect",
    "second economy",
    "Econext",
    "peer trading",
  ],
  ogImage: {
    path: "/v0peer-og.png",
    width: 1200,
    height: 630,
    alt: "v0peer — Peer APU desk for Agent Play",
  },
  iconPath: "/v0peer-icon.png",
  pages: {
    home: {
      title: "Trade APU",
      description:
        "Convert SOL to APU on v0peer, the peer trading desk for Agent Play. Connect a Solana wallet, settle through Econext rates, and circulate growth into community.",
      path: "/",
    },
    "get-started": {
      title: "Create Agent Play World account",
      description:
        "Create an Agent Play World account, save credentials.json, and connect safely on v0peer. No password reset — the file is your key to the peer APU desk.",
      path: "/get-started",
    },
    merchant: {
      title: "Become an APU merchant",
      description:
        "Accept APU for goods and services on Agent Play's second economy. List as a merchant on v0peer and help circulate growth into local social development.",
      path: "/merchant",
    },
  },
});

type BuildRootMetadataOptions = {
  appUrl: string;
};

export const resolveAppUrl = (raw?: string): string => {
  const trimmed = raw?.trim();
  if (trimmed && trimmed.length > 0) {
    return trimmed.replace(/\/$/, "");
  }
  return "http://localhost:3002";
};

export const buildRootMetadata = (
  options: BuildRootMetadataOptions,
): Metadata => {
  const { appUrl } = options;

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: siteSeo.defaultTitle,
      template: "%s · v0peer",
    },
    description: siteSeo.defaultDescription,
    applicationName: siteSeo.brandName,
    keywords: siteSeo.keywords,
    authors: [{ name: "v0peer" }],
    creator: "v0peer",
    publisher: "v0peer",
    category: "finance",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: siteSeo.brandName,
      title: siteSeo.openGraphTitle,
      description: siteSeo.openGraphDescription,
      images: [
        {
          url: siteSeo.ogImage.path,
          width: siteSeo.ogImage.width,
          height: siteSeo.ogImage.height,
          alt: siteSeo.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.twitterTitle,
      description: siteSeo.twitterDescription,
      images: [siteSeo.ogImage.path],
    },
    icons: {
      icon: [{ url: siteSeo.iconPath, type: "image/png" }],
      apple: [{ url: siteSeo.iconPath, type: "image/png" }],
    },
  };
};

type BuildPageMetadataOptions = {
  page: Exclude<SitePageKey, "home">;
};

export const buildPageMetadata = (
  options: BuildPageMetadataOptions,
): Metadata => {
  const page = siteSeo.pages[options.page];

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: `${page.title} · v0peer`,
      description: page.description,
      url: page.path,
      images: [
        {
          url: siteSeo.ogImage.path,
          width: siteSeo.ogImage.width,
          height: siteSeo.ogImage.height,
          alt: siteSeo.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} · v0peer`,
      description: page.description,
      images: [siteSeo.ogImage.path],
    },
  };
};

type BuildWebsiteJsonLdOptions = {
  appUrl: string;
};

export type WebsiteJsonLd = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  inLanguage: "en";
};

export const buildWebsiteJsonLd = (
  options: BuildWebsiteJsonLdOptions,
): WebsiteJsonLd => {
  const appUrl = resolveAppUrl(options.appUrl);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSeo.brandName,
    url: appUrl,
    description: siteSeo.defaultDescription,
    inLanguage: "en",
  };
};
