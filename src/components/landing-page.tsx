"use client";

import { useEffect, useState } from "react";

import { AuthPanel } from "@/components/auth-panel";
import { HeroSection } from "@/components/hero-section";
import { MarketCharts } from "@/components/market-charts";
import { SolApuConverter } from "@/components/sol-apu-converter";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { MarketRatesSchema, type MarketRates } from "@/lib/conversion";

export const LandingPage = () => {
  const [rates, setRates] = useState<MarketRates | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/market/rates", { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const parsed = MarketRatesSchema.parse(await response.json());
        if (!cancelled) {
          setRates(parsed);
        }
      } catch {
        // Converter surfaces rate errors; charts stay empty until rates load.
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <HeroSection />
      <WalletConnectButton />
      <SolApuConverter />
      <MarketCharts rates={rates} />
      <AuthPanel />
    </>
  );
};
