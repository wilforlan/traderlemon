# v0peer

Next.js peer trading desk for Agent Play **APU**. Users connect any Solana wallet through **WalletConnect** (Reown AppKit) and authenticate by uploading their Agent Play World `credentials.json`. All banking and conversion APIs live in **Econext** — this app never talks to Redis or a database.

## Stack

- Next.js App Router
- Econext HTTP APIs (`/api/market/rates`, `/api/auth/connect`, …)
- Recharts desk analytics
- Light green + gold fintech theme

## SEO

Document titles, Open Graph / Twitter cards, icons, `robots.txt`, and `sitemap.xml` are driven by `src/lib/site-seo.ts`. Set `NEXT_PUBLIC_APP_URL` to the canonical production origin so share URLs and the sitemap resolve correctly. Assets live at `/v0peer-og.png` and `/v0peer-icon.png`.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Runs on [http://localhost:3002](http://localhost:3002) by default (script). Start Econext on port **3001** so market rates and auth proxy succeed.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server on 3002 |
| `npm test` | Vitest (conversion + credentials) |
| `npm run build` | Production build |

## WalletConnect

Solana wallets connect only through Reown AppKit / WalletConnect (no Phantom-injected provider).

1. Create a project at [dashboard.reown.com](https://dashboard.reown.com).
2. Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in `.env.local`.
3. Set `NEXT_PUBLIC_APP_URL` to the origin users will open (required for WalletConnect metadata).

## Auth

1. Create an Agent Play World account and save `credentials.json`.
2. On v0peer, open **Get started** or click **Create Agent Play World Account**.
3. Upload the file on the account panel — v0peer proxies to Econext `POST /api/auth/connect`.
