import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/citizenship",
}));

import CitizenshipPage from "./page";

describe("What is Citizenship", () => {
  it("explains citizenship, the visa file, and offers the brochure", () => {
    const html = renderToStaticMarkup(<CitizenshipPage />);

    expect(html).toContain("What is Citizenship");
    expect(html).toMatch(/Second Economy/i);
    expect(html).toContain("credentials.json");
    expect(html).toMatch(/visa/i);
    expect(html).toMatch(/private/i);
    expect(html).toMatch(/do not share/i);
    expect(html).toContain("APW$");
    expect(html).toContain("APU");
    expect(html).toContain("Econext");
    expect(html).toContain("0.00029359");
    expect(html).toContain("$0.50");
    expect(html).toContain("$0.85");
    expect(html).toContain("25 percent");
    expect(html).toContain("12.5 percent");
    expect(html).toContain('href="/v0peer-citizenship.pdf"');
    expect(html).toContain("https://world1.v0peer.org");
    expect(html).toContain("https://world2.v0peer.org");
  });

  it("previews the brochure in a new tab from the hero", () => {
    const html = renderToStaticMarkup(<CitizenshipPage />);
    const links = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(
      (match) => match[0],
    );
    const openBrochure = links.find((link) => link.includes("Open brochure"));
    const downloadBrochure = links.find((link) =>
      link.includes("Download the brochure"),
    );

    expect(openBrochure).toBeDefined();
    expect(openBrochure).toContain('href="/v0peer-citizenship.pdf"');
    expect(openBrochure).toContain('target="_blank"');
    expect(openBrochure).toContain('rel="noopener noreferrer"');
    expect(openBrochure).not.toContain("download");
    expect(html).not.toContain("Open World 1");

    expect(downloadBrochure).toContain("download");
  });

  it("publishes a downloadable brochure pdf", () => {
    const pdf = readFileSync(
      resolve(process.cwd(), "public/v0peer-citizenship.pdf"),
    );

    expect(pdf.subarray(0, 5).toString("utf8")).toBe("%PDF-");
    expect(pdf.length).toBeGreaterThan(20_000);
  });
});
