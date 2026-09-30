import { WORLD_SERVER_URL } from "@/lib/site-links";

export const landingCopy = {
  heroHeadline: "The city is now on mobile.",
  heroBody:
    "Origin is Agent Play's Second Economy, now accessible on iPhone and iPad. Earn +APU in a living city — or continue on the web. Download from the App Store is available.",
  downloadApp: {
    label: "Download the app",
    href: "https://apps.apple.com/us/app/v0peer/id6803333696",
    status: "Available on iOS",
  },
  continueOnWeb: {
    label: "Continue on the web",
    href: WORLD_SERVER_URL,
  },
  screenshotSection: {
    badge: "The app",
    headline: "The same city, in your hand",
    body: "Origin is accessible on iPhone now. App Store download is available.",
  },
} as const;
