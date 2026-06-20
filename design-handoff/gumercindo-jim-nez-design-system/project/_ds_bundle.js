/* @ds-bundle: {"format":3,"namespace":"GumercindoJimNezDesignSystem_5d8aa6","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"BlockLabel","sourcePath":"components/editorial/BlockLabel.jsx"},{"name":"QuoteBlock","sourcePath":"components/editorial/QuoteBlock.jsx"},{"name":"RatingScale","sourcePath":"components/editorial/RatingScale.jsx"},{"name":"WorksheetPrompt","sourcePath":"components/editorial/WorksheetPrompt.jsx"},{"name":"WritingLines","sourcePath":"components/editorial/WritingLines.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Stat","sourcePath":"components/feedback/Stat.jsx"},{"name":"Testimonial","sourcePath":"components/feedback/Testimonial.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/core/Button.jsx":"8997ad74cd2f","components/core/Card.jsx":"597a2574dd22","components/core/Eyebrow.jsx":"7a2ec841e94d","components/core/Logo.jsx":"55e0fc62456d","components/core/Tag.jsx":"90cb67ab9915","components/editorial/BlockLabel.jsx":"e1490ae7f4c4","components/editorial/QuoteBlock.jsx":"9c34caa1e584","components/editorial/RatingScale.jsx":"070ccc0ac9cc","components/editorial/WorksheetPrompt.jsx":"dc0091cde7a2","components/editorial/WritingLines.jsx":"26769a2f9067","components/feedback/Accordion.jsx":"988771571353","components/feedback/Stat.jsx":"92e65798c7ce","components/feedback/Testimonial.jsx":"7d93b8425922","components/forms/Input.jsx":"7bad2c7299da","ui_kits/book/sections.jsx":"a7df6b5c2243","ui_kits/website/sections.jsx":"df30411daffd","ui_kits/workbook/sections.jsx":"5c491aba2481"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GumercindoJimNezDesignSystem_5d8aa6 = window.GumercindoJimNezDesignSystem_5d8aa6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control for the Gumercindo Jiménez system.
 * Editorial-luxury: restrained radius, hairline detail, serif-adjacent
 * weight. Variants: solid (brand green), accent (clay), outline (gold
 * hairline), ghost, link. Sizes sm / md / lg.
 */
function Button({
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
    sm: {
      padding: '0 16px',
      height: 38,
      font: 'var(--text-sm)'
    },
    md: {
      padding: '0 24px',
      height: 48,
      font: 'var(--text-sm)'
    },
    lg: {
      padding: '0 34px',
      height: 58,
      font: 'var(--text-base)'
    }
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
    WebkitFontSmoothing: 'antialiased'
  };
  const variants = {
    solid: {
      background: 'var(--brand)',
      color: 'var(--bone-50)',
      boxShadow: 'var(--shadow-sm)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--bone-50)',
      boxShadow: 'var(--shadow-sm)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-brand)',
      borderColor: 'var(--border-gold)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-brand)'
    },
    link: {
      background: 'transparent',
      color: 'var(--text-brand)',
      height: 'auto',
      padding: 0,
      letterSpacing: '0.02em',
      textTransform: 'none',
      borderRadius: 0
    }
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    solid: {
      background: 'var(--brand-hover)',
      boxShadow: 'var(--shadow-md)'
    },
    accent: {
      background: 'var(--accent-hover)',
      boxShadow: 'var(--shadow-md)'
    },
    outline: {
      borderColor: 'var(--gold-500)',
      background: 'color-mix(in srgb, var(--gold-500) 8%, transparent)'
    },
    ghost: {
      background: 'color-mix(in srgb, var(--green-700) 8%, transparent)'
    },
    link: {
      color: 'var(--brand-hover)'
    }
  }[variant] : {};
  const pressStyle = !disabled && press ? {
    transform: 'translateY(0.5px) scale(0.985)'
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      ...pressStyle,
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.1em'
    }
  }, iconLeft), variant === 'link' ? /*#__PURE__*/React.createElement("span", {
    style: {
      borderBottom: '1px solid var(--border-gold)',
      paddingBottom: 2
    }
  }, children) : children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.1em'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — editorial container. Paper surface, hairline border, soft low
 * shadow, restrained radius. `tone="dark"` for deep-green sections;
 * `interactive` adds a lift on hover.
 */
function Card({
  children,
  tone = 'paper',
  interactive = false,
  padding = 'lg',
  accentRule = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-7)',
    xl: 'var(--space-8)'
  };
  const tones = {
    paper: {
      background: 'var(--surface-raised)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-soft)'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-soft)'
    },
    tint: {
      background: 'var(--surface-tint)',
      color: 'var(--green-900)',
      border: '1px solid color-mix(in srgb, var(--green-700) 14%, transparent)'
    },
    dark: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)',
      border: '1px solid var(--border-on-dark)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-card)',
      padding: pads[padding] ?? pads.lg,
      boxShadow: interactive && hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: interactive && hover ? 'translateY(-3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      overflow: 'hidden',
      ...tones[tone],
      ...style
    }
  }, rest), accentRule && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 44,
      height: 3,
      background: 'var(--metal)'
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the editorial kicker that sits above headlines.
 * Tracked uppercase sans with an optional leading gold rule.
 */
