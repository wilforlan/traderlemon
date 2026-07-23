import { describe, expect, it } from "vitest";

import { quoteApuToSol, quoteSolToApu, type MarketRates } from "./conversion";
import { parseCredentialsUpload } from "./credentials";

const getMockRates = (overrides?: Partial<MarketRates>): MarketRates => ({
  version: "2026.07.2",
  apuSymbol: "APU",
  apuToSolRate: 0.00045,
  solToApuRate: 2222,
  conversionSpreadBps: 150,
  solUsdReferenceRate: 150,
  minConvertApu: 50,
  minConvertSol: 0.001,
  netApuToSolRate: 0.00045 * 0.985,
  netSolToApuRate: (1 / 0.00045) * 0.985,
  apwPerApu: 0.00045 * 0.985 * 150,
  ...overrides,
});

describe("SOL to APU quotes", () => {
  it("floors APU credited after conversion spread", () => {
    const rates = getMockRates();
    expect(quoteSolToApu({ solAmount: 0.1, rates })).toBe(
      Math.floor((0.1 / 0.00045) * 0.985),
    );
  });

  it("returns net SOL for APU sells", () => {
    expect(quoteApuToSol({ apuAmount: 100, rates: getMockRates() })).toBeCloseTo(
      100 * 0.00045 * 0.985,
      10,
    );
  });
});

describe("credentials upload parsing", () => {
  it("accepts a valid Agent Play World credentials file", () => {
    const result = parseCredentialsUpload(
      JSON.stringify({
        serverUrl: "https://play.example",
        nodeId: "node_abc",
        passw: "secret-pass",
        agentNodes: [{ id: "a1" }],
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.fields.nodeId).toBe("node_abc");
    expect(result.fields.agentNodeCount).toBe(1);
  });

  it("rejects credentials missing required fields", () => {
    const result = parseCredentialsUpload(JSON.stringify({ nodeId: "x" }));
    expect(result.ok).toBe(false);
  });
});
