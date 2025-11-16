import type { LanguagePatterns } from '../types.js';

/**
 * Language pattern definitions for syntax highlighting
 * 
 * Each language defines regex patterns for different token types.
 * The lexer uses these to colorize code blocks.
 */

export const LANGUAGES: Record<string, LanguagePatterns> = {
  javascript: {
    keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|from|default|class|extends|static|async|await|try|catch|finally|throw|new|typeof|instanceof)\b/g,
    strings: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g,
    comments: /(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    numbers: /\b\d+(\.\d+)?\b/g,
    builtins: /\b(console|Array|Object|Promise|Math|JSON|Date|RegExp|Error|Set|Map|String|Number|Boolean)\b/g,
  },

  typescript: {
    keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|from|default|class|extends|static|async|await|try|catch|finally|throw|new|typeof|instanceof|interface|type|enum|namespace|public|private|protected|readonly)\b/g,
    strings: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g,
    comments: /(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    numbers: /\b\d+(\.\d+)?\b/g,
    builtins: /\b(console|Array|Object|Promise|Math|JSON|Date|RegExp|Error|Set|Map|String|Number|Boolean)\b/g,
  },

  python: {
    keywords: /\b(def|class|import|from|return|if|else|elif|for|while|in|is|not|and|or|try|except|finally|raise|with|as|pass|break|continue|lambda|yield|global|nonlocal)\b/g,
    strings: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|'''[\s\S]*?'''|"""[\s\S]*?""")/g,
    comments: /#.*/g,
    numbers: /\b\d+(\.\d+)?\b/g,
    builtins: /\b(print|len|range|str|int|float|list|dict|set|tuple|bool|open|input|enumerate|zip|map|filter)\b/g,
  },

  bash: {
    keywords: /\b(if|then|else|elif|fi|for|do|done|while|case|esac|function)\b/g,
    strings: /('([^']*)'|"([^"]*)")/g,
    comments: /#.*/g,
    commands: /\b(echo|cd|ls|grep|awk|sed|cat|chmod|mkdir|rm|cp|mv|touch|pwd|find|sort|uniq|head|tail|wc|diff)\b/g,
    flags: /--?[a-zA-Z][\w-]*/g,
  },

  html: {
    tags: /<\/?[\w-]+/g,
    attributes: /\b[\w-]+=(?=")/g,
    strings: /"([^"]*)"/g,
    comments: /<!--[\s\S]*?-->/g,
  },

  css: {
    keywords: /\b(import|media|supports|keyframes|from|to)\b/g,
    symbols: /[{}:;,]/g,
    comments: /\/\*[\s\S]*?\*\//g,
    strings: /"([^"]*)"|'([^']*)'/g,
  },

  json: {
    strings: /"([^"\\]|\\.)*"/g,
    numbers: /\b\d+(\.\d+)?\b/g,
    keywords: /\b(true|false|null)\b/g,
  },
};

/**
 * Register a custom language
 */
export function registerLanguage(name: string, patterns: LanguagePatterns): void {
  LANGUAGES[name.toLowerCase()] = patterns;
}