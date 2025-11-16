/**
 * Walkthrough Kit - Component Templates
 * 
 * Main exports for the walkthrough component library
 */

export { Walkthrough } from './Walkthrough';
export { useStepNavigation } from './hooks/useStepNavigation.js';
export { tokenize, getTokenColor, registerLanguage, LANGUAGES, THEME } from './lexer/index.js';
export type { WalkthroughProps, Step, CodeBlock, Token, LanguagePatterns } from './types.js';