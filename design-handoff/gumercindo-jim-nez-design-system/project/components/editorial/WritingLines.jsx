import React from 'react';

/**
 * WritingLines — the ruled fill-in space that follows a journal prompt.
 * Hairline rows; color follows --sheet-line (violet inside a diario).
 */
export function WritingLines({ count = 3, gap = 34, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ height: gap, borderBottom: '1.5px solid var(--sheet-line)' }} />
      ))}
    </div>
  );
}