function Eyebrow({
  children,
  rule = true,
  tone = 'accent',
  style = {},
  ...rest
}) {
  const colors = {
    accent: 'var(--text-accent)',
    brand: 'var(--text-brand)',
    metal: 'var(--gold-600)',
    muted: 'var(--text-muted)',
    onDark: 'var(--gold-400)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: colors[tone] || colors.accent,
      ...style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 2,
      background: 'currentColor',
      opacity: 0.55,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Logo — the Gumercindo Jiménez mark. `variant` picks symbol-only vs the
 * full lockup; `tone` swaps art for light/dark backgrounds. Images are
 * shipped brand assets (see /assets/logo).
 */
function Logo({
  variant = 'lockup',
  tone = 'auto',
  height,
  base = '',
  style = {},
  ...rest
}) {
  // Resolve asset by variant + tone
  const dark = tone === 'dark' || tone === 'onDark';
  let src, h;
  if (variant === 'symbol') {
    src = dark ? 'assets/logo/gj-symbol-ivory.png' : tone === 'gold' ? 'assets/logo/gj-symbol-gold.png' : 'assets/logo/gj-symbol-green.png';
    h = height || 40;
  } else {
    // lockup
    src = dark ? 'assets/logo/gj-monogram-original.webp' : 'assets/logo/gj-lockup-light.png';
    h = height || 44;
  }
  const url = (base ? base.replace(/\/$/, '') + '/' : '') + src;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: url,
    alt: "Gumercindo Jim\xE9nez",
    style: {
      height: h,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — compact label/pill for service categories, statuses, metadata.
 * Editorial styling: hairline or filled, tracked caps.
 */
function Tag({
  children,
  variant = 'soft',
  tone = 'brand',
  style = {},
  ...rest
}) {
  const palettes = {
    brand: {
      soft: ['var(--green-50)', 'var(--green-700)'],
      solid: ['var(--brand)', 'var(--bone-50)'],
      outline: ['transparent', 'var(--green-700)']
    },
    clay: {
      soft: ['var(--clay-100)', 'var(--clay-700)'],
      solid: ['var(--accent)', 'var(--bone-50)'],
      outline: ['transparent', 'var(--clay-600)']
    },
    gold: {
      soft: ['var(--gold-200)', 'var(--gold-700)'],
      solid: ['var(--gold-500)', 'var(--ink-900)'],
      outline: ['transparent', 'var(--gold-700)']
    },
    neutral: {
      soft: ['var(--bone-100)', 'var(--bark-600)'],
      solid: ['var(--ink-800)', 'var(--bone-50)'],
      outline: ['transparent', 'var(--bark-600)']
    }
  };
  const [bg, fg] = (palettes[tone] || palettes.brand)[variant];
  const border = variant === 'outline' ? tone === 'gold' ? 'var(--border-gold)' : 'color-mix(in srgb, currentColor 35%, transparent)' : 'transparent';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 11px',
      background: bg,
      color: fg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      lineHeight: 1,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/editorial/BlockLabel.jsx
try { (() => {
/**
 * BlockLabel — the tracked-caps section marker used through Gumercindo's
 * workbooks & diarios (e.g. "✦ BLOQUE 1 — LA ESENCIA"). A glyph + spaced
 * uppercase label over a hairline rule.
 */
function BlockLabel({
  glyph = '✦',
  children,
  rule = true,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--imprint-gold)',
      fontSize: '1.05em',
      lineHeight: 1
    }
  }, glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-2xs)',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--editorial-band)'
    }
  }, children)), rule && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-soft)',
      marginTop: 10
    }
  }));
}
Object.assign(__ds_scope, { BlockLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/BlockLabel.jsx", error: String((e && e.message) || e) }); }

// components/editorial/QuoteBlock.jsx
try { (() => {
/**
 * QuoteBlock — the chapter epigraph used in the workbooks: italic serif on a
 * faint tint with a gold left rule. Distinct from the editorial pull-quote
 * Testimonial (this one is a soft inset, not a display moment).
 */
function QuoteBlock({
  children,
  author,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      background: 'var(--sheet-tint)',
      borderLeft: '4px solid var(--imprint-gold)',
      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
      padding: '16px 22px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 'var(--text-md)',
      lineHeight: 1.55,
      color: 'var(--text-strong)'
    }
  }, children), author && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, author));
}
Object.assign(__ds_scope, { QuoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/QuoteBlock.jsx", error: String((e && e.message) || e) }); }

// components/editorial/RatingScale.jsx
try { (() => {
/**
 * RatingScale — the 1–10 self-assessment row from the "Mi Punto de Partida"
 * wheel ("¿Qué bar ves aquí?"). Numbered cells the reader circles.
 */
function RatingScale({
  label,
  hint,
  max = 10,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-md)',
      color: 'var(--text-strong)',
      marginBottom: 4
    }
  }, label), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginBottom: 12
    }
  }, hint), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      aspectRatio: '1 / 1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1.5px solid var(--sheet-line)',
      borderRadius: '50%',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, i + 1))));
}
Object.assign(__ds_scope, { RatingScale });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/RatingScale.jsx", error: String((e && e.message) || e) }); }

