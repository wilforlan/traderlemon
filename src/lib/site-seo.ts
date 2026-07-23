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
  brandName: z.literal("Traderlemon"),
  defaultTitle: z.string().min(1),
  defaultDescription: z.string().min(1),
  openGraphTitle: z.string().min(1),
  openGraphDescription: z.string().min(1),
  twitterTitle: z.string().min(1),
  twitterDescription: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(4),
  ogImage: z.object({
    path: z.literal("/traderlemon-og.png"),
    width: z.literal(1200),
    height: z.literal(630),
    alt: z.string().min(1),
  }),
  iconPath: z.literal("/traderlemon-icon.png"),
  pages: z.object({
    home: SitePageSeoSchema,
    "get-started": SitePageSeoSchema,
    merchant: SitePageSeoSchema,
  }),
});

export const siteSeo = SiteSeoSchema.parse({
  brandName: "Traderlemon",
  defaultTitle: "Traderlemon — Trade APU on Agent Play's second economy",
  defaultDescription:
    "Convert SOL to APU on Traderlemon, the Agent Play trading desk. Connect a Solana wallet, settle through Econext rates, and circulate growth into community.",
  openGraphTitle: "Traderlemon — APU trading desk for Agent Play",
  openGraphDescription:
    "Buy and sell Agent Play APU with WalletConnect. SOL↔APU conversion on a desk built for the second economy — growth that funds social development.",
  twitterTitle: "Traderlemon — Trade APU with SOL",
  twitterDescription:
    "The Agent Play APU desk: convert SOL, connect credentials, and move liquidity through merchants and neighborhoods.",
  keywords: [
    "Traderlemon",
    "APU",
    "Agent Play",
    "Solana",
    "SOL to APU",
    "WalletConnect",
    "second economy",
    "Econext",
  ],
  ogImage: {
    path: "/traderlemon-og.png",
    width: 1200,
    height: 630,
    alt: "Traderlemon — Trade APU on Agent Play's second economy",
  },
  iconPath: "/traderlemon-icon.png",
  pages: {
    home: {
      title: "Trade APU",
      description:
        "Convert SOL to APU on Traderlemon, the Agent Play trading desk. Connect a Solana wallet, settle through Econext rates, and circulate growth into community.",
      path: "/",
    },
    "get-started": {
      title: "Create Agent Play World account",
      description:
        "Create an Agent Play World account, save credentials.json, and connect safely on Traderlemon. No password reset — the file is your key to the APU desk.",
      path: "/get-started",
    },
    merchant: {
      title: "Become an APU merchant",
      description:
        "Accept APU for goods and services on Agent Play's second economy. List as a merchant on Traderlemon and help circulate growth into local social development.",
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
      template: "%s · Traderlemon",
    },
    description: siteSeo.defaultDescription,
    applicationName: siteSeo.brandName,
    keywords: siteSeo.keywords,
    authors: [{ name: "Traderlemon" }],
    creator: "Traderlemon",
    publisher: "Traderlemon",
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
      title: `${page.title} · Traderlemon`,
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
      title: `${page.title} · Traderlemon`,
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
