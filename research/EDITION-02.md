# Edition 02 — colour, structure and motion research

The second review requested a more distinctive identity, independent of the original palette, with smoother scrolling and a stronger page sequence.

## Research and judgment
Pentagram's Luminato performance-festival identity uses an expressive Yves Klein Blue; its Berkeley Rep identity shows how a signature blue and adaptable typography can make a performing-arts brand recognisable. These are references for hierarchy and confidence, not templates to copy. There is no evidence that a universal best colour exists for a voiceover portfolio, nor are any conversion gains claimed.

Chosen palette: ultramarine #243BC8, paper #F8F7F3, ink #20212B and citron #EFF39A. The blue provides an identifiable performance-oriented signature; monochrome portrait photography lets the colour and typography lead. Citron is reserved for listening controls, a personal greeting and the biography chapter. Reading-heavy areas remain neutral. Colour-pair contrast was checked numerically for normal text.

Sources:
- https://www.pentagram.com/work/luminato-festival-1
- https://www.pentagram.com/work/berkeley-rep
- https://github.com/darkroomengineering/lenis
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

## Revised hierarchy
Introduction and immediate playback → recognisable clients → six listening choices with direct category links → selected work at varied scales → biography → verified recognition and testimonials → recording setup → practical FAQs → contact. The repeated standalone service directory is consolidated into the listening choices, while the original routes, all service categories and their full pages are preserved. A desktop chapter navigator gives a useful route through the longer homepage.

## Motion contract
Lenis eases desktop wheel scrolling over 0.9 seconds. Touch scrolling stays native. Keyboard, anchors, media controls and form fields remain available. The smooth-scroll instance is destroyed before route swaps and reconstructed on the next page. Below-fold elements enter once, with a short 30px movement and small stagger. Focus makes an unrevealed target visible. There is no scroll locking, pinned cinematic sequence, autoplay or 3D. Reduced-motion preference disables smoothing and reveal transitions, including changes made while the page is open. Content renders visibly without JavaScript.

## Implementation
`src/styles/edition.css` holds the new art direction and responsive adaptations. `src/scripts/motion.ts` owns scrolling, chapter state, reveal lifecycle and reading progress. Portfolio assets and facts remain in the established central data files. Review indexing and audience settings are unchanged.
