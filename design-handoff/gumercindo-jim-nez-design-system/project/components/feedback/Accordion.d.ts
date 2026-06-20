import React from 'react';

export interface AccordionItem { q: string; a: string; }
export interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once. @default false */
  allowMultiple?: boolean;
  /** Indices open on mount. @default [] */
  defaultOpen?: number[];
  /** @default 'paper' */
  tone?: 'paper' | 'dark';
  style?: React.CSSProperties;
}

/** FAQ disclosure list — serif questions, hairline dividers, rotating gold "+". */
export function Accordion(props: AccordionProps): JSX.Element;
