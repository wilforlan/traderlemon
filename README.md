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
- World server (CLI / credentials `serverUrl`): `https://world1.v0peer.org`

## Routes

| Path | Purpose |
|------|---------|
| `/` | Second Economy landing — app screenshots, coming-soon download, continue on the web |
| `/second-economy` | Deep dive: APW$, neighborhoods, shared prosperity |
| `/app` | Marketing page for the v0peer iPhone and iPad app |
| `/support` | App Store support URL — contact and Origin help |
| `/privacy` | Privacy Policy — Viroke Technologies Inc. |
| `/terms` | Terms of Use — Delaware corporation |
| Earn (nav) | External → https://econext.llc |

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server on 3002 |
| `npm test` | Vitest |
| `npm run build` | Production build |