// components/editorial/WorksheetPrompt.jsx
try { (() => {
/**
 * WorksheetPrompt — a journal question. Two looks:
 *  - 'card'  : filled band (the diario's purple question-card)
 *  - 'plain' : numbered serif question (the workbook's "El espejo")
 * Optional example hint and ruled answer space beneath.
 */
function WorksheetPrompt({
  children,
  variant = 'card',
  number,
  example,
  lines = 0,
  style = {}
}) {
  const head = variant === 'card' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--editorial-band)',
      color: 'var(--bone-50)',
      padding: '16px 22px',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-md)',
      lineHeight: 1.4
    }
  }, children)) : /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.55,
      color: 'var(--text-body)'
    }
  }, number != null && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--editorial-band)',
      marginRight: 6
    }
  }, number, "."), children);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, head, example && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sheet-tint)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 16px',
      margin: '10px 0 0',
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-2xs)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--gold-700)',
      marginBottom: 4
    }
  }, "Ejemplo"), example), lines > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      flexDirection: 'column'
    }
  }, Array.from({
    length: lines
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 32,
      borderBottom: '1.5px solid var(--sheet-line)'
    }
  }))));
}
Object.assign(__ds_scope, { WorksheetPrompt });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/WorksheetPrompt.jsx", error: String((e && e.message) || e) }); }

// components/editorial/WritingLines.jsx
try { (() => {
/**
 * WritingLines — the ruled fill-in space that follows a journal prompt.
 * Hairline rows; color follows --sheet-line (violet inside a diario).
 */
function WritingLines({
  count = 3,
  gap = 34,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: gap,
      borderBottom: '1.5px solid var(--sheet-line)'
    }
  })));
}
Object.assign(__ds_scope, { WritingLines });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/WritingLines.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
/**
 * Accordion — FAQ-style disclosure list. Matches the brand's
 * "Preguntas frecuentes" pattern: serif question, hairline divider,
 * gold "+" that rotates. Single-open by default.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  tone = 'paper',
  style = {}
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  const onDark = tone === 'dark';
  const line = onDark ? 'var(--border-on-dark)' : 'var(--border-soft)';
  const q = onDark ? 'var(--text-on-dark)' : 'var(--text-strong)';
  const a = onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${line}`,
      ...style
    }
  }, items.map((it, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: `1px solid ${line}`
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        padding: '22px 4px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'var(--text-lg)',
        color: q,
        lineHeight: 1.2
      }
    }, it.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        width: 26,
        height: 26,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold-600)',
        fontFamily: 'var(--font-sans)',
        fontSize: 22,
        fontWeight: 400,
        lineHeight: 1,
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform var(--dur-base) var(--ease-out)'
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden',
        maxHeight: isOpen ? 400 : 0,
        opacity: isOpen ? 1 : 0,
        transition: 'max-height var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-base)',
        color: a,
        lineHeight: 'var(--leading-relaxed)',
        padding: '0 4px 24px',
        margin: 0,
        maxWidth: '60ch'
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Stat.jsx
try { (() => {
/**
 * Stat — oversized editorial metric. Display serif figure with a tracked
 * caps label beneath. For proof points: years, revenue, clients.
 */
function Stat({
  value,
  label,
  suffix,
  prefix,
  tone = 'default',
  align = 'start',
  style = {}
}) {
  const onDark = tone === 'dark';
  const figureColor = onDark ? 'var(--text-on-dark)' : 'var(--text-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-4xl)',
      lineHeight: 0.95,
      letterSpacing: 'var(--tracking-tight)',
      color: figureColor,
      display: 'flex',
      alignItems: 'baseline',
      gap: 2
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.5em',
      color: 'var(--gold-600)',
      fontWeight: 500
    }
  }, prefix), /*#__PURE__*/React.createElement("span", null, value), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.5em',
      color: 'var(--gold-600)',
      fontWeight: 500
    }
  }, suffix)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 2,
      background: 'var(--metal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      maxWidth: '22ch'
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Testimonial.jsx
try { (() => {
/**
 * Testimonial — editorial pull-quote. Big serif italic quote, optional
 * attribution. Used in the "Lo que podrías estar diciendo" section.
 */
function Testimonial({
  quote,
  author,
  role,
  tone = 'paper',
  size = 'md',
  style = {}
}) {
  const onDark = tone === 'dark';
  const sizes = {
    sm: 'var(--text-md)',
    md: 'var(--text-lg)',
    lg: 'var(--text-xl)'
  };
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 44,
      lineHeight: 0.6,
      color: 'var(--gold-500)',
      height: 22
    },
    "aria-hidden": true
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: sizes[size] || sizes.md,
      lineHeight: 'var(--leading-snug)',
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-strong)',
      textWrap: 'pretty'
    }
  }, quote), (author || role) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 1.5,
      background: 'var(--gold-500)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-strong)'
    }
  }, author, role && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, author ? ' · ' : '', role))));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with editorial label. Hairline border, gold focus,
 * serif input text. Supports label, hint, error, and a leading adornment.
 */
function Input({
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
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--green-600)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      marginLeft: 4
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-raised)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      padding: '0 14px',
      height: 50,
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, adornment && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, adornment), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      minWidth: 0
    }
  }, rest))), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-faint)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/book/sections.jsx
