# Validation — 19 September 2026

## Passed

- Dependency installation and production Vite build.
- Build-time pre-render of ten HTML pages (nine public pages plus 404).
- One H1 per page, unique page titles, populated content and parseable JSON-LD.
- Local internal link and asset existence checks, including 105 image references.
- Expected telephone, email and WhatsApp destinations in the generated pages.
- Production build using a temporary test origin: canonical links and correct robots directives on all pages; nine sitemap entries.
- Responsive image candidates referenced in the built HTML exist locally.
- Rebuilt final preview output with no production origin so the temporary test origin is not shipped.

## Limitations and launch checks

The original live site was visually inspected in the browser. The browser environment could not connect to the local rebuilt preview, so desktop/mobile visual inspection and interactive browser tests of this rebuild could not be completed here. Responsive layouts are implemented with explicit desktop, tablet and phone breakpoints, but check on a real phone before launch.

No deployment to the user's AWS account was performed. Confirm Amplify redirects, response codes, headers, mobile navigation, photo-dialog controls, YouTube playback and contact handoffs after deployment. No email or WhatsApp message was sent during testing. No Lighthouse or field Core Web Vitals score is claimed.

Run `npm run check` after each production build. This checks page output and local references; it does not replace browser testing.
