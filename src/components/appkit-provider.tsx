"use client";

import { type ReactNode, useState } from "react";

import { initAppKit } from "@/lib/appkit";

type AppKitProviderProps = {
  children: ReactNode;
};

export const AppKitProvider = ({ children }: AppKitProviderProps) => {
  const [ready] = useState(() => initAppKit());

  if (!ready) {
    return children;
  }

  return children;
};
