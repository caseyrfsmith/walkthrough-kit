# Custom languages

TODO: add intro + also decide if this is the actual way we're adding custom languages.

## Adding a new language

Add syntax highlighting for custom languages:

```ts
import { registerLanguage } from '@walkthrough-kit/component-templates';

registerLanguage('ruby', {
  keywords: /\b(def|class|end|if|else|return)\b/g,
  strings: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*")/g,
  comments: /#.*/g,
  numbers: /\b\d+(\.\d+)?\b/g,
});
```

## Token types

Available token types:

- `keywords` - Language keywords (if, for, class, etc.)
- `strings` - String literals
- `comments` - Comments
- `numbers` - Numeric literals
- `builtins` - Built-in functions/types
- `tags` - HTML/XML tags
- `attributes` - HTML/XML attributes
- `commands` - Shell commands
- `flags` - Command-line flags

TODO: add instructions for altering tokens

## Example: Go

```ts
registerLanguage('go', {
  keywords: /\b(package|import|func|var|const|type|struct|interface|if|else|for|range|return|defer|go|chan|select|case|default|break|continue)\b/g,
  strings: /(`[^`]*`|"([^"\\]|\\.)*")/g,
  comments: /(\/\/.*|\/\*[\s\S]*?\*\/)/g,
  numbers: /\b\d+(\.\d+)?(e[+-]?\d+)?\b/gi,
  builtins: /\b(append|cap|close|complex|copy|delete|imag|len|make|new|panic|print|println|real|recover)\b/g,
});
```

## Color theme

The default color theme (One Dark):

```ts
{
  keywords: '#c678dd',      // Purple
  strings: '#98c379',       // Green
  comments: '#5c6370',      // Gray
  numbers: '#d19a66',       // Orange
  builtins: '#e5c07b',      // Yellow
  tags: '#e06c75',          // Red
  commands: '#61afef',      // Blue
  flags: '#56b6c2',         // Cyan
  attributes: '#d19a66',    // Orange
}
```

To override colors, modify the lexer theme in `packages/component-templates/src/lexer/theme.ts`.

## Testing your language

Create a test markdown file:

````markdown
---
title: Go Example
---

## Example code

```go:1-3
package main

func main() {
    println("Hello, World!")
}
```
````

Generate and view:

```bash
walkthrough create test.md
```
