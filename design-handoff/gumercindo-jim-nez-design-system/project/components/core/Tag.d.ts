import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  /** @default 'soft' */
  variant?: 'soft' | 'solid' | 'outline';
  /** @default 'brand' */
  tone?: 'brand' | 'clay' | 'gold' | 'neutral';
  style?: React.CSSProperties;
}

/** Compact tracked-caps pill for service categories, statuses and metadata. */
export function Tag(props: TagProps): JSX.Element;
