import React from 'react';

export interface StatProps {
  value: React.ReactNode;
  label: string;
  prefix?: string;
  suffix?: string;
  /** @default 'default' */
  tone?: 'default' | 'dark';
  /** @default 'start' */
  align?: 'start' | 'center';
  style?: React.CSSProperties;
}

/** Oversized editorial metric — display-serif figure over a tracked caps label. */
export function Stat(props: StatProps): JSX.Element;
