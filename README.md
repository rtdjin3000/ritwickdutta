# Ritwick Dutta - personal AI portfolio

An original, articles-first personal website for **AI leadership and customer solution leadership**. Built with Astro and TypeScript, without a client framework, visitor tracking, external fonts, or a backend. Articles lead the homepage and are selected by default in the archive; original posts are supporting material.

## Run locally

Requires Node.js 22.12 or newer. PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm ci
npm run dev
```

Open the local URL printed by Astro. To validate and preview the production output:

```powershell
npm run check
npm test
npm run build
npm run verify:build
npm run preview
```

Alternatively, `npm run verify` performs the complete check/test/build/output-validation sequence. Output validation checks every internal route and fragment, metadata, structured data, sitemap, exact archive counts, and the PNG's real dimensions and signature.

The production output is `dist`. Development pages are marked `noindex`; production pages have public canonical URLs. The 404 page is always marked `noindex`.

## Content and privacy

- `src/data/portfolio.ts`: profile, verified career history, leadership themes, and six selected public projects.
- `src/data/articles.ts`: 21 published articles recovered from Ritwick's LinkedIn article archive, including source links and editorial summaries.
- `src/data/linkedin-posts.json`: 130 recovered original posts within the confirmed 2017+ window, containing only publication links and short excerpts.
- `src/data/writing.ts`: combined writing archive. All entries are rendered into HTML; search, format filters, and incremental display progressively enhance it.
- `src/assets/social-card.svg`: original artwork rasterized into a 1200 x 630 PNG for social previews.

The supplied resume PDF, phone number, financial figures, private repositories, confidential-marked material, LinkedIn drafts, and private analytics are **not published**. Customer deployments and financial impact are not invented. Project briefs distinguish workshops, demos, applications, and prototypes; the chart prototype's documented deployment limitation remains explicit.

LinkedIn likes, reposts, embedded posts by other people, and commentary on reshares must not be imported as original posts. The archive is a snapshot of what could be recovered, not a live sync or a guarantee that LinkedIn exposes all historical activity. Links open the original publications; full articles are not duplicated. Historical posts are labeled as archived, not current hiring announcements. Visible relative ages refer to the capture date rather than today's date. Contact information is omitted from post previews.

Posts are limited to 2017 onward. Because LinkedIn displays rounded relative ages rather than exact dates in this view, the importer uses a conservative earliest-year bound. For example, `8yr` at the October 2026 capture confirms 2017 or later; `9yr` could include 2016 and is omitted unless a future import supplies better date evidence. This avoids presenting an inferred date as an exact publication date. The 21 articles remain the primary collection.

The importer accepts an explicitly supplied, authorized browser export with this shape:

```json
{
  "cards": 100,
  "hasMore": false,
  "items": [
    {
      "author": "ritwickdutta",
      "original": true,
      "url": "https://www.linkedin.com/feed/update/urn:li:activity:1234567890123456789/",
      "text": "Original post text",
      "ageAtCapture": "1yr"
    }
  ]
}
```

The example identifier is illustrative, not a real publication. The importer also understands a browser-tool result file containing a `Result: {...}` line. It validates ownership markers and URL shapes, reports duplicates, fails on incomplete records, and writes only sanitized publication data:

```powershell
node --experimental-strip-types .\scripts\import-linkedin-posts.mjs 'C:\path\to\authorized-export.json'
npm run check
npm test
npm run build
```

Do not commit the raw browser export: it may contain unrelated authenticated page content or browser diagnostics. Update the verification date in the importer when making a new snapshot.

If a source export lacks some permalinks, a second argument may provide independently verified links as a JSON array of `{ "key": "...", "url": "https://www.linkedin.com/feed/update/urn:li:share:..." }`. Keys must refer to the same original posts in the source export. An included post with an unresolved link fails the import; there is no generic activity-page fallback.

## Launch at ritwickdutta.com with low ongoing costs

The site is live at **[https://ritwickdutta.com/](https://ritwickdutta.com/)**. The domain was registered at Spaceship on October 13, 2026, and the public source repository is [rtdjin3000/ritwickdutta](https://github.com/rtdjin3000/ritwickdutta).

GitHub Pages deployment succeeded. Domain ownership is verified, the Spaceship DNS records point to GitHub, and Enforce HTTPS is enabled. Public checks confirmed all eight indexable pages, the 151-entry writing archive, sitemap, robots.txt, and the real 1200 x 630 social preview. Both HTTP and `www` redirect to the canonical HTTPS apex domain; certificate validation was not bypassed.

For a standard, non-premium `.com`, these annual renewal quotes were checked on October 13, 2026. Prices are in USD, including the ICANN fee and excluding taxes:

| Registrar | Annual renewal | Pricing evidence |
| --- | ---: | --- |
| Spaceship | $10.18 shown for this domain | Confirmed in the user's Spaceship Domain Manager screenshot |
| Cloudflare Registrar | Approximately $10.46 | Current registrar comparison |
| Porkbun | $11.08 | Current registrar comparison |

**Chosen provider: Spaceship.** The domain manager shows auto-renew enabled, renewal at $10.18, and expiration on October 13, 2027. Future renewal prices and taxes can change. Cloudflare is a close alternative. Compare renewal prices rather than first-year promotions; these are not a guarantee of the cheapest price across every registrar.

Unlike `.ai`, `.com` can be registered for one year initially. Registration promotions may differ from the renewal price. Taxes, premium-name pricing, and future prices can differ. The purchased domain is `ritwickdutta.com`; the screenshot confirms the renewal price, not the initial registration charge.

Sources: [Spaceship's domain pricing](https://www.spaceship.com/domains/), [registrar comparison](https://porkbun.com/about/domain-cost-calculator/com), and [Cloudflare registration requirements](https://developers.cloudflare.com/registrar/get-started/register-domain/).

Hosting this static site on a public GitHub Pages repository is free. You do not need paid web hosting, WordPress, a database, or an SSL subscription. Domain email hosting is separate; the existing Gmail contact link works without it.

### GitHub Pages setup

1. Register the domain yourself, preferably for one year to start. This step is complete at Spaceship. Keep WHOIS privacy enabled and avoid optional paid hosting or SSL add-ons.
2. Use the public repository [rtdjin3000/ritwickdutta](https://github.com/rtdjin3000/ritwickdutta). Upload the source, including the lockfile and `.github/workflows/deploy.yml`, but not `node_modules`, `dist`, raw exports, or the private resume. A project repository can serve a custom apex domain; a repository named `rtdjin3000.github.io` is not required.
3. In the repository's **Settings > Pages**, select **GitHub Actions** as the publishing source.
4. Verify ownership of the domain in your GitHub account's Pages settings using the exact TXT record GitHub supplies.
5. Add `ritwickdutta.com` as the repository's custom domain **before** pointing DNS at GitHub. This helps prevent domain takeover.
6. At your DNS provider (for example, Spaceship DNS), add the following records. If using Cloudflare DNS, keep them **DNS-only** rather than proxied. Do not use wildcard records.

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `rtdjin3000.github.io` |

Optional IPv6 support: add the four apex AAAA records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`, keeping the A records too.

