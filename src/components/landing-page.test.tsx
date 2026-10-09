import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { landingCopy } from "@/lib/landing-copy";
import { WORLD_SERVER_URL } from "@/lib/site-links";
import { storeListing } from "@/lib/store-listing";

import { LandingPage } from "./landing-page";

describe("Landing hero", () => {
  it("shows app screenshots with a coming-soon download and a web continuation", () => {
    const html = renderToStaticMarkup(<LandingPage />);

    expect(html).toContain(landingCopy.heroHeadline);
    expect(html).toContain(landingCopy.downloadApp.label);
    expect(html).toContain(landingCopy.downloadApp.status);
    expect(html).toContain(landingCopy.continueOnWeb.label);
    expect(html).toContain(`href="${WORLD_SERVER_URL}"`);
    expect(html).not.toMatch(/SimCity/i);
    expect(html).not.toMatch(/city-builder/i);

    storeListing.marketing.screenshots.forEach((screenshot) => {
      expect(html).toContain(`src="${screenshot.src}"`);
      expect(html).toContain(`alt="${screenshot.alt}"`);
    });

    const hero = html.slice(0, html.indexOf('aria-label="The app"'));
    expect(hero).toContain("Read our story");
    expect(hero).toContain('href="https://vzeropeer.substack.com/"');
    expect(hero).not.toContain("Download the app");
    const nextStat = hero.slice(hero.indexOf(">Next<"));
    expect(nextStat).toContain("Join Us");
    expect(nextStat).not.toContain("Continue on the web");
    expect(hero).toContain('aria-label="v0peer network"');
    expect(hero).not.toContain("agent-play-network-kicker");
    expect(hero).not.toContain(">Agent Play network<");
    expect(hero).not.toContain("Agent Play");
    expect(hero).toContain('aria-label="Money flow map"');
    expect(hero).toContain("Walk in");
    expect(hero).toContain("Play Maple Ave");
    expect(hero).toContain("Take it to the bank");
    expect(hero).not.toContain("phone-bezel");

    const world2Intro = html.slice(
      html.indexOf('aria-label="World 2"'),
      html.indexOf(landingCopy.world2Section.headline),
    );
    expect(world2Intro).toContain(landingCopy.world2Section.badge);
    expect(world2Intro).toContain(landingCopy.world2Section.betaLabel);
    expect(world2Intro).toContain(landingCopy.world2Section.betaNote);
    expect(html).toContain("Try World 2");
    expect(html).not.toContain("Agent Play");
    expect(html).not.toContain("Enter World 2");
    expect(html).toContain(landingCopy.world2Section.headline);
    expect(html).toContain(landingCopy.world2Section.body);
    expect(html).toContain(`href="${landingCopy.world2Section.ctaHref}"`);
    expect(html).toContain("Maple Ave");
    expect(html).toContain("$10 APW$");
    expect(html).toContain("100 APU");

    expect(html).toContain("lg:grid-cols-2");
  });
});
