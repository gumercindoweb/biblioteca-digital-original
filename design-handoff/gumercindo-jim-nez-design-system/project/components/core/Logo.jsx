import React from 'react';

/**
 * Logo — the Gumercindo Jiménez mark. `variant` picks symbol-only vs the
 * full lockup; `tone` swaps art for light/dark backgrounds. Images are
 * shipped brand assets (see /assets/logo).
 */
export function Logo({ variant = 'lockup', tone = 'auto', height, base = '', style = {}, ...rest }) {
  // Resolve asset by variant + tone
  const dark = tone === 'dark' || tone === 'onDark';
  let src, h;
  if (variant === 'symbol') {
    src = dark ? 'assets/logo/gj-symbol-ivory.png'
        : tone === 'gold' ? 'assets/logo/gj-symbol-gold.png'
        : 'assets/logo/gj-symbol-green.png';
    h = height || 40;
  } else { // lockup
    src = dark ? 'assets/logo/gj-monogram-original.webp' : 'assets/logo/gj-lockup-light.png';
    h = height || 44;
  }
  const url = (base ? base.replace(/\/$/, '') + '/' : '') + src;
  return (
    <img
      src={url}
      alt="Gumercindo Jiménez"
      style={{ height: h, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
}
