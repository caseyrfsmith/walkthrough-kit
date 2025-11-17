/**
 * LLM-based parser for extracting walkthrough structure from freeform text
 * Uses Claude API to analyze unstructured documentation
 */

import type { WalkthroughData } from './types.js';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export interface LLMParserOptions {
  apiKey: string;
  model?: string;
}

/**
 * Parse freeform text using Claude AI
 */
export async function parseWithLLM(
  content: string,
  options: LLMParserOptions
): Promise<WalkthroughData> {
  const { apiKey, model = 'claude-sonnet-4-20250514' } = options;

  const prompt = buildExtractionPrompt(content);

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: any = await response.json();
    const responseText = data.content[0].text;

    // Parse the JSON response
    const walkthroughData = parseClaudeResponse(responseText);
    return walkthroughData;

  } catch (error) {
    throw new Error(`LLM parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Build the extraction prompt for Claude
 */
function buildExtractionPrompt(content: string): string {
  return `Extract a step-by-step walkthrough from this documentation. Analyze the content and create a structured walkthrough with clear steps.

IMPORTANT: Return ONLY valid JSON. Do not include any markdown formatting, code blocks, or explanatory text. Your entire response must be a single JSON object.

Required JSON structure:
{
  "metadata": {
    "title": "string (create a descriptive title)",
    "estimatedTime": "string (estimate like '5 minutes')",
    "difficulty": "beginner|intermediate|advanced",
    "mode": "separate|unified"
  },
  "steps": [
    {
      "number": 1,
      "title": "string (concise step title)",
      "description": "string (1-2 sentences explaining the step)",
      "code": {
        "language": "string (javascript, python, bash, etc)",
        "content": "string (the actual code)",
        "highlightLines": [array of line numbers to highlight, or empty array]
      },
      "notes": "string or null (additional context after code)"
    }
  ]
}

Guidelines:
- Identify distinct steps (look for numbered lists, sequential actions, or logical breakpoints)
- Extract code blocks exactly as written
- Infer language from context or code syntax
- Keep descriptions concise (1-2 sentences)
- Add notes only if there's important context after the code
- Use "separate" mode if steps have different, unrelated code snippets
- Use "unified" mode if walking through a single piece of code line by line
- For unified mode, include the full code in EVERY step, with different highlightLines per step

Documentation to analyze:

${content}

Remember: Return ONLY the JSON object, nothing else.`;
}

/**
 * Parse Claude's response and validate structure
 */
function parseClaudeResponse(responseText: string): WalkthroughData {
  // Strip any markdown code block formatting if present
  let jsonText = responseText.trim();
  jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

  try {
    const parsed = JSON.parse(jsonText);

    // Build the WalkthroughData structure
    const data: WalkthroughData = {
      version: '1.0',
      metadata: {
        title: parsed.metadata?.title || 'Untitled Walkthrough',
        estimatedTime: parsed.metadata?.estimatedTime,
        difficulty: parsed.metadata?.difficulty,
        mode: parsed.metadata?.mode || 'separate',
      },
      steps: parsed.steps.map((step: any, index: number) => ({
        id: `step-${step.number || index + 1}`,
        number: step.number || index + 1,
        title: step.title || 'Untitled Step',
        description: step.description || '',
        code: step.code ? {
          language: step.code.language || 'text',
          content: step.code.content || '',
          highlightLines: step.code.highlightLines || [],
        } : undefined,
        notes: step.notes || undefined,
        highlightLines: step.code?.highlightLines || [],
      })),
    };

    // If unified mode, extract the unified code block
    if (parsed.metadata?.mode === 'unified' && parsed.steps.length > 0) {
      const firstStep = parsed.steps[0];
      if (firstStep.code) {
        data.unifiedCode = {
          language: firstStep.code.language,
          content: firstStep.code.content,
        };
      }
    }

    return data;

  } catch (error) {
    throw new Error(`Failed to parse Claude's response as JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}