7. In **Actions**, run **Deploy portfolio to GitHub Pages**. This workflow is manual-only so uploading or editing code does not unexpectedly publish it.
8. After GitHub's DNS check and certificate issuance succeed, enable **Enforce HTTPS**.
9. Verify the apex domain, `www` redirect, project briefs, writing links, `/robots.txt`, `/sitemap.xml`, and social preview image.

A `CNAME` file is not needed for the included custom Actions deployment. GitHub's repository Pages setting controls the domain. See [GitHub's current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

If you want to preview on the free GitHub project URL before connecting the custom domain, set the repository Actions variable `SITE_URL` to `https://rtdjin3000.github.io/ritwickdutta/` and leave the custom-domain setting empty. To build for that alternate URL locally:

```powershell
$env:SITE_URL = 'https://rtdjin3000.github.io/ritwickdutta/'
npm run build
```

Root domains and GitHub project subpaths are supported. Canonical URLs, internal links, social image URLs, and sitemap URLs use the configured base. Return `SITE_URL` to `https://ritwickdutta.com/` before publishing at the chosen domain.

## Visibility: make the evidence travel

The website is a durable home for your work, not a promise of hiring interest or a substitute for distribution. A `.ai` domain does not automatically increase search rankings.

- Add the live site to LinkedIn **Featured**, your contact/website information, and the top of your About section.
- Use a consistent headline, for example: **Applied AI Architect at Microsoft | AI & Customer Solution Leadership | Enterprise GenAI, Agents & Responsible Adoption**.
- Feature a leadership-oriented article, the LLMOps workshop, and one practical safety or architecture demo. Link to a specific project brief when discussing that project.
- Publish useful, focused posts: one customer problem, one design decision, evidence of the trade-off, and one reusable artifact. Avoid generic AI commentary and unverified performance claims.
- Where sharing is permitted, add measured evaluation results, recorded walkthroughs, and reproducible instructions to the underlying repositories. Actual adoption, teaching, and collaboration evidence is stronger than a list of target employers.
- For US/global reach, use English, connect with relevant customer engineering and applied-AI leadership communities, and contribute to technical discussions with concrete artifacts. Do not imply US work authorization or relocation commitments unless accurate.
- Verify the domain in Google Search Console and submit the generated sitemap. Check indexing after launch. Use LinkedIn post analytics and Search Console to measure discovery; visitor tracking is not enabled by default.

Example launch post, **only once the site is live**:

> I've brought my applied AI work into one place: https://ritwickdutta.com/
>
> Articles are at the center: enterprise AI, agentic systems, responsible adoption, and the human side of leadership. Alongside the writing, I've shared practical AI workshops and architecture demos.
>
> My focus: connecting customer needs, technical decisions, and the teams that turn AI into useful capability.
>
> If you're working on AI adoption, customer solutions, or responsible agentic systems, I'd welcome a conversation.

## Implementation notes

The `unifont` override holds a compatible release for the available Node 22.18 environment; the newer transitive release requires Node 22.19 even though Astro's declared minimum is 22.12. No external fonts are used. SVG rasterization is enabled only to process the repository's own trusted social-card artwork; do not introduce untrusted SVG input.
