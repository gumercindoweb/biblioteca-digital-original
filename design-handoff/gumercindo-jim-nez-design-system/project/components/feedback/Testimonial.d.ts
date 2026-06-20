import React from 'react';

export interface TestimonialProps {
  quote: React.ReactNode;
  author?: string;
  role?: string;
  /** @default 'paper' */
  tone?: 'paper' | 'dark';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Editorial pull-quote — serif italic, gold quotation mark and rule. */
export function Testimonial(props: TestimonialProps): JSX.Element;
