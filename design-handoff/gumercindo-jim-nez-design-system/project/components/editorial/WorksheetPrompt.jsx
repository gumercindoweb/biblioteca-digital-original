import React from 'react';

/**
 * WorksheetPrompt — a journal question. Two looks:
 *  - 'card'  : filled band (the diario's purple question-card)
 *  - 'plain' : numbered serif question (the workbook's "El espejo")
 * Optional example hint and ruled answer space beneath.
 */
export function WorksheetPrompt({
  children, variant = 'card', number, example, lines = 0, style = {},
}) {
  const head = variant === 'card' ? (
    <div style={{
      background: 'var(--editorial-band)', color: 'var(--bone-50)',
      padding: '16px 22px', borderRadius: 'var(--radius-md)',
    }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', lineHeight: 1.4 }}>{children}</p>
    </div>
  ) : (
    <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--text-body)' }}>
      {number != null && <strong style={{ color: 'var(--editorial-band)', marginRight: 6 }}>{number}.</strong>}
      {children}
    </p>
  );
  return (
    <div style={{ ...style }}>
      {head}
      {example && (
        <div style={{
          background: 'var(--sheet-tint)', border: '1px solid var(--border-soft)',
          borderRadius: 'var(--radius-sm)', padding: '12px 16px', margin: '10px 0 0',
          fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.55,
        }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-2xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)', marginBottom: 4 }}>Ejemplo</span>
          {example}
        </div>
      )}
      {lines > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} style={{ height: 32, borderBottom: '1.5px solid var(--sheet-line)' }} />
          ))}
        </div>
      )}
    </div>
  );
}
