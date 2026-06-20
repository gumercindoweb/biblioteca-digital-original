import React from 'react';

export interface RatingScaleProps {
  label?: string;
  hint?: string;
  /** Highest value. @default 10 */
  max?: number;
  style?: React.CSSProperties;
}

/** 1–N self-assessment row the reader circles (the "¿Qué bar ves aquí?" wheel). */
export function RatingScale(props: RatingScaleProps): JSX.Element;
