import type { Metadata } from "next";
import { z } from "zod";

export const SitePageKeySchema = z.enum([
  "home",
  "second-economy",
  "get-started",
  "merchant",
  "support",
  "app",
  "privacy",
  "terms",
]);
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
  logoPath: z.literal("/v0peer-logo.png"),
  iconPath: z.literal("/v0peer-icon.png"),
  pages: z.object({
    home: SitePageSeoSchema,
    "second-economy": SitePageSeoSchema,
    "get-started": SitePageSeoSchema,
    merchant: SitePageSeoSchema,
    support: SitePageSeoSchema,
    app: SitePageSeoSchema,
    privacy: SitePageSeoSchema,
    terms: SitePageSeoSchema,
  }),
});

export const siteSeo = SiteSeoSchema.parse({
  brandName: "v0peer",
  defaultTitle: "v0peer — The city grows on-chain",
  defaultDescription:
    "v0peer is Agent Play's digital city. APW$ is the in-world dollar of a Second Economy that grows on-chain.",
  openGraphTitle: "v0peer — The city grows on-chain.",
  openGraphDescription:
    "APW$ powers Agent Play's Second Economy. A digital city that grows on-chain.",
  twitterTitle: "The city grows on-chain.",
  twitterDescription:
    "APW$ powers Agent Play's Second Economy. A digital city that grows on-chain.",
  keywords: [
    "v0peer",
    "Agent Play",
    "Second Economy",
    "APW$",
    "on-chain",
    "virtual world",
    "digital city",
    "APU",
    "Econext",
    "community",
  ],
  ogImage: {
    path: "/v0peer-og.png",
    width: 1200,
    height: 630,
    alt: "v0peer logo — the city grows on-chain.",
  },
  logoPath: "/v0peer-logo.png",
  iconPath: "/v0peer-icon.png",
  pages: {
    home: {
      title: "The city grows on-chain.",
      description:
        "v0peer is Agent Play's digital city. APW$ is the in-world dollar of a Second Economy that grows on-chain.",
      path: "/",
    },
    "second-economy": {
      title: "What is the Second Economy",
      description:
        "APW$ as virtual USD, inhabited neighborhoods, and how Agent Play's Second Economy ties streets to shared prosperity.",
      path: "/second-economy",
    },
    "get-started": {
      title: "Create an Agent Play World account",
      description:
        "Create an Agent Play World account, save credentials.json, and connect safely on v0peer.",
      path: "/get-started",
    },
    merchant: {
      title: "Become an APU merchant",
      description:
        "Accept APU for goods and services on Agent Play's second economy.",
      path: "/merchant",
    },
    support: {
      title: "Support for the v0peer app",
      description:
        "Get help with v0peer: loading Origin, connecting to the live world, and using the app on iPhone and iPad.",
      path: "/support",
    },
    app: {
      title: "The v0peer app",
      description:
        "Load Origin on iPhone and iPad and enter Agent Play's digital city in full screen.",
      path: "/app",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "How Viroke Technologies Inc. collects, uses, and protects information in v0peer and on v0peer.org.",
      path: "/privacy",
    },
    terms: {
      title: "Terms of Use",
      description:
        "Terms governing the v0peer app and website, operated by Viroke Technologies Inc., a Delaware corporation.",
      path: "/terms",
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
    category: "games",
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
  image: string;
  logo: string;
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
    image: `${appUrl}${siteSeo.ogImage.path}`,
    logo: `${appUrl}${siteSeo.logoPath}`,
  };
};
