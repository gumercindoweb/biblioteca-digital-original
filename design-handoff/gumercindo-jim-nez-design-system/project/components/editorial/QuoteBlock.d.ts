import React from 'react';

export interface QuoteBlockProps {
  children: React.ReactNode;
  author?: string;
  style?: React.CSSProperties;
}

/** Soft inset epigraph — italic serif on a tint with a gold left rule (workbook style). */
export function QuoteBlock(props: QuoteBlockProps): JSX.Element;
