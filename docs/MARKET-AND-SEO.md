# Venus Journey: local-market review and SEO implementation

Research date: 19 September 2026. This is a focused competitor and offer review for the site rebuild, not a market-size study. No paid keyword-volume, conversion, revenue or ranking data was available. Competitor offers can change.

## Positioning decision

Lead with **family photography and films in Cantabria, Bilbao and Bizkaia**, with pregnancy and newborn sessions at home or outdoors. The photo + film combination is already part of the Venus Journey offer, so it is a credible selling point. It is not claimed to be unique in the market. Preserve the original purple logo and palette, but use more whitespace, readable text and photography with room to breathe.

## Evidence from comparable local businesses

| First-party source | Observed public positioning | Implication for Venus Journey |
| --- | --- | --- |
| [Gorka Zulueta, Bilbao](https://gorkazulueta.com/) | Dedicated pregnancy, newborn, infant and family categories; emotional storytelling; WhatsApp booking; public testimonials and printed products. | Clear session choices and direct enquiries are established expectations. Add only genuine customer reviews later; none were fabricated for this rebuild. |
| [ByMae: family photography in Bilbao](https://bymae.es/fotografia-familiar-bilbao/) | Dedicated family landing page, distinguishes studio and outdoor sessions, explicitly covers Bilbao and Bizkaia. | Explain where Venus Journey works and the at-home/outdoor experience on service pages. Avoid implying ownership of a studio. |
| [Susan and Bear: newborn in Santander](https://susanandbear.com/fotografia-recien-nacido-santander/) | Public packages shown as €280 for 1 hour/8 photos, €330 for a natural family session/2 hours/15 photos, and €370 for a posed family session/3 hours/15 photos, with different inclusions. | Venus Journey's published €239 newborn package with 50 edited photos and a short video is a substantial delivery commitment. Review editing time and travel costs before changing prices. These packages are not like-for-like. |
| [Nimuet: newborn-session information](https://nimuetfotografia.com/recien-nacido/informacion-sesiones-newborn-cantabria/) | Explains preparation and booking during pregnancy, with information about timing for its posed newborn work. | Practical pre-booking information helps families decide. The new site encourages early contact but does not copy another photographer's age limits or claim specialist newborn credentials. |
| [AMMA: family session in Urdaibai](https://www.amaiamaguregui.es/sesiones/reportaje-en-familia-en-urdaibai/) | Real family gallery tied to a named location. | Keep the existing real Venus Journey stories and their actual locations. Do not relabel Madrid or Weymouth sessions as local Cantabria work. |

## Original-site findings addressed

| Finding from the live source | Implemented improvement |
| --- | --- |
| Generic title “Fotografo Videografo Infantil Santander Bilbao”. | Distinct descriptive titles and meta descriptions by service and story. |
| A rotating fullscreen opening with lengthy text; key decisions further down the page. | Static original hero image, short headline, explicit location and service statement, visible route to sessions. |
| Four packages, but hierarchy and Spanish wording can be clearer. | Consistent package cards retaining published prices, durations, quantities, videos and prints. |
| Three stories with separate layouts and original media. | Three responsive galleries retaining the existing path names and original photos. Original YouTube film IDs retained where present. |
| Hero video and multiple Tilda resources. | Local responsive WebP photos, system fonts, simple React components and click-to-load YouTube. |
| Old canonical uses HTTP and Tilda host. | Canonical URLs generated from the actual new HTTPS `SITE_URL`. |
| Contact information appears as text and social links. | Clear WhatsApp enquiry links with package-specific drafts, `mailto:` and `tel:` links. |
| English link uses HTTP/www variant. | Working local `/en/` homepage and reciprocal language metadata. |

## Search intent and page mapping

These are relevance-based target phrases, **not measured keyword volumes**.

| Page | Intended search topic |
| --- | --- |
| `/` | fotógrafa familiar Cantabria; fotografía y vídeo familiar Bilbao |
| `/fotografia-familiar/` | sesión de fotos familiar Cantabria; fotografía infantil Bilbao |
| `/fotografia-embarazo/` | fotografía embarazo Cantabria; sesión embarazo Bilbao |
| `/fotografia-recien-nacido/` | fotografía recién nacido a domicilio Cantabria; newborn Bilbao |
| `/video-familiar-bautizo/` | vídeo familiar Cantabria; fotografía bautizo Bilbao |
| Original three story routes | Family names and actual location-specific portfolio evidence |
| `/en/` | family photographer Cantabria; family photography Bilbao |

No near-duplicate city landing pages were created. Add town-specific case studies only when genuine work, useful local information and image permission are available.

## Technical SEO included

- Build-time HTML pre-rendering for ten pages, including the 404. Meaningful text and links exist before JavaScript runs. [Google explicitly recommends considering pre-rendering for users and crawlers](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- One H1 per page; semantic navigation and real links; unique titles and descriptions.
- Canonicals, Open Graph and sitemap URLs derived from the production origin, without guessing a new domain.
- `hreflang` between the actual Spanish and English homepages. Spanish service/story pages are not falsely marked as translated.
- ProfessionalService schema with verified contact information and service area. Individual service offers match the visible prices. No invented reviews, address, opening hours or certifications.
- An optimized local logo and 38 original photos; responsive image widths, intrinsic dimensions, lazy loading below the fold and priority loading for the primary image.
- Functional 404 page with noindex; hosting rules supplied to preserve the actual HTTP error status.
- Native disclosure FAQs, accessible focus indicators, descriptive image text, keyboard-operable native gallery dialogs and reduced-motion styling.
- No automatic third-party video player request until visitors choose to watch.

The release includes a noindex preview build because the production origin is unknown. Setting `SITE_URL` and rebuilding enables indexing and fills the canonical/sitemap metadata. No ranking, rich-result or Core Web Vitals score is guaranteed; validate the deployed site under real hosting and mobile network conditions.

## Commercial priorities after launch

1. **Make enquiries measurable.** For each enquiry, record the session type, town, source, quotation and booking outcome. Start with a simple sheet; no analytics software is needed to track these manually.
2. **Review package economics.** Calculate hours for enquiry handling, preparation, travel, shooting, image selection, editing, video, delivery and prints. Net revenue after actual taxes and direct costs divided by total labour hours is a useful internal check. The package with the most photographs is not automatically the most profitable.
3. **Use real trust signals.** Ask actual customers for reviews and permission to publish them. Keep names, permissions and source links. Add real testimonials when available.
4. **Prioritize local discovery.** Maintain accurate Google Business Profile information and link to the new canonical website. Use the true service area and consistent telephone/business name. Do not invent a storefront address.
5. **Publish useful proof.** Add occasional real family case studies, practical clothing/preparation advice and genuinely useful location guidance. Avoid mass-generated city pages and unsupported claims.
6. **Revisit prices using your costs.** Competitor prices provide context, not an instruction to undercut. The current prices were preserved because they are publicly offered on your site; verify they remain commercially viable.

## Migration and outstanding owner details

Choose the new canonical domain, confirm current package conditions, review the old Tilda demonstration-only image footer, and provide the actual business operator's legal/privacy details. Configure old-host redirects if Tilda permits them. These are launch inputs, not hidden dependencies for running the React project.

See `AMPLIFY.md` for deployment, indexing and migration steps. No site has been deployed to your AWS account as part of this download delivery.
