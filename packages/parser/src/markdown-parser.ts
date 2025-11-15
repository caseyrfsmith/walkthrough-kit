import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { parse as parseYaml } from 'yaml';
import type { WalkthroughData, WalkthroughMetadata, Step, CodeBlock } from './types.js';

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
  
  // Extract steps from content
  const steps = extractSteps(tree);
  
  return {
    version: '1.0',
    metadata,
    steps
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
    description: yaml.description
  };
}

/**
 * Extract steps from markdown content
 * Looks for ## Step N: patterns
 */
function extractSteps(tree: any): Step[] {
  const steps: Step[] = [];
  const children = tree.children;
  
  let currentStep: Partial<Step> | null = null;
  let stepNumber = 0;
  
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    
    // Check for step heading (any ## heading becomes a step)
    if (node.type === 'heading' && node.depth === 2) {
      // Save previous step if exists
      if (currentStep && currentStep.title) {
        steps.push(finalizeStep(currentStep, stepNumber));
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
        notes: ''
      };
      continue;
    }
    
    // Skip if no current step
    if (!currentStep) continue;
    
    // Extract description (first paragraph after heading)
    if (node.type === 'paragraph' && !currentStep.description) {
      currentStep.description = extractText(node);
      continue;
    }
    
    // Extract code block
    if (node.type === 'code' && !currentStep.code) {
      currentStep.code = extractCodeBlock(node);
      continue;
    }
    
    // Additional notes (paragraphs after code)
    if (node.type === 'paragraph' && currentStep.code) {
      currentStep.notes = (currentStep.notes || '') + extractText(node) + '\n\n';
    }
  }
  
  // Add last step
  if (currentStep && currentStep.title) {
    steps.push(finalizeStep(currentStep, stepNumber));
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
function finalizeStep(step: Partial<Step>, stepNumber: number): Step {
  return {
    id: step.id || `step-${stepNumber}`,
    number: stepNumber,
    title: step.title || 'Untitled Step',
    description: step.description || '',
    code: step.code,  // May be undefined if there's no code block
    notes: step.notes?.trim() || undefined
  };
}