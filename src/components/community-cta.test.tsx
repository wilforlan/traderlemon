import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WORLD_SERVER_URL } from "@/lib/site-links";

import { CommunityCta } from "./community-cta";

describe("Start citizenship CTA", () => {
  it("sends visitors to the World 1 server", () => {
    const html = renderToStaticMarkup(<CommunityCta />);

    expect(html).toContain("Start citizenship");
    expect(html).toContain(`href="${WORLD_SERVER_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).not.toContain("Join Slack");
  });
});
