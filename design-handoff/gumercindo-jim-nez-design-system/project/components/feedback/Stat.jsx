import React from 'react';

/**
 * Stat — oversized editorial metric. Display serif figure with a tracked
 * caps label beneath. For proof points: years, revenue, clients.
 */
export function Stat({ value, label, suffix, prefix, tone = 'default', align = 'start', style = {} }) {
  const onDark = tone === 'dark';
  const figureColor = onDark ? 'var(--text-on-dark)' : 'var(--text-strong)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-4xl)',
        lineHeight: 0.95, letterSpacing: 'var(--tracking-tight)', color: figureColor,
        display: 'flex', alignItems: 'baseline', gap: 2,
      }}>
        {prefix && <span style={{ fontSize: '0.5em', color: 'var(--gold-600)', fontWeight: 500 }}>{prefix}</span>}
        <span>{value}</span>
        {suffix && <span style={{ fontSize: '0.5em', color: 'var(--gold-600)', fontWeight: 500 }}>{suffix}</span>}
      </div>
      <span style={{ width: 28, height: 2, background: 'var(--metal)' }} />
      <span style={{
        fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase',
        color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)', maxWidth: '22ch',
      }}>{label}</span>
    </div>
  );
}
