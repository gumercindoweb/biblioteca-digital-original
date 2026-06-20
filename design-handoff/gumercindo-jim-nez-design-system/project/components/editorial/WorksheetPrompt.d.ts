import React from 'react';

export interface WorksheetPromptProps {
  children: React.ReactNode;
  /** Filled question-card or plain numbered question. @default 'card' */
  variant?: 'card' | 'plain';
  /** Number shown in 'plain' variant. */
  number?: number;
  /** Optional worked example hint. */
  example?: React.ReactNode;
  /** Ruled answer rows beneath. @default 0 */
  lines?: number;
  style?: React.CSSProperties;
}

/**
 * A journal/workbook question — filled card or numbered serif, with optional
 * example hint and ruled answer space.
 * @startingPoint section="Editorial" subtitle="Journal prompts & worksheet blocks" viewport="700x420"
 */
export function WorksheetPrompt(props: WorksheetPromptProps): JSX.Element;
