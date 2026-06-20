import React from 'react';

/**
 * Accordion — FAQ-style disclosure list. Matches the brand's
 * "Preguntas frecuentes" pattern: serif question, hairline divider,
 * gold "+" that rotates. Single-open by default.
 */
export function Accordion({ items = [], allowMultiple = false, defaultOpen = [], tone = 'paper', style = {} }) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  const onDark = tone === 'dark';
  const line = onDark ? 'var(--border-on-dark)' : 'var(--border-soft)';
  const q = onDark ? 'var(--text-on-dark)' : 'var(--text-strong)';
  const a = onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)';

  return (
    <div style={{ borderTop: `1px solid ${line}`, ...style }}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderBottom: `1px solid ${line}` }}>
            <button
              onClick={() => toggle(i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 20, padding: '22px 4px', background: 'transparent', border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-lg)',
                color: q, lineHeight: 1.2,
              }}>{it.q}</span>
              <span style={{
                flex: 'none', width: 26, height: 26, display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--gold-600)', fontFamily: 'var(--font-sans)',
                fontSize: 22, fontWeight: 400, lineHeight: 1,
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform var(--dur-base) var(--ease-out)',
              }}>+</span>
            </button>
            <div style={{
              overflow: 'hidden',
              maxHeight: isOpen ? 400 : 0,
              opacity: isOpen ? 1 : 0,
              transition: 'max-height var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: a,
                lineHeight: 'var(--leading-relaxed)', padding: '0 4px 24px', margin: 0, maxWidth: '60ch',
              }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
