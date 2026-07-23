import { z } from "zod";

export const MarketRatesSchema = z.object({
  version: z.string(),
  apuSymbol: z.string(),
  apuToSolRate: z.number().positive(),
  solToApuRate: z.number().positive(),
  conversionSpreadBps: z.number().nonnegative(),
  solUsdReferenceRate: z.number().positive(),
  minConvertApu: z.number().nonnegative(),
  minConvertSol: z.number().nonnegative(),
  netApuToSolRate: z.number().positive(),
  netSolToApuRate: z.number().positive(),
  apwPerApu: z.number().positive(),
});

export type MarketRates = z.infer<typeof MarketRatesSchema>;

const spreadFactor = (spreadBps: number): number => 1 - spreadBps / 10_000;

export const quoteSolToApu = (input: {
  readonly solAmount: number;
  readonly rates: Pick<MarketRates, "apuToSolRate" | "conversionSpreadBps">;
}): number => {
  if (!Number.isFinite(input.solAmount) || input.solAmount <= 0) {
    return 0;
  }
  return Math.floor(
    (input.solAmount / input.rates.apuToSolRate) *
      spreadFactor(input.rates.conversionSpreadBps),
  );
};

export const quoteApuToSol = (input: {
  readonly apuAmount: number;
  readonly rates: Pick<MarketRates, "apuToSolRate" | "conversionSpreadBps">;
}): number => {
  if (!Number.isFinite(input.apuAmount) || input.apuAmount <= 0) {
    return 0;
  }
  return (
    input.apuAmount *
    input.rates.apuToSolRate *
    spreadFactor(input.rates.conversionSpreadBps)
  );
};
