# Next.js Framework Starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/next-starter-template)

<!-- dash-content-start -->

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's deployed on Cloudflare Workers as a [static website](https://developers.cloudflare.com/workers/static-assets/).

This template uses [OpenNext](https://opennext.js.org/) via the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare), which works by taking the Next.js build output and transforming it, so that it can run in Cloudflare Workers.

<!-- dash-content-end -->

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/next-starter-template
```

A live public deployment of this template is available at [https://next-starter-template.templates.workers.dev](https://next-starter-template.templates.workers.dev)

## Getting Started

First, run:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server (using the package manager of your choice):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

### Required Variables

This project requires two reCAPTCHA environment variables:

1. **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`** - Public site key (client-side, safe to expose)
2. **`RECAPTCHA_SECRET_KEY`** - Secret key (server-side only, never expose)

Get both keys from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).

### Local Development

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

**Important:** `.env.local` is already in `.gitignore` and will **NOT** be pushed to git or the server. Never commit sensitive environment variables.

### Cloudflare Workers/Pages Deployment

**Important:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` must be available **during build time**, not just runtime.

#### If Using Cloudflare Pages (Automatic CI/CD Builds)

If your site builds automatically via Cloudflare Pages CI/CD:
1. Go to **Pages** → Your Project → **Settings** → **Environment Variables**
2. Add `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` as a **Build environment variable** (not just a Production variable)
3. Make sure it's set for the **Production** environment (or whichever environment you're deploying)

The build environment variables will be available during the build process, so this should work.

#### If Building Locally (Then Deploying)

If you run `npm run deploy` locally, Cloudflare Dashboard env vars **won't be available** during your local build. You need one of these options:

**Option 1: Use `.env.local` (Recommended)**
- Already set up for local development
- The variable will be available during `next build`

**Option 2: Add to `wrangler.jsonc`**
- Add a `vars` section to `wrangler.jsonc`:
  ```jsonc
  "vars": {
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY": "your_actual_site_key_here"
  }
  ```
- Note: The site key is public anyway, so it's safe to commit to git

**Option 3: Set Environment Variable Before Build**
```bash
# Windows (PowerShell)
$env:NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your_site_key_here"
npm run deploy

# Linux/Mac
export NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your_site_key_here"
npm run deploy
```

#### For Server-Side Secret (RECAPTCHA_SECRET_KEY)

Set the secret key as a **Wrangler secret** (encrypted and secure):

```bash
# Set the secret (you'll be prompted to enter the value)
wrangler secret put RECAPTCHA_SECRET_KEY
```

Or via the [Cloudflare Dashboard](https://dash.cloudflare.com/):
1. Go to **Workers & Pages** → Your Worker → **Settings** → **Variables and Secrets**
2. Add a new **secret** with the name `RECAPTCHA_SECRET_KEY`

**Summary:**
- ✅ **Site Key in Dashboard**: Works if using Cloudflare Pages CI/CD (set as Build env var)
- ✅ **Site Key in `wrangler.jsonc`**: Works for local builds (safe to commit, it's public)
- ✅ **Site Key in `.env.local`**: Works for local builds (not committed to git)
- ✅ **Secret Key in Dashboard**: Works for runtime (set as a secret)

## Deploying To Production

| Command                           | Action                                       |
| :-------------------------------- | :------------------------------------------- |
| `npm run build`                   | Build your production site                   |
| `npm run preview`                 | Preview your build locally, before deploying |
| `npm run build && npm run deploy` | Deploy your production site to Cloudflare    |
| `npm wrangler tail`               | View real-time logs for all Workers          |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
