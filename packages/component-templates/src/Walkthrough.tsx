import React, { useState, useEffect } from 'react';
import type { WalkthroughProps, Step, CodeBlock } from './types.js';
import { useStepNavigation } from './hooks/useStepNavigation.js';
import { tokenize, getTokenColor } from './lexer/index.js';

/**
 * Walkthrough Component
 * 
 * Displays interactive step-by-step code walkthroughs with syntax highlighting
 */
export function Walkthrough({
  steps,
  initialStep = 0,
  theme = 'auto',
  onStepChange,
  className = '',
}: WalkthroughProps) {
  const {
    currentStep,
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  } = useStepNavigation(steps.length, initialStep, onStepChange);

  // Keyboard navigation
    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft' && canGoPrevious) {
        previousStep();
        } else if (e.key === 'ArrowRight' && canGoNext) {
        nextStep();
        }
    };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [canGoNext, canGoPrevious, nextStep, previousStep]);

  const step = steps[currentStep];

  if (!step) {
    return <div className="walkthrough-error">No steps available</div>;
  }

  return (
    <div className={`walkthrough walkthrough--${theme} ${className}`}>
      {/* Step Content */}
      <div className="walkthrough__content">
        {/* Step Header */}
        <div className="walkthrough__header">
          <div className="walkthrough__step-number">
            Step {step.number} of {steps.length}
          </div>
          <h3 className="walkthrough__title">{step.title}</h3>
        </div>

        {/* Description */}
        <p className="walkthrough__description">{step.description}</p>

        {/* Code Block (if present) */}
        {step.code && <CodeBlockRenderer code={step.code} />}

        {/* Notes (if present) */}
        {step.notes && (
          <div className="walkthrough__notes">
            <p>{step.notes}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="walkthrough__navigation">
        {/* Previous/Next Buttons */}
        <div className="walkthrough__buttons">
          <button
            className="walkthrough__button walkthrough__button--prev"
            onClick={previousStep}
            disabled={!canGoPrevious}
            aria-label="Previous step"
          >
            ← Previous
          </button>
          <button
            className="walkthrough__button walkthrough__button--next"
            onClick={nextStep}
            disabled={!canGoNext}
            aria-label="Next step"
          >
            Next →
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="walkthrough__dots">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`walkthrough__dot ${
                index === currentStep ? 'walkthrough__dot--active' : ''
              }`}
              onClick={() => goToStep(index)}
              aria-label={`Go to step ${index + 1}`}
              aria-current={index === currentStep ? 'step' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Code Block Renderer with Syntax Highlighting
 */
/**
 */

function CodeBlockRenderer({ code }: { code: CodeBlock }) {
  const [copied, setCopied] = useState(false);
  
  // Split code into lines
  const lines = code.content.split('\n');
  
  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="walkthrough__code-block">
      {/* Language label and copy button */}
      <div className="walkthrough__code-header">
        <span className="walkthrough__code-language">{code.language}</span>
        <button
          className="walkthrough__copy-button"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <pre className="walkthrough__code">
        <code>
          {lines.map((line, lineIndex) => {
            const lineNumber = lineIndex + 1;
            const isHighlighted = code.highlightLines.includes(lineNumber);
            
            // Tokenize this line
            const tokens = tokenize(line, code.language);
            
            return (
              <div
                key={lineIndex}
                className={`walkthrough__code-line ${
                  isHighlighted ? 'walkthrough__code-line--highlighted' : ''
                }`}
              >
                <span className="walkthrough__line-number">{lineNumber}</span>
                <span className="walkthrough__line-content">
                  {tokens.map((token, tokenIndex) => (
                    <span
                      key={tokenIndex}
                      style={{ color: getTokenColor(token.type) }}
                    >
                      {token.value}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
