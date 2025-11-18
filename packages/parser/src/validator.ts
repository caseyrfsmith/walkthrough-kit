import type { WalkthroughData } from './types.js';

export interface ValidationResult {
  valid: boolean;
  warnings: ValidationWarning[];
}

export interface ValidationWarning {
  type: 'quality' | 'compatibility' | 'structure';
  message: string;
  location?: string;
}

/**
 * Supported languages for syntax highlighting
 */
const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'bash',
  'html',
  'css',
  'json'
];

/**
 * Validate walkthrough data and return warnings
 */
export function validateWalkthrough(data: WalkthroughData): ValidationResult {
  const warnings: ValidationWarning[] = [];

  // Check for empty steps
  if (data.steps.length === 0) {
    warnings.push({
      type: 'structure',
      message: 'Walkthrough has no steps',
    });
  }

  // Check each step
  data.steps.forEach((step, index) => {
    const stepLocation = `Step ${step.number} "${step.title}"`;

    // Check for missing optional metadata
    if (index === 0 && !data.metadata.estimatedTime) {
      warnings.push({
        type: 'quality',
        message: 'Missing estimated time in metadata',
      });
    }

    if (index === 0 && !data.metadata.difficulty) {
      warnings.push({
        type: 'quality',
        message: 'Missing difficulty level in metadata',
      });
    }

    // Check for very long titles
    if (step.title.length > 80) {
      warnings.push({
        type: 'quality',
        message: `Title is very long (${step.title.length} characters, recommend < 80)`,
        location: stepLocation,
      });
    }

    // Check for empty descriptions
    if (!step.description || step.description.trim().length === 0) {
      warnings.push({
        type: 'quality',
        message: 'Step has empty description',
        location: stepLocation,
      });
    }

    // Check code blocks
    if (step.code) {
      // Check for unsupported languages
      if (!SUPPORTED_LANGUAGES.includes(step.code.language.toLowerCase())) {
        warnings.push({
          type: 'compatibility',
          message: `Language "${step.code.language}" is not supported for syntax highlighting. Supported: ${SUPPORTED_LANGUAGES.join(', ')}`,
          location: stepLocation,
        });
      }

      // Check for empty code content
      if (!step.code.content || step.code.content.trim().length === 0) {
        warnings.push({
          type: 'quality',
          message: 'Code block is empty',
          location: stepLocation,
        });
      }

      // Check highlight lines out of range
      if (step.code.highlightLines && step.code.highlightLines.length > 0) {
        const lineCount = step.code.content.split('\n').length;
        const maxHighlight = Math.max(...step.code.highlightLines);
        if (maxHighlight > lineCount) {
          warnings.push({
            type: 'structure',
            message: `Highlight line ${maxHighlight} exceeds code length (${lineCount} lines)`,
            location: stepLocation,
          });
        }
      }
    }

    // Check for steps without code (might be intentional, so just a quality note)
    if (!step.code && index > 0) { // Skip warning for first step
      warnings.push({
        type: 'quality',
        message: 'Step has no code block',
        location: stepLocation,
      });
    }
  });

  // Check for step numbering gaps
  const stepNumbers = data.steps.map(s => s.number);
  for (let i = 1; i <= stepNumbers.length; i++) {
    if (!stepNumbers.includes(i)) {
      warnings.push({
        type: 'structure',
        message: `Step numbering gap: missing step ${i}`,
      });
    }
  }

  // Check for duplicate step IDs
  const stepIds = data.steps.map(s => s.id);
  const duplicateIds = stepIds.filter((id, index) => stepIds.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    warnings.push({
      type: 'structure',
      message: `Duplicate step IDs found: ${[...new Set(duplicateIds)].join(', ')}`,
    });
  }

  return {
    valid: warnings.filter(w => w.type === 'structure').length === 0,
    warnings,
  };
}
