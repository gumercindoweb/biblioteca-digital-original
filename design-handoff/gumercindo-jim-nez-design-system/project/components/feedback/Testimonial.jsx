import React from 'react';

/**
 * Testimonial — editorial pull-quote. Big serif italic quote, optional
 * attribution. Used in the "Lo que podrías estar diciendo" section.
 */
export function Testimonial({ quote, author, role, tone = 'paper', size = 'md', style = {} }) {
  const onDark = tone === 'dark';
  const sizes = { sm: 'var(--text-md)', md: 'var(--text-lg)', lg: 'var(--text-xl)' };
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 18, ...style }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 0.6, color: 'var(--gold-500)',
        height: 22,
      }} aria-hidden>“</span>
      <blockquote style={{
        margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400,
        fontSize: sizes[size] || sizes.md, lineHeight: 'var(--leading-snug)',
        color: onDark ? 'var(--text-on-dark)' : 'var(--text-strong)', textWrap: 'pretty',
      }}>
        {quote}
      </blockquote>
      {(author || role) && (
        <figcaption style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <span style={{ width: 22, height: 1.5, background: 'var(--gold-500)', flex: 'none' }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600,
            color: onDark ? 'var(--text-on-dark)' : 'var(--text-strong)',
          }}>
            {author}{role && <span style={{ fontWeight: 400, color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)' }}>{author ? ' · ' : ''}{role}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