try { (() => {
/* Gumercindo Jiménez — Book landing UI kit ("Hay que salir del bar").
   A luxury-editorial sales page built on the DS primitives. */
const NS = window.GumercindoJimNezDesignSystem_5d8aa6;
const {
  Button,
  Tag,
  Eyebrow,
  Card,
  Logo,
  Accordion,
  Testimonial,
  Stat
} = NS;
const BASE = '../..';
function Container({
  children,
  narrow,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: narrow ? 760 : 1120,
      margin: '0 auto',
      padding: '0 32px',
      ...style
    }
  }, children);
}

/* The book itself — the real cover is the title set in serif on deep green.
   Recreated typographically (no cover art asset shipped). */
function BookCover({
  w = 230,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      aspectRatio: '3 / 4.4',
      borderRadius: '3px 6px 6px 3px',
      background: 'linear-gradient(120deg, var(--green-700), var(--green-900))',
      boxShadow: 'var(--shadow-xl), inset 7px 0 14px -6px rgba(0,0,0,.45), inset 2px 0 0 rgba(255,255,255,.06)',
      borderLeft: '3px solid var(--green-950)',
      padding: '30px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 9,
      letterSpacing: '.24em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)'
    }
  }, "Gumercindo Jim\xE9nez"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 2,
      background: 'var(--gold-500)',
      display: 'block',
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: w * 0.18,
      lineHeight: 0.98,
      color: 'var(--bone-50)',
      margin: 0,
      letterSpacing: '-.01em'
    }
  }, "Hay que", /*#__PURE__*/React.createElement("br", null), "salir", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--gold-400)'
    }
  }, "del bar"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 11,
      color: 'var(--text-on-dark-muted)'
    }
  }, "Un viaje de introspecci\xF3n"));
}

/* Gold guarantee medallion */
function Seal({
  size = 132
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      position: 'relative',
      background: 'radial-gradient(circle at 38% 32%, var(--gold-400), var(--gold-600) 70%, var(--gold-700))',
      boxShadow: 'var(--shadow-lg), inset 0 0 0 2px rgba(255,255,255,.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 8,
      borderRadius: '50%',
      border: '1.5px dashed rgba(61,48,24,.5)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size * 0.30,
      lineHeight: 1,
      color: 'var(--green-950)'
    }
  }, "30"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--umber-700)'
    }
  }, "D\xEDas de garant\xEDa"));
}
function Nav() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'color-mix(in srgb, var(--green-950) 80%, transparent)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-on-dark)'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    tone: "dark",
    base: BASE,
    height: 40
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "accent"
  }, "Quiero el libro")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse-deep)',
      padding: '80px 0 96px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, "Nuevo libro \xB7 Introspecci\xF3n"), /*#__PURE__*/React.createElement("h1", {
    className: "gj-display",
    style: {
      fontSize: 56,
      fontWeight: 600,
      lineHeight: 1.04,
      color: 'var(--bone-50)',
      margin: '22px 0 0'
    }
  }, "Sal\xED de la rutina que te atrapa y desbloque\xE1 tu ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--gold-400)'
    }
  }, "verdadero potencial"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--text-on-dark-muted)',
      margin: '24px 0 0',
      maxWidth: '46ch'
    }
  }, "Un m\xE9todo \xEDntimo para empezar el viaje de introspecci\xF3n sin sentirte abrumado por el estancamiento, el miedo o el agotamiento."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      marginTop: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "accent"
  }, "Quiero mi ejemplar"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-on-dark-muted)'
    }
  }, "Edici\xF3n digital \xB7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--gold-400)',
      fontWeight: 600
    }
  }, "$24.99")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(BookCover, {
    w: 250,
    style: {
      transform: 'rotate(-3deg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -18,
      right: 8
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 118
  })))));
}
const INSIDE = [{
  icon: '◷',
  title: 'Reconocé dónde estás',
  body: 'Identificá con honestidad lo que te frena hoy — sin juicio, con método.'
}, {
  icon: '✕',
  title: 'Puntos de acción',
  body: 'Encontrá pequeños pasos concretos para avanzar, incluso cuando todo se siente abrumador.'
}, {
  icon: '↗',
  title: 'Conectá con vos',
  body: 'Reconectá con tu propio proceso y construí un sistema que sea tuyo.'
}];
function Inside() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '92px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 640,
      margin: '0 auto 52px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      justifyContent: 'center'
    }
  }, "Qu\xE9 vas a encontrar"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 42,
      fontWeight: 600,
      lineHeight: 1.1,
      margin: '18px 0 0',
      color: 'var(--text-strong)'
    }
  }, "C\xF3mo empezar tu viaje sin sentirte abrumado.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, INSIDE.map((c, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    tone: "paper",
    accentRule: true,
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      color: 'var(--gold-600)',
      marginBottom: 14
    }
  }, c.icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 23,
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '0 0 10px'
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 15.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, c.body))))));
}

