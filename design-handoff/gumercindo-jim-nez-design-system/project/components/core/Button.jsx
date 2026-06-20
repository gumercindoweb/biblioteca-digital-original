import React from 'react';

/**
 * Button — primary action control for the Gumercindo Jiménez system.
 * Editorial-luxury: restrained radius, hairline detail, serif-adjacent
 * weight. Variants: solid (brand green), accent (clay), outline (gold
 * hairline), ghost, link. Sizes sm / md / lg.
 */
export function Button({
  children,
  variant = 'solid',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 16px', height: 38, font: 'var(--text-sm)' },
    md: { padding: '0 24px', height: 48, font: 'var(--text-sm)' },
    lg: { padding: '0 34px', height: 58, font: 'var(--text-base)' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: s.font,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    whiteSpace: 'nowrap',
    WebkitFontSmoothing: 'antialiased',
  };

  const variants = {
    solid: {
      background: 'var(--brand)',
      color: 'var(--bone-50)',
      boxShadow: 'var(--shadow-sm)',
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--bone-50)',
      boxShadow: 'var(--shadow-sm)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-brand)',
      borderColor: 'var(--border-gold)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-brand)',
    },
    link: {
      background: 'transparent',
      color: 'var(--text-brand)',
      height: 'auto',
      padding: 0,
      letterSpacing: '0.02em',
      textTransform: 'none',
      borderRadius: 0,
    },
  };

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    solid: { background: 'var(--brand-hover)', boxShadow: 'var(--shadow-md)' },
    accent: { background: 'var(--accent-hover)', boxShadow: 'var(--shadow-md)' },
    outline: { borderColor: 'var(--gold-500)', background: 'color-mix(in srgb, var(--gold-500) 8%, transparent)' },
    ghost: { background: 'color-mix(in srgb, var(--green-700) 8%, transparent)' },
    link: { color: 'var(--brand-hover)' },
  }[variant] : {};

  const pressStyle = !disabled && press ? { transform: 'translateY(0.5px) scale(0.985)' } : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...pressStyle, ...style }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex', fontSize: '1.1em' }}>{iconLeft}</span>}
      {variant === 'link'
        ? <span style={{ borderBottom: '1px solid var(--border-gold)', paddingBottom: 2 }}>{children}</span>
        : children}
      {iconRight && <span style={{ display: 'inline-flex', fontSize: '1.1em' }}>{iconRight}</span>}
    </button>
  );
}
