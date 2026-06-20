import React from 'react';

/**
 * Card — editorial container. Paper surface, hairline border, soft low
 * shadow, restrained radius. `tone="dark"` for deep-green sections;
 * `interactive` adds a lift on hover.
 */
export function Card({
  children,
  tone = 'paper',
  interactive = false,
  padding = 'lg',
  accentRule = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-7)', xl: 'var(--space-8)' };

  const tones = {
    paper: { background: 'var(--surface-raised)', color: 'var(--text-body)', border: '1px solid var(--border-soft)' },
    sunken: { background: 'var(--surface-sunken)', color: 'var(--text-body)', border: '1px solid var(--border-soft)' },
    tint: { background: 'var(--surface-tint)', color: 'var(--green-900)', border: '1px solid color-mix(in srgb, var(--green-700) 14%, transparent)' },
    dark: { background: 'var(--surface-inverse)', color: 'var(--text-on-dark)', border: '1px solid var(--border-on-dark)' },
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        padding: pads[padding] ?? pads.lg,
        boxShadow: interactive && hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: interactive && hover ? 'translateY(-3px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        overflow: 'hidden',
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {accentRule && (
        <span style={{ position: 'absolute', top: 0, left: 0, width: 44, height: 3, background: 'var(--metal)' }} />
      )}
      {children}
    </div>
  );
}