/* Offer band */
function Offer() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-tint)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.2fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(BookCover, {
    w: 220
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "brand"
  }, "La oferta"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--green-900)',
      margin: '16px 0 8px'
    }
  }, "Hay que salir del bar"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 16.5,
      lineHeight: 1.65,
      color: 'var(--bark-600)',
      margin: '0 0 24px',
      maxWidth: '50ch'
    }
  }, "El libro, m\xE1s tres bonus para enriquecer tu proceso: hipnosis para romper creencias limitantes, un workbook de ejercicios y un m\xE9todo para convertir tus quejas en poder personal."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 28
    }
  }, ['El libro completo en formato digital', 'Bonus 1 — Reprograma tu mente (hipnosis)', 'Bonus 2 — Workbook de introspección', 'Bonus 3 — De la queja al poder personal'].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-600)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 16,
      color: 'var(--text-body)'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "solid"
  }, "Comprar ahora \xB7 $24.99"), /*#__PURE__*/React.createElement(Tag, {
    tone: "gold",
    variant: "soft"
  }, "Garant\xEDa 30 d\xEDas")))));
}
function Proof() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark",
    style: {
      justifyContent: 'center'
    }
  }, "Antes de vos, ya lo vivieron"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Testimonial, {
    tone: "dark",
    size: "lg",
    quote: "Yo tambi\xE9n me sent\xED estancado, sin claridad y frustrado con mi vida. Este libro me dio el primer paso \u2014 peque\xF1o, pero real.",
    author: "Lector"
  }))));
}
function FAQ() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '92px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 38
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      justifyContent: 'center'
    }
  }, "Podr\xEDas estar preguntando"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '16px 0 0'
    }
  }, "Lo que necesit\xE1s saber.")), /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: [0],
    items: [{
      q: '¿Para quién es este libro?',
      a: 'Para quien siente que su rutina lo atrapa y quiere empezar — de verdad — un proceso de introspección con pasos concretos.'
    }, {
      q: '¿Cómo lo recibo?',
      a: 'Es digital: lo recibís por email apenas confirmás la compra, junto con los tres bonus.'
    }, {
      q: '¿Cuánto tarda en llegar?',
      a: 'De inmediato. El acceso es instantáneo a tu correo.'
    }, {
      q: '¿Y si no es para mí?',
      a: 'Tenés 30 días de garantía. Si no te sirve, te devuelvo tu dinero.'
    }]
  })));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-900)',
      padding: '48px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    tone: "dark",
    base: BASE,
    height: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-on-dark-muted)'
    }
  }, "\xA9 2026 Gumercindo Jim\xE9nez \xB7 Hay que salir del bar")));
}
window.GJBook = {
  Nav,
  Hero,
  Inside,
  Offer,
  Proof,
  FAQ,
  Footer
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/book/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Gumercindo Jiménez — Website UI kit sections.
   Composes the design-system primitives (window namespace) into the real
   site surfaces: nav, hero, about, services, proof, testimonials, FAQ,
   audit form, footer. Loaded after React + the DS bundle. */
const NS = window.GumercindoJimNezDesignSystem_5d8aa6;
const {
  Button,
  Tag,
  Eyebrow,
  Card,
  Logo,
  Input,
  Accordion,
  Testimonial,
  Stat
} = NS;
const BASE = '../..'; // path back to DS root from ui_kits/website/

/* ---------- Shared bits ------------------------------------- */
function Container({
  children,
  narrow,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: narrow ? 760 : 1180,
      margin: '0 auto',
      padding: '0 32px',
      ...style
    }
  }, children);
}
function PortraitPlaceholder({
  label = 'Retrato',
  tall,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: tall ? '4 / 5' : '1 / 1',
      width: '100%',
      background: 'linear-gradient(155deg, var(--green-800), var(--green-950))',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-lg)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: BASE + '/assets/logo/gj-symbol-gold.png',
    alt: "",
    style: {
      height: 84,
      opacity: 0.26
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 14,
      left: 16,
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      opacity: 0.8
    }
  }, label, " \xB7 placeholder"));
}

/* ---------- Nav --------------------------------------------- */
function Nav({
  onAudit
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'color-mix(in srgb, var(--bone-50) 88%, transparent)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      height: 76,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    tone: "light",
    base: BASE,
    height: 42
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 34
    }
  }, ['Inicio', 'Servicios', 'Sobre mí', 'Trabaja conmigo'].map(t => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-body)',
      letterSpacing: '.01em'
    }
  }, t)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "solid",
    onClick: onAudit
  }, "Solicitar auditor\xEDa"))));
}

/* ---------- Hero -------------------------------------------- */
function Hero({
  onAudit
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '88px 0 96px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "accent"
  }, "El caos me busca \xB7 Yo lo convierto en m\xE9todo"), /*#__PURE__*/React.createElement("h1", {
    className: "gj-display",
    style: {
      fontSize: 58,
      fontWeight: 600,
      lineHeight: 1.04,
      margin: '22px 0 0',
      color: 'var(--text-strong)'
    }
  }, "Si tu negocio funciona bajo ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--text-brand)'
    }
  }, "urgencias"), ", no de estructura\u2026 ah\xED entro yo."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '26px 0 0',
      maxWidth: '46ch'
    }
  }, "Convierto ese caos en un sistema inteligente que funciona con o sin tu presencia. Desde automatizaciones hasta formaci\xF3n de equipo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      marginTop: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "solid",
    onClick: onAudit
  }, "Solicitar una auditor\xEDa"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Valorada en ", /*#__PURE__*/React.createElement("s", {
    style: {
      color: 'var(--text-faint)'
    }
  }, "$250"), " \xB7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-accent)',
      fontWeight: 600
    }
  }, "Hoy, gratis")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(PortraitPlaceholder, {
    label: "Gumercindo",
    tall: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -26,
      left: -26
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "paper",
    padding: "md",
    style: {
      width: 210
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "8",
    suffix: "a\xF1os",
    label: "Transformando negocios desde adentro"
  }))))));
}

