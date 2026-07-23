import { z } from "zod";

import { MarketRatesSchema, type MarketRates } from "./conversion";

const getEconextApiBase = (): string => {
  const configured = process.env.ECONEXT_API_URL ?? process.env.NEXT_PUBLIC_ECONEXT_API_URL;
  return (configured ?? "http://localhost:3001").replace(/\/$/, "");
};

export const fetchMarketRates = async (input?: {
  readonly fetchImpl?: typeof fetch;
}): Promise<MarketRates> => {
  const fetchImpl = input?.fetchImpl ?? fetch;
  const response = await fetchImpl(`${getEconextApiBase()}/api/market/rates`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Market rates unavailable (${response.status})`);
  }
  const body: unknown = await response.json();
  return MarketRatesSchema.parse(body);
};

export const connectWithCredentials = async (input: {
  readonly json: string;
  readonly fetchImpl?: typeof fetch;
}): Promise<{ readonly nodeId: string }> => {
  const fetchImpl = input.fetchImpl ?? fetch;
  const response = await fetchImpl("/api/auth/connect", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "credentials", json: input.json }),
  });
  if (!response.ok) {
    const body = z
      .object({ error: z.string().optional() })
      .safeParse(await response.json().catch(() => ({})));
    throw new Error(body.success ? (body.data.error ?? "Connection failed") : "Connection failed");
  }
  const parsed = z.object({ nodeId: z.string() }).parse(await response.json());
  return parsed;
};
