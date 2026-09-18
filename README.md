# Kitty Kelly — client review website

Astro static site with a persistent accessible HTML audio player, lazy video playback and an ultramarine, paper and citron editorial design with reduced-motion-aware smooth scrolling. No WebGL or 3D dependencies remain.

## Development
Use Node 24 or a version supported by Astro 7. Run 
pm ci`, 
pm run dev`, 
pm run build`, and 
pm run check`. The output is `dist/`. Astro 7 may start its development server as a background process; 
px astro dev stop` stops it.

## Content and assets
- `src/data/site.ts`: profile, service copy, voice reels and metadata configuration.
- `src/data/portfolio.ts`: clients, books, agents, genres, accents and video titles.
- `research/portfolio-inventory.json` and `research/videos.json`: replaceable portfolio asset references.
- `research/asset-manifest.json`: original public URLs and prototype asset provenance.
- `src/components/`: shared audio, video, client, testimonial and recognition sections.
- `src/styles/global.css`: shared component layouts. `src/styles/edition.css`: current palette, art direction and responsive adaptations.

The existing site supplied all temporary photography, logos, book covers, demos and video references. No client credits or testimonials were invented. Testimonial excerpts are abbreviated; retain original-source references when approving final copy. Video uses Squarespace HLS and YouTube on demand, with visible source links. Production should replace original-site video dependencies with client-approved assets and supply transcripts/captions.

## Review and production configuration
Default output is deliberately 
oindex, nofollow`, with robots disallowing crawling and an empty sitemap. For the approved production launch, set `PUBLIC_INDEXABLE=true` and `PUBLIC_SITE_URL=https://www.kittykelly.co.uk`, then rebuild. Canonical, structured-data and sitemap URLs use that setting. Do not enable indexing on the review hostname.

The contact brief opens the visitor’s mail application. It does not post, store or claim to send messages. Direct email and both telephone numbers work independently. If a hosted contact form is wanted for production, connect an approved delivery service, implement spam protection and update the privacy copy before enabling it.

See `research/EDITION-02.md` for the latest colour research, page hierarchy and motion decisions.

## Review checklist
Confirm representation, portfolio permissions, up-to-date equipment, approved bios and new photography. Confirm client preferences for typography/palette. The Voice Arts recognition is a credited cast role in an award-winning production, not an individual narration award. One Voice is a nomination. Both link to official listings.

Preserved routes include all six original service/contact pages; the site adds a demo index and dedicated audioguide, character and narration pages. See `research/CONTENT-MAP.md` for the page-by-page inventory and `research/AUDIT-AND-DIRECTION.md` for the initial audit and revised direction.


## GitHub Pages deployment
The requested client preview is deployed through `.github/workflows/deploy.yml`. Pushes to the GitHub `main` branch install the locked dependencies, build, validate all local links and portfolio content, and deploy the static artifact to Pages.

The workflow supplies `PUBLIC_BASE_PATH=/kitty-kelly-preview` and `PUBLIC_SITE_URL=https://zouaker.github.io/kitty-kelly-preview`. Local development defaults to `/`. All internal links, public assets, responsive image candidates and audio URLs use the shared helper in `src/lib/urls.ts`; font files use stylesheet-relative URLs. This keeps the site portable between a GitHub project path and an eventual client domain.

The review remains noindex. Enabling production indexing and connecting the client domain are separate launch tasks. The original Sites hosting manifest records the earlier prototype only; GitHub Actions does not use it.
