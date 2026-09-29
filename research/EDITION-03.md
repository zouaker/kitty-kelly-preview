# Edition 03 — A voice with character

Reference reviewed: https://www.erikkaj.com/ on 29 September 2026, including the rendered desktop homepage, demo placement, project selector, studio presentation, biography, testimonials and booking flow. This is structural inspiration, not a transfer of its copy, branding, awards or service promises.

## Decision record before implementation

1. Goal: let a producer hear Kitty immediately, assess relevant experience, then send a brief or discuss an audition. Preserve a publicly shareable GitHub Pages client proposal.
2. Visitors: agency creatives and producers; corporate/eLearning teams; audiobook publishers and authors; game, museum and documentary producers.
3. Existing issues: oversized slogan pushes demos down; repeated spacious sections slow evaluation; blue dominates personality; featured work has weak category navigation; studio photography lacks consistency; booking process is unclear.
4. Hierarchy: identity and three immediate reels; selected clients; full six-category listening collection; selectable real projects; personal background and recognition; studio; testimonials; three-step enquiry process; FAQ and contact.
5. Sitemap: retain Home, Commercials, Corporates, Audiobooks, Other demos, Audioguides, Characters, Narration, Demos, Studio, Contact and Privacy. Preserve all original categories, samples, client lists, accents, book covers, representation and video sources.
6. Visual direction: warm ivory #F7F3EC, aubergine #332633, apricot #F2B78F, muted plum #73586A. Restrained editorial serif headlines with compact sans-serif labels. Colour portrait, generous but disciplined spacing, fine rules and a recording motif. Reference's immediate personality and listening utility, with a distinct light-led identity.
7. Interaction: persistent real audio player, prominent initial reels, user-controlled project selector with accessible buttons, gentle content entrances, native mobile scrolling and Lenis for desktop wheel input. No autoplay, fake waveforms, 3D, scroll locking or continuous ornamental animation. Reduced-motion mode removes entrances and smoothing.
8. Technology: retain static Astro, existing hls.js and Lenis. No new runtime dependencies. Keep data and replaceable media separate from layout. Progressive enhancement keeps projects and text usable without JavaScript.
9. SEO: preserve meaningful category routes, original factual content, unique metadata, semantic headings and Person schema. Keep this temporary proposal noindex. Canonicals and base URLs remain GitHub Pages aware.
10. Performance: locally hosted fonts, responsive WebP portrait and generated studio variants, lazy-load lower images, load video only on request, use transforms/opacity for animation and clean up listeners across Astro navigation.

## Studio concepts

Two AI-enhanced visuals derive from the actual public studio photographs, generated with the built-in image generation tool. They are explicitly labelled as concepts; original photography remains on the studio page. Equipment facts remain sourced from Kitty's site, never inferred from generated imagery. Review likeness and equipment details with Kitty before using any generated visual as a production studio photograph. See STUDIO-IMAGE-PROMPTS.md for full prompts and provenance.
