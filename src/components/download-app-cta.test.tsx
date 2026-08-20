import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { landingCopy } from "@/lib/landing-copy";

import { DownloadAppCta } from "./download-app-cta";

describe("Download app CTA", () => {
  it("shows coming soon and is not a store link", () => {
    const html = renderToStaticMarkup(<DownloadAppCta />);

    expect(html).toContain(landingCopy.downloadApp.label);
    expect(html).toContain(landingCopy.downloadApp.status);
    expect(html).toContain("disabled");
    expect(html).not.toContain("href");
    expect(html).not.toContain("apps.apple.com");
  });
});
