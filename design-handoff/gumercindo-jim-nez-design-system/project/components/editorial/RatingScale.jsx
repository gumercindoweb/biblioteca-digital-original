import React from 'react';

/**
 * RatingScale — the 1–10 self-assessment row from the "Mi Punto de Partida"
 * wheel ("¿Qué bar ves aquí?"). Numbered cells the reader circles.
 */
export function RatingScale({ label, hint, max = 10, style = {} }) {
  return (
    <div style={{ ...style }}>
      {label && (
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--text-strong)', marginBottom: 4 }}>{label}</div>
      )}
      {hint && (
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 12 }}>{hint}</div>
      )}
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} style={{
            flex: 1, aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid var(--sheet-line)', borderRadius: '50%',
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
          }}>{i + 1}</div>
        ))}
      </div>
    </div>
  );
}
