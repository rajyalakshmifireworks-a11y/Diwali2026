# Rajyalakshmi Fireworks – Diwali Order Enquiry

React + Vite + TypeScript order enquiry page (Tailwind, shadcn/ui). Customers pick
products and send the order to WhatsApp. The page lives in `client/src/pages/Home.tsx`.

## Run locally

Requires Node 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open the address printed in the terminal (usually http://localhost:3000).

## Production build

```bash
pnpm exec vite build   # static site -> dist/public
```

## Deploy (Netlify or Vercel)

Import this repository on Netlify or Vercel. `netlify.toml` and `vercel.json` already
set the build command (`pnpm exec vite build`) and output folder (`dist/public`), so no
extra settings are needed. Every push to `main` then gets a fresh live preview link.
