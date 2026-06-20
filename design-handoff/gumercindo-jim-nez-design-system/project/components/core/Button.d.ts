import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default 'solid' */
  variant?: 'solid' | 'accent' | 'outline' | 'ghost' | 'link';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Primary action control — uppercase tracked sans label, restrained radius.
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
