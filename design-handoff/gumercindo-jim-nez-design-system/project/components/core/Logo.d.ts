import React from 'react';

export interface LogoProps {
  /** Symbol-only mark or the full wordmark lockup. @default 'lockup' */
  variant?: 'symbol' | 'lockup';
  /** Choose art for the background. @default 'auto' (light) */
  tone?: 'auto' | 'light' | 'dark' | 'onDark' | 'gold';
  /** Pixel height; width auto. */
  height?: number;
  /** Path prefix to the project root from the consuming page (e.g. "../.."). */
  base?: string;
  style?: React.CSSProperties;
}

/** The GJ brand mark — symbol or lockup, light/dark/gold art. */
export function Logo(props: LogoProps): JSX.Element;
