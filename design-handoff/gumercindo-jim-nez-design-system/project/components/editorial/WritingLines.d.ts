import React from 'react';

export interface WritingLinesProps {
  /** Number of ruled rows. @default 3 */
  count?: number;
  /** Row height in px. @default 34 */
  gap?: number;
  style?: React.CSSProperties;
}

/** Ruled fill-in space after a journal prompt; rule color follows --sheet-line. */
export function WritingLines(props: WritingLinesProps): JSX.Element;
