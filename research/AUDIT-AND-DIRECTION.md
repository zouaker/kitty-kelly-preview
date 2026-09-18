# Kitty Kelly — redesign audit and direction

Prepared 18 September 2026, before implementation. Source: https://www.kittykelly.co.uk/ and its /commercials, /corporates, /audiobooks, /otherdemos, /studio and /contact pages. Observations come from live-page reading, homepage visual inspection and public media/source inventory; this is not an analytics or search-ranking audit.

## 1. Goals
Get the right reel playing quickly; help a producer assess range and recording logistics; convert qualified interest into a script/audition enquiry. Secondary goals: preserve search relevance, demonstrate credible work and make future asset changes straightforward. Suggested future measurement: reel starts/completions, downloads, service-to-contact clicks and qualified enquiries. No invented conversion baseline.

## 2. Visitors
Advertising creatives and producers need a commercial sound and usage discussion. Corporate, eLearning and ELT teams need clarity and reliable remote recording. Publishers and audiobook producers need sustained narration, character range and samples. Games/casting teams need character and accent ability. Cultural institutions and documentary producers need credible, intelligible storytelling. All should reach an appropriate sample before lengthy biography.

## 3. Existing strengths and problems
Strengths: a specific London-Estuary positioning, Drama Studio London training, real credits and testimonials, downloadable MP3s, substantial audiobook experience, direct contact details and specific studio equipment. Existing content spans the buying intents well.

Problems observed: oversized introductory copy with a weak CTA hierarchy; generic paragraph links take the place of a structured service directory; the main reel collection is below extensive news; “Other demos” obscures audioguides, character work and documentaries; navigation wraps on the inspected desktop width; repeated oversized headings and keyword-stuffed image descriptions dilute hierarchy and accessibility. SoundCloud and several video embeds introduce third-party dependencies; video players showed unavailable media in this inspection environment (not proof of failure for every visitor). Mixed news and service content makes the page harder to scan. Quantitative Core Web Vitals and ranking claims require separate measurement.

## 4. Content hierarchy
Identity + vocal character + immediate commercial play control → dedicated reel selector → selected credited work → all service categories → short personal introduction/studio confidence → clear contact. Service pages lead with category-specific copy and audio, then relevant detail and contact. Audio downloads remain real MP3 files.

## 5. Sitemap and migration
- / — listening-first overview
- /demos — commercial, corporate, audiobook, audioguide, character and documentary reels
- /commercials — preserve existing route
- /corporates — retain route; label “Corporate & eLearning”; include explainers, training and ELT
- /audiobooks — preserve route and all seven existing downloadable samples
- /audioguides — promote a hidden commercial category
- /characters — characters, games and dubbing
- /narration — documentary narration and meditations
- /otherdemos — retain as a useful browse hub for the three former categories, rather than discard indexed content
- /studio — preserve route, equipment and remote/in-person options
- /contact — direct email, UK/Spain phone and audition/project brief
- /privacy — accurate description of prototype behaviour

No service category is dropped. No thin standalone ELT or meditation page is created without more original client content. Legacy routes remain addressable, so an immediate redirect is unnecessary. A production migration should also inventory any undiscovered legacy URLs and implement 301s where required.

## 6. Visual direction
“Character, before everything.” Editorial typography with a high-contrast serif, a crisp sans serif, large confident portrait, pale mint, clean white and turquoise, with dark green text. The voice artist feels like a distinctive person, rather than a stock recording-studio brand. Fine rules, track numbers and purposeful play controls supply a recording/session vocabulary. Avoid stock microphone hero images, floating glass cards, gradients and generic feature grids.

## 7. Interaction and motion
An accessible HTML audio element powers a single shared player: one track at a time, play/pause, seek, duration, next/previous and downloads. The persistent player appears only after a deliberate play action. Track controls reflect real playback state; no autoplay. Subtle section entrances and small hover movement; no scroll hijacking, parallax, custom cursor or decorative WebGL. Reduced-motion disables nonessential transitions. Native audio and download links remain a no-JavaScript fallback. Third-party videos load only when requested.

## 8. Technology
Astro with statically generated HTML, TypeScript and focused browser JavaScript. Reusable layout/components, one structured content module, local media and an asset provenance manifest. No CMS, database, authentication or form backend needed for this review proposal. Direct email links and a clearly labelled email-brief composer avoid a false “message sent” interaction. Static hosting is fast, cheap to maintain and portable. Framework lockfile is committed.

## 9. SEO
Keep established service paths. Add descriptive titles, descriptions, one H1 per page, semantic landmarks, internal links and succinct image alternatives. Structured Person/Service/Breadcrumb data uses sourced facts only. This client-review deployment intentionally has noindex/nofollow and a robots exclusion so it does not compete with the client domain. A production environment flag enables indexability, canonical URLs and sitemap using the approved domain. Search-launch checklist: confirm all claims, permissions, domain, redirect inventory, Search Console and analytics consent requirements.

## 10. Performance
Static HTML, no application framework hydration, small client script, local fonts, optimized responsive WebP photography with dimensions, lazy below-fold images, prioritize the hero image. Audio uses preload=none until visitor intent, video embeds are click-to-load, no autoplay or heavy WebGL. Avoid third-party trackers. Validate generated routes/assets, build, functional playback and responsive layouts. Field Web Vitals cannot be claimed from this first prototype.

## Content and asset safeguards
All media are temporary material from the existing public site; research/asset-manifest.json records provenance. Replace files or central media references without redesigning components. Factual wording is condensed, not embellished. Named examples: Clairol, Mango, The National Gallery, The Friendship Fling and The Perfect Stranger. The homepage's Clockwork Revolution news is time-sensitive: phrase as a listed project, not an invented release/performance claim. Award recognition has been verified against the official One Voice and SOVAS listings, with individual nomination and credited cast participation clearly distinguished. Keep full Spotlight and Audible references available. Before replacing the production site, confirm representation, project permissions, current studio details and approved original assets with Kitty.

## Approved direction changes during review
The user requested removal of the 3D experiment and a lighter palette closer to the existing website. All Three.js, WebGL and analyser code has been removed. The final direction uses pale mint, white and turquoise with dark green text. It expands the initial scope into complete content-rich versions of every original page, including source client lists, films, books, testimonials, accents, agents and the now-verified awards. The detailed preservation matrix is in CONTENT-MAP.md. Default browser navigation remains progressively enhanced; audio persists across Astro page transitions. External video code is loaded only on a deliberate play action.

