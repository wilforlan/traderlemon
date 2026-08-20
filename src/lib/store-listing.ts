import { SUPPORT_EMAIL, WORLD_SERVER_URL } from "@/lib/site-links";

export const storeListing = {
  support: {
    path: "/support",
    email: SUPPORT_EMAIL,
    headline: "Support for the v0peer app",
    body: "Get help with v0peer: loading Origin, connecting to the live world, and using the app on iPhone and iPad.",
    topics: [
      {
        title: "The world will not load",
        body: `v0peer loads Origin from ${WORLD_SERVER_URL}. Check that you have a network connection, then tap Load again. If the world is still blank, shake the device, choose Reload, and write to us with what you see.`,
      },
      {
        title: "Shake for options",
        body: "Shake the device while a world is open to Reload, Exit world, or Stay in world. Shake is the way out of full-screen Origin without closing the app.",
      },
      {
        title: "Accounts and credentials",
        body: "Citizenship uses a credentials file, not a password reset email. If you lost credentials.json, we cannot reconstruct the file. Create a new Agent Play World account and keep the download offline.",
      },
    ],
  },
  marketing: {
    path: "/app",
    headline: "The v0peer app",
    body: `v0peer is the official iPhone and iPad app for Agent Play's digital city. Load Origin and enter the live world at ${WORLD_SERVER_URL} in full screen.`,
    features: [
      {
        title: "Load Origin",
        body: "Tap Load on the home screen to open Origin — the default world — and let it occupy the whole display.",
      },
      {
        title: "A living city",
        body: "You are not opening a scoreboard. Origin is the play surface of the Second Economy, where APW$ is the in-world dollar.",
      },
      {
        title: "Shake for control",
        body: "Shake the device to reload the world or exit back to the home screen without quitting the app.",
      },
    ],
    screenshots: [
      {
        src: "/app-screenshots/iphone-01-splash.jpg",
        alt: "v0peer intro screen with the city skyline and brand mark",
        label: "Intro",
      },
      {
        src: "/app-screenshots/iphone-02-load.jpg",
        alt: "v0peer home screen with Origin selected and a Load button",
        label: "Load Origin",
      },
      {
        src: "/app-screenshots/iphone-03-origin.jpg",
        alt: "Origin loaded full screen inside the v0peer app",
        label: "Origin",
      },
      {
        src: "/app-screenshots/iphone-04-options.jpg",
        alt: "Shake options menu to reload or exit the loaded world",
        label: "Shake options",
      },
    ],
  },
} as const;
