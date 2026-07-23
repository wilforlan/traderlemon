export type PhantomPublicKey = {
  readonly toString: () => string;
};

export type PhantomProviderLike = {
  readonly publicKey?: PhantomPublicKey | null;
};

export const readPhantomAddress = (
  provider: PhantomProviderLike | null,
): string | null => {
  const publicKey = provider?.publicKey;
  if (publicKey === null || publicKey === undefined) {
    return null;
  }
  return publicKey.toString();
};
