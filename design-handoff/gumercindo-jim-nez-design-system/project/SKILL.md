---
name: gumercindo-jimenez-design
description: Use this skill to generate well-branded interfaces and assets for Gumercindo Jiménez (luxury-editorial marketing/sales/business consultancy — deep green, warm earth, brass gold, serif-forward), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, logo assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Fast orientation
- **Vibe:** sobriety with authority — Forbes/Vogue/Harvard meets nature. *"Alivio con autoridad."* Nothing loud.
- **Color:** deep green `#11503D` (+ near-black green for dark bands), brass gold `#B89455` (hairlines/rules/seals), clay `#BE5A53` (single warm pop, sparingly), warm-earth neutrals (ivory `#F8F5EE` → ink `#15130D`). Never cold grey, never light/mint green, never bluish-purple gradients.
- **Type:** Cormorant Garamond (display), Spectral (body), Hanken Grotesk (tracked-caps labels). Headlines sentence-case; emphasis via italics + color.
- **Voice:** Argentine voseo, cercana/divertida/disruptiva/técnica. Name the chaos, then the method. Value before price. **No emoji.**
- **Shape:** restrained radii (cards 8px, controls 4px), hairline borders, soft warm low shadows, a 2px gold rule as the signature accent, generous whitespace.

## Files
- `styles.css` → links all tokens. `tokens/` has colors, typography, spacing/radii/shadows, fonts, base.
- `assets/logo/` → GJ symbol, badge/favicon, and full lockups (light + dark).
- `components/` → React primitives: Button, Card, Eyebrow, Tag, Logo, Input, Accordion, Testimonial, Stat. Each has a `.prompt.md` with usage.
- `ui_kits/website/` and `ui_kits/book/` → full-screen brand-applied references (consulting homepage; book sales landing).
- `guidelines/*.card.html` → foundation specimens.

When building HTML artifacts, link `styles.css`, load `_ds_bundle.js`, and read components via `window.GumercindoJimNezDesignSystem_5d8aa6`. Copy logo assets you reference into your output folder.