/* ---------- About (dark band) ------------------------------- */
function About() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)',
      padding: '92px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 60,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PortraitPlaceholder, {
    label: "En terreno"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, "Sobre m\xED"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 40,
      fontWeight: 500,
      lineHeight: 1.12,
      color: 'var(--bone-50)',
      margin: '20px 0 0'
    }
  }, "Soy Gumercindo, y ayudo a negocios que ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--gold-400)'
    }
  }, "ya venden"), " a convertirse en sistemas rentables y sostenibles."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-on-dark-muted)',
      margin: '24px 0 0',
      maxWidth: '54ch'
    }
  }, "Durante los \xFAltimos 8 a\xF1os he liderado proyectos desde adentro: del caos operativo a una m\xE1quina de atracci\xF3n, conversi\xF3n y fidelizaci\xF3n. Ejecuto, documento, automatizo y escalo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    tone: "dark",
    value: "2",
    label: "Clientes activos en fee recurrente"
  }), /*#__PURE__*/React.createElement(Stat, {
    tone: "dark",
    prefix: "+$",
    value: "2.2K",
    label: "Ingreso mensual recurrente"
  }), /*#__PURE__*/React.createElement(Stat, {
    tone: "dark",
    value: "\u221E",
    label: "Caos convertido en m\xE9todo"
  })))));
}

/* ---------- Services ---------------------------------------- */
const SERVICES = [{
  n: '01',
  tag: 'Automatización',
  title: 'Tu negocio, en piloto inteligente',
  body: 'Configuro herramientas como ManyChat, Make, Brevo y Calendly para que el flujo trabaje por vos.',
  includes: 'Diagnóstico, implementación y formación.',
  cta: 'Quiero automatizar'
}, {
  n: '02',
  tag: 'Ventas',
  title: 'Embudos que convierten, no que adornan',
  body: 'Auditamos y rediseñamos tus embudos para que cada lead sepa exactamente qué hacer.',
  includes: 'Auditoría, rediseño, testing y guías.',
  cta: 'Quiero vender mejor'
}, {
  n: '03',
  tag: 'Negocio',
  title: 'Delegá sin perder el control',
  body: 'Creamos SOPs, manuales y tableros para que el equipo ejecute con criterio y orden.',
  includes: 'Sesiones 1:1, playbooks y seguimiento.',
  cta: 'Quiero delegar'
}];
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Trabaja conmigo"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 42,
      fontWeight: 600,
      lineHeight: 1.08,
      margin: '18px 0 0',
      color: 'var(--text-strong)'
    }
  }, "Tres formas de poner orden \u2014 y de hacerlo rendir.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.n,
    tone: "paper",
    interactive: true,
    accentRule: true,
    padding: "lg",
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 600,
      color: 'var(--green-200)'
    }
  }, s.n), /*#__PURE__*/React.createElement(Tag, {
    tone: "brand"
  }, s.tag)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.15,
      color: 'var(--text-strong)',
      margin: '0 0 12px'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 15.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: '0 0 18px'
    }
  }, s.body), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      color: 'var(--text-body)',
      margin: '0 0 22px'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-accent)'
    }
  }, "Incluye:"), " ", s.includes), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    fullWidth: true,
    iconRight: "\u2192"
  }, s.cta)))))));
}

/* ---------- Testimonials (tint band) ------------------------ */
const QUOTES = [{
  q: 'Pensé que necesitaba más seguidores para vender. Gumer me hizo entender que necesitaba un sistema que convierta. Hoy vendo con menos esfuerzo y más foco.',
  a: 'Dueña de marca'
}, {
  q: 'Creía que automatizar era deshumanizar. Hasta que vi cómo un simple mensaje bien diseñado en WhatsApp cerraba más ventas que diez respuestas manuales.',
  a: 'E-commerce'
}, {
  q: 'No tenía idea de lo que era un embudo. Ahora mi negocio tiene pasos claros y cada lead sabe qué hacer — sin que yo intervenga.',
  a: 'Servicios'
}];
function Testimonials() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-tint)',
      padding: '92px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 680,
      margin: '0 auto 56px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "brand",
    style: {
      justifyContent: 'center'
    }
  }, "En sus palabras"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 42,
      fontWeight: 600,
      lineHeight: 1.1,
      margin: '18px 0 0',
      color: 'var(--green-900)'
    }
  }, "Lo que dicen al trabajar conmigo.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 36
    }
  }, QUOTES.map((t, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    tone: "paper",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Testimonial, {
    size: "sm",
    quote: t.q,
    author: t.a
  }))))));
}

