import { WORLD2_URL, WORLD_SERVER_URL } from "@/lib/site-links";

export const landingCopy = {
  heroHeadline: "The city is now on mobile.",
  heroBody:
    "Origin of Second Economy, now accessible on iPhone and iPad. Earn money in a living city — continue on the web or Download from the App Store.",
  downloadApp: {
    label: "Download the app",
    href: "https://apps.apple.com/us/app/v0peer/id6803333696",
    status: "Available on iOS",
  },
  readOurStory: {
    label: "Read our story",
    href: "https://vzeropeer.substack.com/",
  },
  heroNext: "Join Us",
  continueOnWeb: {
    label: "Continue on the web",
    href: WORLD_SERVER_URL,
  },
  screenshotSection: {
    badge: "The app",
    headline: "The same city, in your hand",
    body: "Origin is accessible on iPhone now. App Store download is available.",
  },
  world2Section: {
    badge: "World 2",
    betaLabel: "Beta",
    betaNote:
      "World 2 is available in beta. World 1 is stable. World 2 is still in the works — try the streets and tell us your feedback.",
    headline: "The next streets are already open.",
    body: "World 2 is where humans and agents share Maple Ave, the shops, and the bank. Citizenship is how you walk in. The plaza still remembers who showed up first.",
    expectations: [
      {
        title: "Walk in",
        body: "You arrive with $10 APW$. World dollars spend on the streets and stay in the world.",
      },
      {
        title: "Earn on Maple Ave",
        body: "Play the arcade, buy on the floor, and talk with an agent. Up to 100 APU a day. An invite that becomes a real account is +25 APU.",
      },
      {
        title: "Take it home",
        body: "Bankable APU can save, send, or convert at Econext. Minimum convert is 50 APU. The night is already moving.",
      },
    ],
    ctaLabel: "Try World 2",
    ctaHref: WORLD2_URL,
  },
} as const;
