# Workbook & Diario UI Kit — Línea editorial

Recreates two real interior pages of Gumercindo's personal-growth products, rebuilt on the design system:
- **Hay que salir del bar** (WorkBook de Transformación Personal) — green line.
- **Mata al quejica que llevas dentro** (diario de introspección) — violet line.

## Files
- `index.html` — both pages side by side.
- `sections.jsx` — `WorkbookPage`, `DiarioPage`, plus local `ChapterHeader` + `Sheet` shell. Composes the editorial primitives (`BlockLabel`, `WorksheetPrompt`, `WritingLines`, `QuoteBlock`, `RatingScale`).

## The key idea
Both pages share one structure — serif headlines, gold keyword, block markers, ruled prompts. The only thing that changes between titles is the **accent**, driven entirely by tokens: wrap a page in `data-line="quejica"` and `--editorial-band` / `--sheet-line` / `--sheet-tint` flip from green to violet. No structural duplication.

## Sources
Extracted from the user's `WorkBook-HayQueSalirDelBar-FINAL.pdf` and `MATA_preview.html`. The workbook is fully on the green/gold brand; the MATA diario carries the violet accent. Cover-art and the satisfaction-wheel illustration are simplified; swap in finals when available.
