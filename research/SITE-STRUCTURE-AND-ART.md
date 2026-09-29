# Site-wide structure and navigation revision

29 September 2026. Reviewed the supplied 18.4-second recording: it shows distinct page hero images, portfolio category navigation, and the same header changing from transparent to ivory. Page-specific images are useful context; retain a shared header and consistent page hierarchy.

## Navigation and hierarchy

Primary navigation: Home; About (/about); Voiceover (dropdown with /voiceover overview and all six category pages); Selected work (/work); Demos; Studio; Contact CTA. Mobile uses the same destinations. Homepage anchors remain secondary and are explicitly labelled On this page. Existing commercially important routes remain intact, including /otherdemos. About and Work no longer cause an unexpected jump back to Home.

Service pages share: image hero with direct demo access → on-page index → performance/usage detail and downloads → relevant films, books, credits or accents → other services → project enquiry. The Work page groups actual portfolio content into six categories. About gathers training, background, recognition, range, studio access and testimonials. Voiceover is a visual category directory. Demos prioritises listening; Studio retains all equipment, connections and original photographs; Contact retains direct email, phones, representation and the mailto brief builder.

## Preview cache consistency

GitHub Pages responses advertise a 600-second cache lifetime. Previously, entering via a versioned query and following a root-plus-hash link dropped that version, allowing an older cached HTML document to return. Every preview HTML navigation URL now carries the same build release ID, set from GitHub SHA. Assets retain their normal cacheable URLs, and production canonicals remain clean. Same-page section links remain hash-only. No service worker or cache deletion is required.

## Carousel behavior

Signed speed follows the last horizontal drag. On release, capped gesture velocity eases back to continuous drift in that direction, without the previous 1.2-second stop. Pointer hover accelerates in the retained direction. Offscreen/hidden-tab pause, explicit Pause, keyboard controls, reduced-motion preference and vertical touch scrolling remain supported. An explicit Pause remains respected after dragging.

## Illustration assets

Built-in image generation mode, three new illustrative category photographs. They do not imply a client credit, named documentary location or a photograph of Kitty's actual equipment. Original credited video stills, book covers, portrait and location photographs are retained separately. Existing studio concepts remain labelled as such.

Saved responsive WebP assets: public/media/editorial/books-{720,1440}.webp, script-{720,1440}.webp, narration-{720,1440}.webp. Page art mappings live in src/data/page-art.ts and can be replaced without changing layout.

## books prompt

Use case: photorealistic-natural. Asset type: website hero background for a British audiobook narrator, landscape 3:2. Premium editorial still-life photograph of an open unbranded clothbound book, lightly fanned cream pages and black studio headphones on a deep aubergine desk. Book occupies right two thirds, left side dark and calm for website text. Tactile paper, soft warm window light from upper right, gentle shadows, muted plum and warm ivory palette, shallow depth of field, beautifully restrained magazine photography. No people, no legible text, no brand marks, no logos, no invented book covers. This is illustrative category artwork, not a documentary photograph of a client's studio.

## script prompt

Use case: photorealistic-natural. Asset type: editorial hero image for corporate voiceover and eLearning, landscape 3:2. A beautifully composed close-up of a voice recording script with faint non-readable typesetting, a sharpened pencil resting across cream paper, and the blurred edge of black studio headphones on a walnut writing desk. Subject concentrated on the right, clear dark negative space at left for website heading. Sophisticated quiet warm directional light, plum shadows, parchment ivory, photographic grain and realistic paper texture, premium editorial photography. No readable words, no computer UI, no people, no logos. Illustrative art about preparing a narration, not a real named person's workstation.

## narration prompt

Use case: photorealistic-natural. Asset type: cinematic landscape hero for documentary narration website, landscape 3:2. Wide contemplative vista of layered coastal cliffs and calm sea at the last light of dusk, a meandering natural shoreline leading into distance on the right. Deep muted plum shadows, restrained copper sunlight on limestone, subtle dusty rose sky. Beautifully natural documentary still, believable geology, atmospheric depth, subtle film grain. Left third darker and simple for website text. No people, buildings, text, logos, equipment, fantasy objects or impossible structures. Evoke thoughtful storytelling and quiet listening, editorial illustrative landscape not a named documentary credit.

## Validation

Build and static checks pass for all 16 HTML pages and 12 MP3s. Added regression checks for shared primary destinations, missing preview versions, old dropdown markup, homepage anchors in the primary header and broken in-page indexes. Browser checks at 320px covered every primary interior page: no horizontal overflow or hero/demo overlap. Desktop checks verified Home to Work and About, audiobook playback directly from the hero, and service-specific contact preselection. Carousel measurements confirmed continued signed travel after right and left drags and a stable position after Pause. Physical touch-device and OS reduced-motion testing were not available; pointer/touch-action and reduced-motion behavior were reviewed in code.

