import React from 'react';

/**
 * Input — text field with editorial label. Hairline border, gold focus,
 * serif input text. Supports label, hint, error, and a leading adornment.
 */
export function Input({
  label,
  hint,
  error,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  adornment = null,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const borderColor = error ? 'var(--danger)'
    : focus ? 'var(--green-600)'
    : 'var(--border-strong)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', ...style }}>
      {label && (
        <label htmlFor={fid} style={{
          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>
          {label}{required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: disabled ? 'var(--surface-sunken)' : 'var(--surface-raised)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-sm)',
        padding: '0 14px', height: 50,
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
        transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      }}>
        {adornment && <span style={{ color: 'var(--text-faint)', display: 'inline-flex' }}>{adornment}</span>}
        <input
          id={fid}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-body)',
            minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)',
          color: error ? 'var(--danger)' : 'var(--text-faint)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
