# Kitty Kelly — client review website

Static Astro website with an ivory, aubergine and apricot editorial identity, immediate voice demos, an accessible persistent audio player, selectable featured projects and reduced-motion-aware smooth scrolling.

## Development

Use Node 24. Run `npm ci`, `npm run dev`, `npm run build` and `npm run check`. The output is `dist/`. Astro 7 starts background servers; use `npx astro dev stop` or `npx astro preview stop` when finished. The locked dependencies were generated with npm 11.19.0.

## Content and assets

- `src/data/site.ts`: profile, service copy, voice reels and metadata.
- `src/data/portfolio.ts`: clients, books, agents, genres, accents and video titles.
- `research/portfolio-inventory.json`, `research/videos.json` and `research/asset-manifest.json`: original asset references and provenance.
- `src/components/`: shared audio, video, clients, testimonials and recognition.
- `src/styles/global.css`: shared component layouts; `src/styles/edition.css`: current visual identity and responsive adaptations.
- `public/media/concepts/`: two generated studio concepts in responsive WebP sizes. Replace these files and update captions/alt text when approved client photography is supplied. Original studio photos remain available.
- `research/STUDIO-IMAGE-PROMPTS.md`: full generation prompts, references and output paths.

Existing public photography, logos, covers, audio and video remain temporary prototype material. No clients, credits, testimonials or awards were invented. Studio concept images are visibly labelled as AI-enhanced; their equipment likeness needs client approval. Factual equipment specifications remain based on Kitty's original site. Video loads from Squarespace HLS or YouTube on request, with source links. Final production assets should have approved transcripts/captions.

## Design record

See `research/EDITION-03.md` for the reference audit and current direction. Earlier research remains in `research/EDITION-02.md` and `research/AUDIT-AND-DIRECTION.md`. `research/CONTENT-MAP.md` documents preserved content. All service categories and 12 audio samples remain available.

## Preview and production

The client preview deliberately uses `noindex, nofollow`, disallowed crawling and an empty sitemap. For an approved production launch set `PUBLIC_INDEXABLE=true`, `PUBLIC_SITE_URL=https://www.kittykelly.co.uk` and `PUBLIC_BASE_PATH=/`, then rebuild. Review representation, factual claims, studio imagery, asset permissions and client-approved copy before that launch.

The contact brief opens the visitor's email application. It does not post or store messages. Visitors review and send the email themselves; direct email and telephone links remain available.

## GitHub Pages

Pushes to the GitHub `main` branch run `.github/workflows/deploy.yml`: install locked dependencies, build, validate local links and preserved content, deploy `dist` to Pages.

The workflow sets `PUBLIC_BASE_PATH=/kitty-kelly-preview`, `PUBLIC_SITE_URL=https://zouaker.github.io/kitty-kelly-preview` and `PUBLIC_INDEXABLE=false`. All local navigation/media URLs must use `src/lib/urls.ts`; fonts are stylesheet-relative. To test the GitHub path locally, build with those variables and run `npm run preview -- --port 4321`.

The original `.openai/hosting.json` records historical hosting only. GitHub Actions does not use it. The repository is public temporarily for this project as requested.
