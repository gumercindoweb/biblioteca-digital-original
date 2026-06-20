import React from 'react';

/**
 * BlockLabel — the tracked-caps section marker used through Gumercindo's
 * workbooks & diarios (e.g. "✦ BLOQUE 1 — LA ESENCIA"). A glyph + spaced
 * uppercase label over a hairline rule.
 */
export function BlockLabel({ glyph = '✦', children, rule = true, style = {} }) {
  return (
    <div style={{ ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--imprint-gold)', fontSize: '1.05em', lineHeight: 1 }}>{glyph}</span>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-2xs)',
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--editorial-band)',
        }}>{children}</span>
      </div>
      {rule && <div style={{ height: 1, background: 'var(--border-soft)', marginTop: 10 }} />}
    </div>
  );
}
