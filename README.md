# Venus Journey — React + AWS Amplify

A complete responsive rebuild of https://fotovenusjourney.tilda.ws/, prepared 19 September 2026.

## What is included

- React 19 + Vite, with HTML pre-rendered at build time for fast first render and crawlable content.
- Spanish homepage, English homepage, four Spanish service pages, the three original family stories and a real 404 page.
- Original Venus Journey logo and colour family, Victoria's portrait, all main-site photography and the three story galleries, downloaded and optimized as responsive WebP files. No Tilda asset dependency at runtime.
- Published prices and contact destinations preserved.
- Direct WhatsApp, email and telephone links. These open the relevant service; there is no pretend form submission or booking confirmation.
- Mobile navigation, native accessible photo dialogs, keyboard focus styles, reduced-motion support and optional click-to-load original YouTube videos.
- Per-page titles, descriptions, canonical URLs, social metadata, Spanish/English homepage hreflang, ProfessionalService/Service structured data, sitemap and robots.txt.
- AWS build specification, headers, redirect configuration and deployment instructions.

## Run locally

Install Node.js 22 LTS (or newer supported version), then:

```bash
npm ci
npm run dev
```

Build a preview:

```bash
npm run build
npm run check
npm run preview
```

The default build intentionally uses `noindex` because your new production domain has not been supplied. Everything is visible and functional; it becomes indexable after setting the correct `SITE_URL` and rebuilding. The old `tilda.ws` address is owned by Tilda and cannot be assigned to an Amplify app.

Production build on macOS/Linux:

```bash
SITE_URL=https://YOUR-REAL-DOMAIN.com npm run build
npm run check
```

PowerShell:

```powershell
$env:SITE_URL="https://YOUR-REAL-DOMAIN.com"
npm run build
npm run check
```

Use your actual HTTPS Amplify branch URL if you are launching before purchasing a domain. Do not use the example value above. The `.env.example` file is documentation; the pre-render script reads the shell environment or Amplify build environment variables.

## Deploy

Read [docs/AMPLIFY.md](docs/AMPLIFY.md). Upload the contents of this project to a GitHub repository and connect it to AWS Amplify Hosting. Build output is `dist`. No backend, database, API key or paid form provider is required.

## Edit

- `src/data.js`: contact details, prices, packages, service descriptions, FAQs and video/story references.
- `src/App.jsx`: components, Spanish/English homepage copy and route metadata.
- `src/styles.css`: design tokens and responsive layout.
- `public/images`: all original-source, web-optimized photographs and the original logo.
- `src/images.json`: image dimensions and available responsive widths.
- `src/story-images.json`: story gallery photo order.
- `scripts/prerender.mjs`: pre-rendered pages and SEO metadata.

Whenever content or prices change, rebuild and redeploy. The website does not query Tilda or update automatically from it. Node modules are excluded; `npm ci` installs the exact versions in `package-lock.json`.

## Business review before launch

The four packages reproduce your existing published offer: €179 family, €215 pregnancy, €239 newborn, €299 photo + family/christening film. No new discounts, guarantees, delivery deadlines, reviews or credentials were invented. Confirm current pricing, tax presentation, travel arrangements and booking conditions. A focused local-market review and next marketing actions are in [docs/MARKET-AND-SEO.md](docs/MARKET-AND-SEO.md).

Your existing Tilda footer contains a demonstration-only/third-party-ownership image statement that conflicts with presenting the site as your commercial portfolio. The supplied photos are preserved because you requested your own site migration. Confirm the relevant rights/permissions before public launch and add the appropriate business legal/privacy details for the actual operator. No fictional operator address or tax ID has been added. The site does not set its own analytics cookies or collect form submissions; YouTube only loads after a click. Third-party services and hosting can process visitor data under their own policies.

## Included build

`dist/` is included for convenience as a **noindex preview build**. Rebuild with the production `SITE_URL` before your public launch. All source files are provided; you are not restricted to the prebuilt output.
