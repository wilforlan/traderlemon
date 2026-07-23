# v0peer

Public site for the **Agent Play Second Economy** — vision, APW$, and community. The primary call to action is joining the Slack community; **Earn** links to [Econext](https://econext.llc).

## Stack

- Next.js App Router
- Calm banking-style marketing UI
- SEO via `src/lib/site-seo.ts`

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set:

- `NEXT_PUBLIC_APP_URL` — canonical site origin
- `NEXT_PUBLIC_SLACK_COMMUNITY_URL` — Slack invite link (enables Join Slack)
- `NEXT_PUBLIC_AGENT_PLAY_URL` — Agent Play World entry URL

## Routes

| Path | Purpose |
|------|---------|
| `/` | Second Economy landing / belief page |
| `/second-economy` | Deep dive: APW$, city-builder analogy |
| Earn (nav) | External → https://econext.llc |

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server on 3002 |
| `npm test` | Vitest |
| `npm run build` | Production build |
