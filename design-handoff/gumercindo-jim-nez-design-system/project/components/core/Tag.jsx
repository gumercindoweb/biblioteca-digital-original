import React from 'react';

/**
 * Tag — compact label/pill for service categories, statuses, metadata.
 * Editorial styling: hairline or filled, tracked caps.
 */
export function Tag({ children, variant = 'soft', tone = 'brand', style = {}, ...rest }) {
  const palettes = {
    brand: { soft: ['var(--green-50)', 'var(--green-700)'], solid: ['var(--brand)', 'var(--bone-50)'], outline: ['transparent', 'var(--green-700)'] },
    clay:  { soft: ['var(--clay-100)', 'var(--clay-700)'], solid: ['var(--accent)', 'var(--bone-50)'], outline: ['transparent', 'var(--clay-600)'] },
    gold:  { soft: ['var(--gold-200)', 'var(--gold-700)'], solid: ['var(--gold-500)', 'var(--ink-900)'], outline: ['transparent', 'var(--gold-700)'] },
    neutral: { soft: ['var(--bone-100)', 'var(--bark-600)'], solid: ['var(--ink-800)', 'var(--bone-50)'], outline: ['transparent', 'var(--bark-600)'] },
  };
  const [bg, fg] = (palettes[tone] || palettes.brand)[variant];
  const border = variant === 'outline'
    ? (tone === 'gold' ? 'var(--border-gold)' : 'color-mix(in srgb, currentColor 35%, transparent)')
    : 'transparent';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 11px',
        background: bg,
        color: fg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 'var(--text-2xs)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
