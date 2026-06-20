import React from 'react';

/**
 * QuoteBlock — the chapter epigraph used in the workbooks: italic serif on a
 * faint tint with a gold left rule. Distinct from the editorial pull-quote
 * Testimonial (this one is a soft inset, not a display moment).
 */
export function QuoteBlock({ children, author, style = {} }) {
  return (
    <figure style={{
      margin: 0, background: 'var(--sheet-tint)', borderLeft: '4px solid var(--imprint-gold)',
      borderRadius: '0 var(--radius-md) var(--radius-md) 0', padding: '16px 22px', ...style,
    }}>
      <blockquote style={{
        margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 'var(--text-md)', lineHeight: 1.55, color: 'var(--text-strong)',
      }}>{children}</blockquote>
      {author && (
        <figcaption style={{ marginTop: 10, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{author}</figcaption>
      )}
    </figure>
  );
}
