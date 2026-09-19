# Deploying Venus Journey to AWS Amplify

## Recommended: GitHub continuous deployment

1. Create a GitHub repository. Upload all project files at the repository root, including `package.json`, `package-lock.json`, `amplify.yml`, `customHttp.yml`, `src/`, `scripts/` and `public/`. Do not upload `node_modules` or `.build`. The supplied `dist` is optional and ignored by git.
2. In AWS Amplify Hosting, create an app and connect that repository and branch.
3. Keep the supplied `amplify.yml`: Node 22, `npm ci`, `npm run build`, `npm run check`; output directory `dist`.
4. Add an environment variable `SITE_URL` with the complete HTTPS production origin, without a path. If you do not know the Amplify branch URL yet, make the first deployment in preview mode, copy the assigned URL, add it as `SITE_URL`, then rebuild/redeploy.
5. Deploy, and confirm the build succeeds.
6. In **Hosting → Rewrites and redirects**, remove any generic 200 SPA rewrite to `/index.html`. This app has real pre-rendered HTML files for each route. Paste the rules from `amplify-redirects.json` in their supplied order. These preserve extensionless legacy paths, normalize trailing slashes, and return an actual 404 for missing pages. This JSON is an import aid; Amplify does not automatically load it merely because it exists in the repository.
7. Ensure `customHttp.yml` is detected for response headers.
8. Check `/`, `/en/`, all four service routes and the three family galleries by opening each directly and refreshing. Check `/not-a-real-page` returns HTTP 404. Check image loads and mobile menu.
9. Test contact links on your phone. WhatsApp opens a prewritten draft addressed to +34 644 656 260; the visitor chooses whether to send. Email opens their email client. There is no server-side email delivery to configure.

## Domains and indexing

- You cannot move `fotovenusjourney.tilda.ws` to Amplify: `tilda.ws` belongs to the old provider. Choose your own domain or use the Amplify branch URL.
- Add an owned domain using Amplify's domain management workflow and the DNS records AWS supplies. Choose one canonical HTTPS origin.
- Set `SITE_URL` to that origin and redeploy. The build generates absolute canonical links, sitemap entries and social image URLs. Production pages change from `noindex` to `index`.
- If a preview branch should stay out of search, leave `SITE_URL` unset for that branch.
- Do not use the old Tilda URL as `SITE_URL` for the new hosting deployment.
- The English homepage has its own `/en/` route. Service and story pages are Spanish; no English service-page alternate URLs are claimed.

## Tilda migration

The story paths `/olgayadelina/`, `/javieraysergio/` and `/garaziaitoramets/` are preserved on the new domain. Configure old-to-new 301 redirects in Tilda where your plan permits it. A redirect on the new site cannot redirect a request that reaches Tilda. If provider-level redirection is unavailable, add a prominent link on Tilda and investigate available canonical/noindex settings to reduce duplicate content.

Original in-page links `#about`, `#stories` and `#services` are mapped in the new client for incoming bookmarks. New section names are `#victoria`, `#historias`, `#precios`, `#sesiones` and `#contacto`.

## Search launch

Verify the production domain in Google Search Console, submit `/sitemap.xml`, and inspect representative page URLs. Check the live HTML contains the correct canonical and `index,follow`. Test structured data, but do not expect guaranteed rich results or rankings. Configure/maintain the business's real Google Business Profile as a service-area business using accurate details; do not publish a home address merely for SEO.

## Optional direct upload

For a manual Amplify deployment, rebuild with `SITE_URL` and upload a ZIP containing the **contents** of `dist` (index.html at ZIP root). Use the same redirect and header settings in the console. A source-code ZIP is for development/GitHub, not direct static deployment.

## Official references

- [Amplify redirects and rewrites](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html)
- [Amplify custom headers](https://docs.aws.amazon.com/amplify/latest/userguide/custom-headers.html)
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
