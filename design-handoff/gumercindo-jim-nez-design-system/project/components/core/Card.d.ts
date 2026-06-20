import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  /** @default 'paper' */
  tone?: 'paper' | 'sunken' | 'tint' | 'dark';
  /** Lift on hover. @default false */
  interactive?: boolean;
  /** @default 'lg' */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Gold rule across the top edge. @default false */
  accentRule?: boolean;
  style?: React.CSSProperties;
}

/**
 * Editorial container — paper surface, hairline border, soft shadow.
 * @startingPoint section="Core" subtitle="Surface cards, light & dark" viewport="700x320"
 */
export function Card(props: CardProps): JSX.Element;
