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

### Optional Variables

3. **`NEXT_PUBLIC_GA_ID`** - Google Analytics Measurement ID (optional, for analytics tracking)

Get your Google Analytics Measurement ID from [Google Analytics](https://analytics.google.com/):
1. Go to **Admin** → **Data Streams** → Select your stream
2. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Local Development

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
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

#### For Google Analytics (NEXT_PUBLIC_GA_ID)

**Local Development:**
- Add `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` to your `.env.local` file

**Cloudflare Deployment:**
- **Option 1: Cloudflare Dashboard** (Recommended)
  1. Go to **Workers & Pages** → Your Worker → **Settings** → **Variables and Secrets**
  2. Add `NEXT_PUBLIC_GA_ID` as an **Environment Variable** (not a secret, it's public)
  3. Set it for the **Production** environment

- **Option 2: Add to `wrangler.jsonc`**
  ```jsonc
  "vars": {
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY": "your_actual_site_key_here",
    "NEXT_PUBLIC_GA_ID": "G-XXXXXXXXXX"
  }
  ```
  - Note: The GA ID is public, so it's safe to commit to git

**Summary:**
- ✅ **Site Key in Dashboard**: Works if using Cloudflare Pages CI/CD (set as Build env var)
- ✅ **Site Key in `wrangler.jsonc`**: Works for local builds (safe to commit, it's public)
- ✅ **Site Key in `.env.local`**: Works for local builds (not committed to git)
- ✅ **Secret Key in Dashboard**: Works for runtime (set as a secret)
- ✅ **GA ID in Dashboard**: Works for runtime (set as environment variable)
- ✅ **GA ID in `wrangler.jsonc`**: Works for deployment (safe to commit, it's public)

## Deploying To Production

| Command                           | Action                                       |
| :-------------------------------- | :------------------------------------------- |
| `npm run build`                   | Build your production site                   |
| `npm run preview`                 | Preview your build locally, before deploying |
| `npm run build && npm run deploy` | Deploy your production site to Cloudflare    |
| `npm wrangler tail`               | View real-time logs for all Workers          |

## Adding a Custom Domain

To use your custom domain name with your Cloudflare Worker (e.g., for your WhatsApp launcher), you have two options:

### Method 1: Using Cloudflare Dashboard (Recommended)

**Prerequisites:** Your domain must be **active** on Cloudflare. A domain is "active" when it's added to Cloudflare AND using Cloudflare nameservers.

#### Step 1: Add and Activate Your Domain on Cloudflare

**If you see the error "Only domains active on your Cloudflare account can be added":**

1. **Add your domain to Cloudflare** (if not already added):
   - Go to the main [Cloudflare Dashboard](https://dash.cloudflare.com/) (the home page)
   - Click **Add a Site** button (or **Add Site** in the top navigation)
   - Enter your domain name (e.g., `yourdomain.com`)
   - Click **Add site**
   - Select a plan (Free plan works fine)
   - Click **Continue**

2. **Update your domain's nameservers** (This is required to make your domain "active"):
   - Cloudflare will show you two nameservers (e.g., `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
   - **Copy these nameservers**
   - Go to your domain registrar (where you bought the domain - e.g., GoDaddy, Namecheap, Google Domains, etc.)
   - Find the **DNS settings** or **Nameservers** section
   - Replace your current nameservers with the Cloudflare nameservers
   - Save the changes

3. **Wait for activation** (usually 5-30 minutes):
   - Return to Cloudflare Dashboard
   - You'll see your domain listed on the home page
   - The status will show as **Active** (with a green checkmark) once nameservers are updated
   - You can click **Check nameservers** to verify

**Important:** Your domain must show as **Active** (not "Pending" or "Inactive") before you can add it as a custom domain to your Worker.

**If your domain is already added but shows as inactive:**
- Check that you've updated the nameservers at your registrar
- Wait a few more minutes for DNS propagation
- Click **Check nameservers** in Cloudflare to verify

**Once your domain is Active, proceed to Step 2:**

#### Step 2: Configure the Custom Domain for Your Worker

**Before adding the custom domain, check for existing DNS records:**

1. **Check for existing DNS records** (to avoid conflicts):
   - Go to your domain in Cloudflare Dashboard
   - Click on **DNS** in the left sidebar
   - Look for any existing records for the domain/subdomain you want to use:
     - For root domain (`yourdomain.com`): Check for A, AAAA, or CNAME records with name `@` or `yourdomain.com`
     - For subdomain (`whatsapp.yourdomain.com`): Check for A, AAAA, or CNAME records with name `whatsapp`
   - **If you find conflicting records, delete them first** (see troubleshooting below)

2. **Configure the custom domain for your Worker**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** in the left sidebar
   - Click on your Worker name (e.g., `next-starter-template`)
   - Click on **Triggers** in the left sidebar (under your Worker)
   - Scroll down to the **Custom Domains** section
   - Click **Add Custom Domain** button
   - Enter your domain (e.g., `example.com` or `whatsapp.example.com`)
   - Click **Add Custom Domain**
   - Cloudflare will automatically create the necessary DNS records

3. **Wait for DNS propagation** (usually takes a few minutes):
   - The domain will be active once DNS records are verified
   - You can check the status in the **Triggers** → **Custom Domains** section
   - The status will show as "Active" when ready

### Method 2: Using Wrangler CLI

1. **Add the domain to your `wrangler.jsonc`**:
   ```jsonc
   {
     // ... existing configuration ...
     "routes": [
       {
         "pattern": "example.com/*",
         "custom_domain": true
       }
     ]
   }
   ```

   Or for a subdomain:
   ```jsonc
   {
     // ... existing configuration ...
     "routes": [
       {
         "pattern": "whatsapp.example.com/*",
         "custom_domain": true
       }
     ]
   }
   ```

2. **Deploy with the custom domain**:
   ```bash
   npm run deploy
   ```

3. **Verify DNS records**:
   - Go to your domain's DNS settings in Cloudflare Dashboard
   - Ensure the domain is proxied (orange cloud icon) if you want Cloudflare's protection
   - The DNS records should be automatically created, but you can verify them

### Important Notes

- **Domain must be "Active" on Cloudflare**: Your domain needs to be:
  1. Added to your Cloudflare account (listed on the dashboard)
  2. Using Cloudflare nameservers (updated at your registrar)
  3. Showing as **Active** (green checkmark) on the Cloudflare Dashboard home page

  If your domain shows as "Pending" or "Inactive", you cannot add it as a custom domain to your Worker. You must complete the nameserver update first.

- **Finding "Add a Site"**: If you don't see the "Add a Site" button, go to the Cloudflare Dashboard home page (click the Cloudflare logo or go to `dash.cloudflare.com`) to see all your sites and the "Add a Site" option.
- **Existing DNS records**: Before adding a custom domain, check your DNS settings. If there's already an A, AAAA, or CNAME record for the domain/subdomain you want to use, you'll get an error. Delete the conflicting record first, or use a different subdomain.
- **SSL/TLS**: Cloudflare automatically provides free SSL certificates for custom domains
- **Subdomains**: You can use subdomains (e.g., `whatsapp.yourdomain.com`) or the root domain (e.g., `yourdomain.com`). Using a subdomain is often easier if your root domain already has DNS records pointing elsewhere.
- **Multiple domains**: You can add multiple custom domains to the same Worker
- **Propagation time**: DNS changes can take a few minutes to propagate

### Troubleshooting

- **Error: "This domain is already in use. Please delete the corresponding record in DNS settings"**:
  - This means there's already a DNS record (A, AAAA, or CNAME) for the domain/subdomain you're trying to use
  - **Solution 1: Delete the conflicting DNS record** (recommended if you want to use this domain for your Worker):
    1. Go to your domain in Cloudflare Dashboard
    2. Click on **DNS** in the left sidebar
    3. Find the conflicting record:
       - For root domain: Look for records with name `@` or your domain name
       - For subdomain: Look for records with the subdomain name (e.g., `whatsapp`)
    4. Click the **Delete** button (trash icon) next to the conflicting record
    5. Confirm the deletion
    6. Try adding the custom domain again
  - **Solution 2: Use a different subdomain** (if you need to keep the existing record):
    - Instead of `yourdomain.com`, use `whatsapp.yourdomain.com` or `app.yourdomain.com`
    - Make sure the subdomain doesn't have existing DNS records
    - Add the subdomain as your custom domain instead

- **Error: "Only domains active on your Cloudflare account can be added"**:
  - This means your domain is not using Cloudflare nameservers
  - Go to Cloudflare Dashboard home page and check your domain's status
  - If it shows "Pending" or "Inactive", you need to update nameservers at your registrar
  - Follow **Step 1** above to properly activate your domain
  - Wait 5-30 minutes after updating nameservers for the domain to become active

- **Domain not working after adding?** Check that:
  - Your domain shows as **Active** (green checkmark) on Cloudflare Dashboard home page
  - DNS records are correctly configured (should be automatic)
  - SSL/TLS mode is set to "Full" or "Full (strict)" in Cloudflare Dashboard (SSL/TLS → Overview)
  - Wait a few minutes for DNS propagation (can take up to 24 hours, but usually much faster)

- **How to check if your domain is active**:
  - Go to Cloudflare Dashboard home page
  - Look for your domain in the list
  - It should show **Active** with a green checkmark
  - If it shows "Pending" or "Inactive", click on it and check the nameserver status

- **Check custom domain status**: Go to **Workers & Pages** → Your Worker → **Triggers** → **Custom Domains** to see the status of your custom domain

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