/* ---------- FAQ --------------------------------------------- */
function FAQ() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    narrow: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      justifyContent: 'center'
    }
  }, "Preguntas frecuentes"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 40,
      fontWeight: 600,
      margin: '18px 0 0',
      color: 'var(--text-strong)'
    }
  }, "Antes de que preguntes.")), /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: [0],
    items: [{
      q: '¿Qué incluye exactamente la consultoría?',
      a: 'Un servicio integral de Marketing, Ventas y Negocio: diagnóstico, implementación y optimización. Adaptado a tu negocio, nunca a una plantilla genérica.'
    }, {
      q: '¿Cuánto tiempo toma ver resultados?',
      a: 'Depende del punto de partida, pero la auditoría te da claridad desde la primera semana. Los sistemas empiezan a rendir en cuanto se implementan.'
    }, {
      q: '¿Qué herramientas usás? ¿Tengo que saber usarlas?',
      a: 'Trabajo con ManyChat, Make, Brevo, GetResponse, Calendly y más. No necesitás saber usarlas: las configuro y te formo.'
    }, {
      q: '¿Qué diferencia tu servicio del de una agencia?',
      a: 'No tercerizo tu criterio. Trabajo desde adentro, con vos, cuestionándote y convirtiendo lo que sabés en estrategia medible.'
    }, {
      q: '¿En qué se diferencia una auditoría de una consultoría?',
      a: 'La auditoría es el diagnóstico que te da el mapa. La consultoría es el acompañamiento que recorre el camino con vos.'
    }]
  })));
}

/* ---------- Audit CTA band ---------------------------------- */
function AuditBand({
  onAudit
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse-deep)',
      padding: '84px 0'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark",
    rule: false,
    style: {
      justifyContent: 'center'
    }
  }, "Valorada en $250 \xB7 Hoy gratis"), /*#__PURE__*/React.createElement("h2", {
    className: "gj-display",
    style: {
      fontSize: 50,
      fontWeight: 600,
      lineHeight: 1.06,
      color: 'var(--bone-50)',
      margin: '20px auto 0',
      maxWidth: '18ch'
    }
  }, "Ped\xED la auditor\xEDa que te dar\xE1 ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--gold-400)'
    }
  }, "claridad"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18,
      color: 'var(--text-on-dark-muted)',
      margin: '20px auto 32px',
      maxWidth: '44ch'
    }
  }, "Un plan de acci\xF3n M\xEDnimo Viable, sin compromiso. Empez\xE1 por entender qu\xE9 est\xE1 frenando tu crecimiento."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "accent",
    onClick: onAudit
  }, "Solicitar mi auditor\xEDa gratuita")));
}

/* ---------- Footer ------------------------------------------ */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-900)',
      padding: '56px 0 40px'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    tone: "dark",
    base: BASE,
    height: 44
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 15,
      color: 'var(--text-on-dark-muted)',
      margin: '20px 0 0',
      maxWidth: '34ch'
    }
  }, "El caos, convertido en m\xE9todo. Y el m\xE9todo, en dinero.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement(FootCol, {
    title: "Naveg\xE1",
    items: ['Inicio', 'Servicios', 'Sobre mí', 'Trabaja conmigo']
  }), /*#__PURE__*/React.createElement(FootCol, {
    title: "Seguime",
    items: ['Instagram', 'LinkedIn', 'YouTube']
  }))), /*#__PURE__*/React.createElement(Container, {
    style: {
      marginTop: 44,
      paddingTop: 22,
      borderTop: '1px solid var(--border-on-dark)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-on-dark-muted)'
    }
  }, "\xA9 2026 Gumercindo Jim\xE9nez \xB7 Todos los derechos reservados"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-on-dark-muted)'
    }
  }, "T\xE9rminos \xB7 Privacidad")));
}
function FootCol({
  title,
  items
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 16
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      color: 'var(--text-on-dark)'
    }
  }, i))));
}

/* ---------- Audit modal ------------------------------------- */
function AuditModal({
  open,
  onClose
}) {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (open) setSent(false);
  }, [open]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'color-mix(in srgb, var(--ink-900) 62%, transparent)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 460,
      background: 'var(--surface-raised)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xl)',
      padding: 40,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: 20,
      color: 'var(--text-faint)'
    }
  }, "\u2715"), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: BASE + '/assets/logo/gj-symbol-green.png',
    alt: "",
    style: {
      height: 54,
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '0 0 8px'
    }
  }, "Recibido."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 16,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Te escribo en menos de 24 horas con los pr\xF3ximos pasos.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Auditor\xEDa gratuita"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '14px 0 6px'
    }
  }, "Empecemos por la claridad."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      color: 'var(--text-muted)',
      margin: '0 0 24px'
    }
  }, "Contame de tu negocio y te devuelvo un plan de acci\xF3n M\xEDnimo Viable."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "\xBFC\xF3mo te llam\xE1s?",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "tu@empresa.com",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\xBFQu\xE9 te frena hoy?",
    placeholder: "Contame en una l\xEDnea"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "solid",
    size: "lg",
    fullWidth: true,
    style: {
      marginTop: 6
    }
  }, "Solicitar auditor\xEDa")))));
}
window.GJSite = {
  Nav,
  Hero,
  About,
  Services,
  Testimonials,
  FAQ,
  AuditBand,
  Footer,
  AuditModal
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/workbook/sections.jsx
try { (() => {
/* Gumercindo Jiménez — Workbook & Diario UI kit.
   Recreates two real interior pages on the design system:
   · "Hay que salir del bar" workbook (green line)
   · "Mata al quejica que llevas dentro" diario (violet line)
   Composes the editorial primitives from the DS bundle. */
const NS = window.GumercindoJimNezDesignSystem_5d8aa6;
const {
  BlockLabel,
  WorksheetPrompt,
  WritingLines,
  QuoteBlock,
  RatingScale,
  Logo
} = NS;
const BASE = '../..';

/* Chapter header band — local composition (band + chapter numeral). */
function ChapterHeader({
  kicker,
  title,
  number,
  line
}) {
  const violet = line === 'quejica';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      background: 'var(--editorial-band)',
      color: 'var(--bone-50)'
    }
  }, number != null && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 86,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRight: '1px solid rgba(255,255,255,.15)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 56,
      color: 'var(--imprint-gold)',
      lineHeight: 1
    }
  }, number)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.24em',
      textTransform: 'uppercase',
      color: violet ? '#d9c2ff' : 'var(--imprint-gold)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 26,
      lineHeight: 1.2,
      margin: '6px 0 0'
    }
  }, title)));
}

