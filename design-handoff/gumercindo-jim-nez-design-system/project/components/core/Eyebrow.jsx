import React from 'react';

/**
 * Eyebrow — the editorial kicker that sits above headlines.
 * Tracked uppercase sans with an optional leading gold rule.
 */
export function Eyebrow({ children, rule = true, tone = 'accent', style = {}, ...rest }) {
  const colors = {
    accent: 'var(--text-accent)',
    brand: 'var(--text-brand)',
    metal: 'var(--gold-600)',
    muted: 'var(--text-muted)',
    onDark: 'var(--gold-400)',
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        color: colors[tone] || colors.accent,
        ...style,
      }}
      {...rest}
    >
      {rule && (
        <span style={{ width: 28, height: 2, background: 'currentColor', opacity: 0.55, flex: 'none' }} />
      )}
      {children}
    </span>
  );
}
