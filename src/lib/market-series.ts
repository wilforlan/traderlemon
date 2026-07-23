export type SeriesPoint = {
  readonly t: string;
  readonly apuSol: number;
  readonly volume: number;
};

export const buildSyntheticRateSeries = (input: {
  readonly netApuToSolRate: number;
  readonly points?: number;
  readonly now?: Date;
}): readonly SeriesPoint[] => {
  const points = input.points ?? 24;
  const now = input.now ?? new Date();
  const base = input.netApuToSolRate;

  return Array.from({ length: points }, (_, index) => {
    const hoursAgo = points - 1 - index;
    const at = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    const wave = Math.sin(index / 3) * 0.012 + Math.cos(index / 5) * 0.006;
    const apuSol = base * (1 + wave);
    const volume = Math.round(800 + Math.abs(Math.sin(index / 2)) * 2200);
    return {
      t: at.toISOString(),
      apuSol,
      volume,
    };
  });
};

export const formatRateLabel = (value: number): string =>
  value.toFixed(8).replace(/\.?0+$/, "");
