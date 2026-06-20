# Website UI Kit — Consultoría

A luxury-editorial recreation of the Gumercindo Jiménez consulting site, rebuilt on the design system. This replaces the original dark/generic landing with the brand's deep-green + warm-earth + brass-gold direction.

## Files
- `index.html` — interactive homepage. The "Solicitar auditoría" buttons open a working lead-capture modal; the FAQ accordion expands.
- `sections.jsx` — all page sections, composed from the DS primitives (`window.GumercindoJimNezDesignSystem_5d8aa6`): `Nav`, `Hero`, `About`, `Services`, `Testimonials`, `FAQ`, `AuditBand`, `Footer`, `AuditModal`.

## Surfaces covered
Sticky nav · editorial hero with proof-stat overlay · dark "Sobre mí" band · 3-up services with gold-rule cards · social-proof testimonials on a green-tint band · FAQ accordion · deep-green audit CTA · footer.

## Notes
- Photography is shown with `PortraitPlaceholder` (deep-green duotone + GJ watermark). Drop in real warm, editorial portraits of Gumercindo to finish — the Instagram feed (nature, presence, the red-hat shots) is the reference mood.
- Copy is lifted/adapted from the real site and brief (voice: cercana, divertida, disruptiva, técnica).
- `BASE` in `sections.jsx` (`../..`) resolves assets back to the DS root; change it if you relocate the kit.
