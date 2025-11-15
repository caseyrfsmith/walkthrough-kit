/**
 * Core types for walkthrough data structure
 */

export interface WalkthroughData {
  version: string;
  metadata: WalkthroughMetadata;
  steps: Step[];
}

export interface WalkthroughMetadata {
  title: string;
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
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
 * Parser options
 */
export interface ParserOptions {
  /**
   * Use AI to extract structure from freeform text
   */
  useAI?: boolean;
  
  /**
   * Claude API key for AI mode
   */
  apiKey?: string;
  
  /**
   * Validate output structure
   */
  validate?: boolean;
}

/**
 * Parse result
 */
export interface ParseResult {
  success: boolean;
  data?: WalkthroughData;
  errors?: string[];
  warnings?: string[];
}
