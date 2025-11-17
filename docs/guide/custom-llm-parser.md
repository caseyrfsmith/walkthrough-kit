# Customizing the AI parser

The AI parser is designed to be extensible. You can customize it by modifying `packages/parser/src/llm-parser.ts`.

## Change the AI model

Edit [packages/parser/src/llm-parser.ts:22](../../packages/parser/src/llm-parser.ts#L22) to use a different Claude model:

```typescript
const { apiKey, model = 'claude-sonnet-4-20250514' } = options;
```

Available models:
- `claude-sonnet-4-20250514` (default, fast and high quality)
- `claude-opus-4-20250514` (slower, highest quality)
- `claude-3-5-sonnet-20241022` (previous generation)

### Customize the extraction prompt

The prompt that instructs Claude how to extract walkthroughs is in the `buildExtractionPrompt` function ([llm-parser.ts:65](../../packages/parser/src/llm-parser.ts#L65)).

Modify it to:
- Change how steps are identified
- Adjust output format preferences
- Add domain-specific instructions
- Fine-tune code extraction behavior

Example modification:

```typescript
function buildExtractionPrompt(content: string): string {
  return `Extract a step-by-step walkthrough from this documentation...

  // Add your custom instructions here
  Special instructions:
  - Prefer unified mode for tutorial-style content
  - Always highlight import statements
  - Include security warnings as notes

  ${content}`;
}
```

## Post-process the AI response

The `parseClaudeResponse` function ([llm-parser.ts:113](../../packages/parser/src/llm-parser.ts#L113)) transforms the AI output into the final structure.

Customize it to:
- Add validation rules
- Transform step titles or descriptions
- Inject additional metadata
- Filter or merge steps

Example:

```typescript
function parseClaudeResponse(responseText: string): WalkthroughData {
  // ... existing parsing code ...

  // Add custom post-processing
  data.steps = data.steps.map(step => ({
    ...step,
    // Auto-capitalize titles
    title: step.title.charAt(0).toUpperCase() + step.title.slice(1),
    // Add default notes for steps without them
    notes: step.notes || 'Complete this step before continuing.'
  }));

  return data;
}
```

## Use a different LLM provider

Replace the Anthropic API call with your preferred provider:

```typescript
// Instead of Anthropic API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  // OpenAI configuration
});
```

You'll need to adjust:
- API endpoint and headers
- Request/response format
- Error handling

## Add local caching

To save API costs during development, add response caching:

```typescript
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export async function parseWithLLM(content: string, options: LLMParserOptions) {
  // Generate cache key from content
  const hash = createHash('sha256').update(content).digest('hex');
  const cacheFile = `.cache/${hash}.json`;

  // Check if we've already processed this exact content
  if (existsSync(cacheFile)) {
    return JSON.parse(readFileSync(cacheFile, 'utf-8'));
  }

  // Make API call
  const data = await /* ... API call ... */;

  // Save to cache for next time
  writeFileSync(cacheFile, JSON.stringify(data, null, 2));
  return data;
}
```

This saves money by reusing results when you run the same file through the parser multiple times during development.

## Testing your changes

After modifying the parser:

```bash
# Rebuild the parser package
cd packages/parser
npm run build

# Rebuild the CLI
cd ../cli
npm run build

# Test with a sample file
node packages/cli/dist/index.js create test.txt --ai
```

::: tip
The parser package is yours to customize! Since walkthrough-kit is a starter kit, feel free to modify the AI behavior to match your specific documentation needs.
:::
