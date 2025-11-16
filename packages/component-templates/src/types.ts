/**
 * Component prop types
 */

export interface WalkthroughProps {
  steps: Step[];
  initialStep?: number;
  theme?: 'light' | 'dark' | 'auto';
  onStepChange?: (stepIndex: number) => void;
  className?: string;
  unifiedCode?: UnifiedCodeBlock;
  minHeight?: string; // allows you to set minimum height of the walkthrough container
  descriptionHeight?: string; // allows you to set a fixed height for the description area to prevent layout shifts
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  code?: CodeBlock;
  notes?: string;
  highlightLines?: number[];
}

export interface UnifiedCodeBlock {
  language: string;
  content: string;
}

export interface CodeBlock {
  language: string;
  content: string;
  highlightLines: number[];
}

/**
 * Lexer types
 */

export interface LanguagePatterns {
  keywords?: RegExp;
  strings?: RegExp;
  comments?: RegExp;
  numbers?: RegExp;
  builtins?: RegExp;
  tags?: RegExp;
  attributes?: RegExp;
  commands?: RegExp;
  flags?: RegExp;
  urls?: RegExp;
  symbols?: RegExp;
}

export interface Token {
  type: string;
  value: string;
}