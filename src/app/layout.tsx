import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { buildRootMetadata, resolveAppUrl } from "@/lib/site-seo";

import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = buildRootMetadata({
  appUrl: resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
