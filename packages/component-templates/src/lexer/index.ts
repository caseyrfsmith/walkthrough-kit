/**
 * Lexer - Syntax highlighting system
 * 
 * Public API for tokenizing code and registering custom languages
 */

export { tokenize, getTokenColor } from './tokenize.js';
export { LANGUAGES, registerLanguage } from './languages.js';
export { THEME } from './theme.js';
export type { Token } from '../types.js';