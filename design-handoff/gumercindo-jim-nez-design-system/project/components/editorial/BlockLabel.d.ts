import React from 'react';

export interface BlockLabelProps {
  /** Leading glyph — the workbook uses ✦ ◎ ◈ ✍ ▣. @default '✦' */
  glyph?: string;
  children: React.ReactNode;
  /** Hairline rule beneath. @default true */
  rule?: boolean;
  style?: React.CSSProperties;
}

/** Tracked-caps section marker for workbooks & diarios (glyph + spaced label + rule). */
export function BlockLabel(props: BlockLabelProps): JSX.Element;
