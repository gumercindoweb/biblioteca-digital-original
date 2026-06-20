import React from 'react';

export interface EyebrowProps {
  children: React.ReactNode;
  /** Show the leading rule. @default true */
  rule?: boolean;
  /** @default 'accent' */
  tone?: 'accent' | 'brand' | 'metal' | 'muted' | 'onDark';
  style?: React.CSSProperties;
}

/** Editorial kicker above a headline — tracked uppercase sans with a gold rule. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
