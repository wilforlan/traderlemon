import { z } from "zod";

const WalletConnectMetadataSchema = z.object({
  name: z.literal("v0peer"),
  description: z.string().min(1),
  url: z.string().url(),
  icons: z.array(z.string().url()).min(1),
});

export type WalletConnectMetadata = z.infer<typeof WalletConnectMetadataSchema>;

export const hasWalletConnectProjectId = (
  projectId: string | undefined,
): boolean => {
  return resolveWalletConnectProjectId(projectId) !== null;
};

export const resolveWalletConnectProjectId = (
  projectId: string | undefined,
): string | null => {
  const trimmed = projectId?.trim();
  if (trimmed === undefined || trimmed.length === 0) {
    return null;
  }
  return trimmed;
};

export const shortenWalletAddress = (address: string): string => {
  if (address.length <= 8) {
    return address;
  }
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
};

type BuildWalletConnectMetadataOptions = {
  appUrl: string;
};

export const buildWalletConnectMetadata = (
  options: BuildWalletConnectMetadataOptions,
): WalletConnectMetadata => {
  const url = options.appUrl.replace(/\/$/, "");

  return WalletConnectMetadataSchema.parse({
    name: "v0peer",
    description: "Convert SOL to APU on v0peer, the Agent Play peer trading desk.",
    url,
    icons: [`${url}/v0peer-icon.png`],
  });
};
