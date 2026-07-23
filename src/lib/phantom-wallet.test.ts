import { describe, expect, it } from "vitest";

import { readPhantomAddress } from "./phantom-wallet";

describe("readPhantomAddress", () => {
  it("returns null when Phantom publicKey is null", () => {
    expect(readPhantomAddress({ publicKey: null })).toBeNull();
  });

  it("returns null when Phantom is not connected", () => {
    expect(readPhantomAddress({ publicKey: undefined })).toBeNull();
    expect(readPhantomAddress(null)).toBeNull();
  });

  it("returns the address string when a publicKey is present", () => {
    expect(
      readPhantomAddress({
        publicKey: { toString: () => "So11111111111111111111111111111111111111112" },
      }),
    ).toBe("So11111111111111111111111111111111111111112");
  });
});