/* A4-ish page shell with the brand top rule. */
function Sheet({
  children,
  line,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-line": line,
    style: {
      width: 560,
      minHeight: 740,
      background: 'var(--surface-raised)',
      boxShadow: 'var(--shadow-lg)',
      borderRadius: 6,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: 'linear-gradient(to right, var(--editorial-band), var(--imprint-gold), var(--editorial-band))'
    }
  }), children, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      borderTop: '1px solid var(--border-hair)',
      padding: '12px 26px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      color: 'var(--text-faint)',
      letterSpacing: '.04em'
    }
  }, /*#__PURE__*/React.createElement("span", null, footer), /*#__PURE__*/React.createElement("span", null, "gumercindojimenez.com")));
}

/* ---------- Page A: workbook (green) ---------- */
function WorkbookPage() {
  return /*#__PURE__*/React.createElement(Sheet, {
    line: "bar",
    footer: "Hay que salir del bar \u2014 WorkBook"
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    number: "1",
    kicker: "Cap\xEDtulo",
    title: "El \xFAltimo trago en el bar de lo conocido"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '26px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BlockLabel, {
    glyph: "\u2726",
    style: {
      marginBottom: 16
    }
  }, "Bloque 1 \u2014 La esencia"), /*#__PURE__*/React.createElement(QuoteBlock, {
    style: {
      marginBottom: 16
    }
  }, "\"La pregunta no es si deber\xEDas salir del bar, sino cu\xE1ndo dar\xE1s ese primer paso hacia tu verdadero potencial.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 14,
      color: 'var(--text-body)',
      margin: '0 0 8px'
    }
  }, "\xBFCu\xE1l es la idea que m\xE1s te impact\xF3 de este cap\xEDtulo? Escribila con tus propias palabras:"), /*#__PURE__*/React.createElement(WritingLines, {
    count: 2
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BlockLabel, {
    glyph: "\u25CE",
    style: {
      marginBottom: 16
    }
  }, "Bloque 2 \u2014 El espejo"), /*#__PURE__*/React.createElement(WorksheetPrompt, {
    variant: "plain",
    number: 1,
    lines: 1,
    style: {
      marginBottom: 14
    }
  }, "\xBFQu\xE9 'bar' de lo conocido te est\xE1 costando m\xE1s caro hoy: tu trabajo, una relaci\xF3n, un h\xE1bito o tu zona de confort?"), /*#__PURE__*/React.createElement(WorksheetPrompt, {
    variant: "plain",
    number: 2,
    lines: 1
  }, "\xBFQu\xE9 versi\xF3n de vos est\xE1 esperando que salgas del bar y empieces a vivir?"))));
}

/* ---------- Page B: diario (violet) ---------- */
function DiarioPage() {
  return /*#__PURE__*/React.createElement(Sheet, {
    line: "quejica",
    footer: "Mata al quejica que llevas dentro \u2014 Diario"
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    number: "1",
    kicker: "Secci\xF3n \xB7 Trabajo y Carrera",
    title: "\xBFQu\xE9 te est\xE1n diciendo tus quejas?",
    line: "quejica"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '26px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(BlockLabel, {
    glyph: "\u25C8",
    style: {
      marginBottom: 2
    }
  }, "El ejercicio"), /*#__PURE__*/React.createElement(WorksheetPrompt, {
    variant: "card",
    lines: 2,
    example: "Me quejo de que nunca tengo tiempo para enfocarme en lo importante porque siempre estoy apagando incendios."
  }, "\xBFQu\xE9 queja recurrente ten\xE9s sobre tu trabajo o tu carrera?"), /*#__PURE__*/React.createElement(WorksheetPrompt, {
    variant: "card",
    lines: 2,
    example: "Me siento frustrado porque siento que mis esfuerzos no son estrat\xE9gicos."
  }, "\xBFQu\xE9 emociones surgen cuando te quej\xE1s?"), /*#__PURE__*/React.createElement(QuoteBlock, {
    author: "Gumercindo Jim\xE9nez"
  }, "\"Si tu queja fuera una pista sobre lo que realmente necesit\xE1s o valor\xE1s, \xBFqu\xE9 estar\xEDa tratando de decirte?\"")));
}
window.GJWorkbook = {
  WorkbookPage,
  DiarioPage
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/workbook/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.BlockLabel = __ds_scope.BlockLabel;

__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;

__ds_ns.RatingScale = __ds_scope.RatingScale;

__ds_ns.WorksheetPrompt = __ds_scope.WorksheetPrompt;

__ds_ns.WritingLines = __ds_scope.WritingLines;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.Input = __ds_scope.Input;

})();
