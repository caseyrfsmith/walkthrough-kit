import type { Token } from '../types.js';
import { LANGUAGES } from './languages.js';
import { THEME } from './theme.js';

/**
 * Tokenize code for syntax highlighting
 * 
 * This function takes raw code and returns an array of tokens,
 * each with a type (for coloring) and value (the actual text).
 */
export function tokenize(code: string, language: string): Token[] {
  const lang = language.toLowerCase();
  const patterns = LANGUAGES[lang];
  
  // If language not supported, return as plain text
  if (!patterns) {
    return [{ type: 'text', value: code }];
  }
  
  const tokens: Token[] = [];
  const matches: Array<{ start: number; end: number; type: string; value: string }> = [];
  
  // Find all matches for each pattern type
  for (const [type, pattern] of Object.entries(patterns)) {
    if (!pattern) continue;
    
    let match;
    // Reset regex to start from beginning
    pattern.lastIndex = 0;
    
    while ((match = pattern.exec(code)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type,
        value: match[0],
      });
    }
  }
  
  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);
  
  // Remove overlapping matches (keep first occurrence)
  const filteredMatches = [];
  let lastEnd = 0;
  
  for (const match of matches) {
    if (match.start >= lastEnd) {
      filteredMatches.push(match);
      lastEnd = match.end;
    }
  }
  
  // Build token array with plain text between matches
  let pos = 0;
  
  for (const match of filteredMatches) {
    // Add plain text before this match
    if (match.start > pos) {
      tokens.push({
        type: 'text',
        value: code.slice(pos, match.start),
      });
    }
    
    // Add the matched token
    tokens.push({
      type: match.type,
      value: match.value,
    });
    
    pos = match.end;
  }
  
  // Add remaining text
  if (pos < code.length) {
    tokens.push({
      type: 'text',
      value: code.slice(pos),
    });
  }
  
  return tokens;
}

/**
 * Get color for a token type
 */
export function getTokenColor(type: string): string {
  return THEME[type] || THEME.text || '#abb2bf';
}