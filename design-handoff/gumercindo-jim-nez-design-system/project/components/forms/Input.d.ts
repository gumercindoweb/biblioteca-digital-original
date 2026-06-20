import React from 'react';

export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** @default 'text' */
  type?: string;
  required?: boolean;
  disabled?: boolean;
  /** Leading icon/adornment node. */
  adornment?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

/** Text field with editorial uppercase label, hairline border and gold focus ring. */
export function Input(props: InputProps): JSX.Element;
