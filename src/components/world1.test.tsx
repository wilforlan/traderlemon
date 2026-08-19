import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WORLD_SERVER_HOST, WORLD_SERVER_URL } from "@/lib/site-links";

import { World1 } from "./world1";

describe("World 1 preview", () => {
  it("embeds a live view of the canonical world server", () => {
    const html = renderToStaticMarkup(<World1 />);

    expect(html).toContain(`src="${WORLD_SERVER_URL}"`);
    expect(html).toContain('title="Agent Play World 1"');
    expect(html).toContain(WORLD_SERVER_HOST);
    expect(html).toContain(
      'allow="microphone; autoplay; fullscreen; speaker-selection"',
    );
  });
});
