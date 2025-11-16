/**
 * Component prop types
 */

export interface WalkthroughProps {
  steps: Step[];
  initialStep?: number;
  theme?: 'light' | 'dark' | 'auto';
  onStepChange?: (stepIndex: number) => void;
  className?: string;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  code?: CodeBlock;
  notes?: string;
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