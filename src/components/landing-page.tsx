"use client";

import { useEffect, useState } from "react";

import { AuthPanel } from "@/components/auth-panel";
import { HeroSection } from "@/components/hero-section";
import { MarketCharts } from "@/components/market-charts";
import { MarketRatesSchema, type MarketRates } from "@/lib/conversion";

export const LandingPage = () => {
  const [rates, setRates] = useState<MarketRates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setRatesLoading(true);
      setRatesError(null);
      try {
        const response = await fetch("/api/market/rates", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Could not load Econext market rates.");
        }
        const parsed = MarketRatesSchema.parse(await response.json());
        if (!cancelled) {
          setRates(parsed);
        }
      } catch (loadError) {
        if (!cancelled) {
          setRatesError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load Econext market rates.",
          );
        }
      } finally {
        if (!cancelled) {
          setRatesLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <HeroSection
        rates={rates}
        ratesLoading={ratesLoading}
        ratesError={ratesError}
      />
      <MarketCharts rates={rates} />
      <AuthPanel />
    </>
  );
};
