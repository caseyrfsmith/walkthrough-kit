import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { parse as parseYaml } from 'yaml';
import type { WalkthroughData, WalkthroughMetadata, Step, CodeBlock, UnifiedCodeBlock } from './types.js';

/**
 * Parse markdown into walkthrough data structure
 */
export async function parseMarkdown(markdown: string): Promise<WalkthroughData> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml']);

  const tree = processor.parse(markdown);

  // Extract metadata from frontmatter
  const metadata = extractMetadata(tree);

  // Check if unified mode
  const isUnified = metadata.mode === 'unified';

  // If unified, extract the first code block
  const unifiedCode = isUnified ? extractUnifiedCode(tree) : undefined;

  // Extract steps (behavior changes based on mode)
  const steps = extractSteps(tree, isUnified, unifiedCode);

return {
  version: '1.0',
  metadata,
  steps,
  unifiedCode 
};
  
}

/**
 * Extract metadata from YAML frontmatter
 */
function extractMetadata(tree: any): WalkthroughMetadata {
  const frontmatterNode = tree.children.find((node: any) => node.type === 'yaml');
  
  if (!frontmatterNode) {
    return { title: 'Untitled Walkthrough' };
  }
  
  const yaml = parseYaml(frontmatterNode.value);
  
  return {
    title: yaml.title || 'Untitled Walkthrough',
    estimatedTime: yaml.estimatedTime,
    difficulty: yaml.difficulty,
    description: yaml.description,
    mode: yaml.mode || 'separate' // default to 'separate' if not specified
  };
}

/**
 * Extract the unified code block (first code block in the document)
 */
function extractUnifiedCode(tree: any): UnifiedCodeBlock | undefined {
  // Find the first code block in the document
  for (const node of tree.children) {
    if (node.type === 'code') {
      const rawLang = node.lang || 'text';
      const [lang] = rawLang.split(':');
      
      return {
        language: lang,
        content: node.value
      };
    }
  }
  return undefined;
}

/**
 * Extract steps from markdown content
 * Looks for ## Step N: patterns
 */
function extractSteps(tree: any, isUnified: boolean = false, unifiedCode?: UnifiedCodeBlock): Step[] {
  const steps: Step[] = [];
  const children = tree.children;
  
  let currentStep: Partial<Step> | null = null;
  let stepNumber = 0;
  let seenUnifiedCode = false;
  
  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    // Skip first code block in unified mode (it's the shared code)
    if (isUnified && node.type === 'code' && !seenUnifiedCode) {
      seenUnifiedCode = true;
      continue;
    }
    
    // Check for step heading (any ## heading becomes a step)
    if (node.type === 'heading' && node.depth === 2) {
      // Save previous step if exists
      if (currentStep && currentStep.title) {
        steps.push(finalizeStep(currentStep, stepNumber, isUnified, unifiedCode));
      }
      
      // Start new step
      stepNumber++;
      const headingText = extractText(node);
      
      // Strip common step prefixes: "Step 1:", "1.", "1)", etc.
      const title = headingText
        .replace(/^Step\s+\d+:\s*/i, '')  // "Step 1: " or "step 1: "
        .replace(/^\d+\.\s*/, '')          // "1. "
        .replace(/^\d+\)\s*/, '')          // "1) "
        .trim();
      
      currentStep = {
        id: `step-${stepNumber}`,
        number: stepNumber,
        title,
        description: '',
        notes: '',
        highlightLines: []
      };
      continue;
    }
    
    // Skip if no current step
    if (!currentStep) continue;
    
    // Extract description (first paragraph after heading)
    if (node.type === 'paragraph' && !currentStep.description) {
      const text = extractText(node);
      
      // Check if this is a highlight line in unified mode
      if (isUnified) {
        const highlightMatch = text.match(/^highlight:\s*(.+)$/i);
        if (highlightMatch) {
          currentStep.highlightLines = parseHighlightLines(highlightMatch[1]);
          continue;
        }
      }
      
      // Otherwise, it's the description
      currentStep.description = text;
      continue;
    }
    
    // Extract code block (only in separate mode)
    if (node.type === 'code' && !currentStep.code && !isUnified) {
      currentStep.code = extractCodeBlock(node);
      continue;
    }

    // In unified mode, look for "highlight: X" lines in paragraphs
    if (isUnified && node.type === 'paragraph' && !currentStep.highlightLines) {
      const text = extractText(node);
      const highlightMatch = text.match(/^highlight:\s*(.+)$/i);
      if (highlightMatch) {
        currentStep.highlightLines = parseHighlightLines(highlightMatch[1]);
        continue;
      }
    }
    
    // Additional notes (paragraphs after code)
    if (node.type === 'paragraph' && currentStep.code) {
      currentStep.notes = (currentStep.notes || '') + extractText(node) + '\n\n';
    }
  }
  
  // last step
  if (currentStep && currentStep.title) {
    steps.push(finalizeStep(currentStep, stepNumber, isUnified, unifiedCode));
  }
  

  return steps;
}

/**
 * Extract text content from a node
 */
function extractText(node: any): string {
  // Handle text nodes
  if (node.type === 'text') {
    return node.value;
  }
  
  // Handle inline code (backticks like `code`)
  if (node.type === 'inlineCode') {
    return node.value;
  }
  
  // Recursively handle nodes with children
  if (node.children) {
    return node.children.map(extractText).join('');
  }
  
  return '';
}

/**
 * Extract code block with language and highlight info
 */
function extractCodeBlock(node: any): CodeBlock {
  const rawLang = node.lang || 'text';
  const meta = node.meta || '';
  
  // Split language on colon to handle cases like "bash:.env" or "javascript:1-3"
  // First part is the language, everything after colon goes to meta for parsing
  const [lang, ...metaParts] = rawLang.split(':');
  const fullMeta = metaParts.length > 0 ? metaParts.join(':') : meta;
  
  // Parse highlight lines from meta (e.g., "1-3,5")
  const highlightLines = parseHighlightLines(fullMeta);
  
  return {
    language: lang,
    content: node.value,
    highlightLines
  };
}

/**
 * Parse highlight line syntax: "1-3,5,7-9" -> [1,2,3,5,7,8,9]
 */
function parseHighlightLines(meta: string): number[] {
  const match = meta.match(/(\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*)/);
  if (!match) return [];
  
  const ranges = match[1].split(',');
  const lines: number[] = [];
  
  for (const range of ranges) {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        lines.push(i);
      }
    } else {
      lines.push(Number(range));
    }
  }
  
  return lines;
}

/**
 * Finalize a step object
 */
function finalizeStep(step: Partial<Step>, stepNumber: number, isUnified: boolean, unifiedCode?: UnifiedCodeBlock): Step {
  // In unified mode, create code block from unified code + highlight lines
  let code = step.code;
  if (isUnified && unifiedCode && step.highlightLines) {
    code = {
      language: unifiedCode.language,
      content: unifiedCode.content,
      highlightLines: step.highlightLines
    };
  }
  
  return {
    id: step.id || `step-${stepNumber}`,
    number: stepNumber,
    title: step.title || 'Untitled Step',
    description: step.description || '',
    code,
    notes: step.notes?.trim() || undefined,
    highlightLines: step.highlightLines
  };
}